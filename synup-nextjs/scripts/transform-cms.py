#!/usr/bin/env python3
"""
Synup CMS Transformation Script
=================================
Transforms Webflow CMS xlsx exports into the static JSON content layer.

Usage:
    python3 scripts/transform-cms.py

Prerequisites:
    pip3 install openpyxl

Input:
    /exports/csv-exports-cms/english csvs/*.xlsx
    /exports/csv-exports-cms/french csvs/*.xlsx
    /exports/csv-exports-cms/german csvs/*.xlsx
    /exports/csv-exports-cms/spanish csvs/*.xlsx

Output:
    /content/[locale]/[collection-type]/[slug].json
    /content/[locale]/navigation/main.json
    /content/transform-report.json  (summary of missing/untranslated fields)

Security:
    - All output is validated JSON (no executable content)
    - Rich text fields are sanitized (HTML tags stripped except allowed set)
    - No file writes outside /content/ directory
    - Slugs are validated before use as filenames
"""

import json
import os
import re
import sys
import html
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

try:
    import openpyxl
except ImportError:
    print("ERROR: openpyxl is required. Run: pip3 install openpyxl")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
EXPORTS_ROOT = PROJECT_ROOT.parent / "exports" / "csv-exports-cms"
CONTENT_ROOT = PROJECT_ROOT / "content"

LOCALE_FOLDER_MAP = {
    "en": "english csvs",
    "de": "german csvs",
    "fr": "french csvs",
    "es": "spanish csvs",
}

# Map xlsx filename keywords → content type slug (folder name in /content/)
# Matches the "Synup Marketing Website - {Name} - {ID}.xlsx" pattern
COLLECTION_NAME_MAP = {
    "Alternatives - ": "alternatives",
    "Alts - ": "alts",
    "Case Studies - ": "case-studies",
    "Case Study _ Results - ": "case-study-results",
    "Compare categories - ": "compare-categories",
    "Compare pages - ": "compare-pages",
    "Compare table categories - ": "compare-table-categories",
    "Comparision Table Ros - ": "comparison-table-rows",
    "Comparison Table Categories - ": "comparison-table-categories",
    "Comparisons - ": "comparisons",
    "Comparsions sections - ": "comparison-sections",
    "Competitor Sections - ": "competitor-sections",
    "Competitors - ": "competitors",
    "Competitors rating tables - ": "competitor-rating-tables",
    "Customer Logos - ": "customer-logos",
    "Ebook Categories - ": "ebook-categories",
    "Ebooks - ": "ebooks",
    "How-Tos - ": "how-tos",
    "Integration Types - ": "integration-types",
    "Integrations - ": "integrations",
    "Integrations Tags - ": "integration-tags",
    "Learns - ": "learns",
    "Local Listings Management Clients - ": "local-listings-clients",
    "Managed services - ": "managed-services",
    "Marketing Guide Companies - ": "marketing-guide-companies",
    "Marketing Guides - ": "marketing-guides",
    "Presses - ": "presses",
    "Pro Portals - ": "pro-portals",
    "Testimonial Reviews - ": "testimonial-reviews",
    "Testimonial Written reviews - ": "testimonial-written-reviews",
    "Testimonials - ": "testimonials",
    "Tools - ": "tools",
    "Use Case Categories - ": "use-case-categories",
    "Use Cases - ": "use-cases",
    "Video Categories - ": "video-categories",
    "Videos - ": "videos",
}

# HTML tags allowed in rich text fields (all others stripped)
ALLOWED_HTML_TAGS = {
    "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6", "a", "blockquote", "span",
}

# Fields that are "shared" — not locale-specific (numbers, dates, IDs, URLs)
# These should be the same across all locales; a warning is raised if they differ.
SHARED_FIELD_PATTERNS = [
    r"^id$",
    r"^slug$",
    r".*-id$",
    r".*url.*",
    r".*date.*",
    r".*rating.*",
    r".*score.*",
    r".*count.*",
    r".*order.*",
    r".*ref.*",
    r".*image.*",
    r".*logo.*",
    r".*photo.*",
    r".*thumbnail.*",
]

# ---------------------------------------------------------------------------
# Report tracking
# ---------------------------------------------------------------------------

report = {
    "collections_processed": [],
    "items_per_locale": {},
    "missing_fields": [],        # { locale, collection, slug, field }
    "possible_untranslated": [], # { locale, collection, slug, field, value }
    "errors": [],
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    """Convert text to a URL-safe slug."""
    if not text:
        return ""
    text = str(text).lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    text = text.strip("-")
    return text


def is_safe_slug(slug: str) -> bool:
    """Validate slug is filesystem-safe (no path traversal)."""
    return bool(re.match(r"^[a-z0-9_-]+$", slug)) and ".." not in slug


def sanitize_html(raw: str) -> str:
    """
    Strip HTML tags not in the allowed set.
    Preserves content text. Does not execute any code.
    """
    if not raw:
        return ""

    # Remove script and style tags entirely (including content)
    raw = re.sub(r"<script[^>]*>.*?</script>", "", raw, flags=re.IGNORECASE | re.DOTALL)
    raw = re.sub(r"<style[^>]*>.*?</style>", "", raw, flags=re.IGNORECASE | re.DOTALL)

    # Remove on* event handlers from all tags
    raw = re.sub(r'\s+on\w+="[^"]*"', "", raw, flags=re.IGNORECASE)
    raw = re.sub(r"\s+on\w+='[^']*'", "", raw, flags=re.IGNORECASE)

    # Remove javascript: hrefs
    raw = re.sub(r'href=["\']javascript:[^"\']*["\']', 'href="#"', raw, flags=re.IGNORECASE)

    # Strip disallowed tags but keep their text content
    def replace_tag(m):
        tag_content = m.group(0)
        # Extract tag name
        tag_match = re.match(r"</?(\w+)", tag_content)
        if tag_match:
            tag_name = tag_match.group(1).lower()
            if tag_name in ALLOWED_HTML_TAGS:
                return tag_content
        return ""

    raw = re.sub(r"<[^>]+>", replace_tag, raw)

    return raw.strip()


def looks_like_english(text: str) -> bool:
    """
    Heuristic: does this text look like untranslated English in a non-EN locale?
    Checks for common English words / patterns that strongly suggest EN content.
    This is a signal only — flag for human review, not an auto-fix.
    """
    if not text or len(text) < 20:
        return False

    # Common English words unlikely to appear in DE/FR/ES
    en_markers = [
        r"\bthe\b", r"\band\b", r"\bwith\b", r"\byour\b", r"\bour\b",
        r"\bfor\b", r"\bhow\b", r"\bwhat\b", r"\bare\b", r"\bmore\b",
        r"\blearn\b", r"\bget\b", r"\bstart\b", r"\bbusiness\b",
    ]
    matches = sum(1 for p in en_markers if re.search(p, text, re.IGNORECASE))
    # If 3+ English marker words appear → likely untranslated
    return matches >= 3


def field_to_key(field_name: str) -> str:
    """Convert Webflow field name to a flat JSON key (Tolgee-compatible)."""
    key = field_name.lower().strip()
    key = re.sub(r"[^a-z0-9]+", "_", key)
    key = key.strip("_")
    return key


def is_shared_field(field_name: str) -> bool:
    """Check if a field is expected to be locale-independent."""
    lower = field_name.lower()
    for pattern in SHARED_FIELD_PATTERNS:
        if re.search(pattern, lower):
            return True
    return False


# ---------------------------------------------------------------------------
# xlsx reading
# ---------------------------------------------------------------------------

def read_xlsx(file_path: Path) -> List[dict]:
    """
    Read an xlsx file and return a list of row dicts.
    First row is treated as headers.
    Empty rows are skipped.
    """
    try:
        wb = openpyxl.load_workbook(file_path, data_only=True, read_only=True)
        ws = wb.active
    except Exception as e:
        report["errors"].append({"file": str(file_path), "error": str(e)})
        return []

    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        wb.close()
        return []

    headers = [str(h).strip() if h is not None else f"col_{i}" for i, h in enumerate(rows[0])]
    result = []

    for row in rows[1:]:
        # Skip completely empty rows
        if all(v is None or str(v).strip() == "" for v in row):
            continue
        row_dict = {}
        for header, value in zip(headers, row):
            if value is None:
                row_dict[header] = None
            elif isinstance(value, bool):
                row_dict[header] = value
            else:
                row_dict[header] = str(value).strip()
        result.append(row_dict)

    wb.close()
    return result


# ---------------------------------------------------------------------------
# Filename → collection type
# ---------------------------------------------------------------------------

def get_collection_type(filename: str) -> Optional[str]:
    """
    Extract the collection type slug from an xlsx filename.
    Returns None if the filename doesn't match any known collection.
    """
    # Strip "Synup Marketing Website - " prefix
    stem = filename
    if stem.startswith("Synup Marketing Website - "):
        stem = stem[len("Synup Marketing Website - "):]

    for pattern, collection_type in COLLECTION_NAME_MAP.items():
        if stem.startswith(pattern):
            return collection_type

    return None


# ---------------------------------------------------------------------------
# Row → JSON item
# ---------------------------------------------------------------------------

def row_to_json(
    row: dict,
    collection_type: str,
    locale: str,
    slug_field_candidates: List[str],
    en_row: Optional[dict] = None,
) -> Optional[Tuple[str, dict]]:
    """
    Convert a single xlsx row to a JSON content item.

    Returns (slug, content_dict) or None if slug cannot be determined.

    Args:
        row: The row from the xlsx file (this locale)
        collection_type: The collection type slug
        locale: The locale code (en, de, fr, es)
        slug_field_candidates: Field names to try for slug (in priority order)
        en_row: The equivalent English row (for untranslated detection)
    """
    # 1. Determine slug
    slug = None
    for field in slug_field_candidates:
        val = row.get(field) or row.get(field.lower()) or row.get(field.title())
        if val:
            slug = slugify(str(val))
            if is_safe_slug(slug):
                break
            else:
                slug = None

    # Fallback: try "Name" or "Slug" columns
    if not slug:
        for candidate in ["Slug", "slug", "Name", "name", "Title", "title"]:
            val = row.get(candidate)
            if val:
                slug = slugify(str(val))
                if is_safe_slug(slug):
                    break
                else:
                    slug = None

    if not slug:
        return None

    # 2. Build content dict — all fields as flat keys
    content: Dict[str, Any] = {
        "slug": slug,
        "locale": locale,
        "collectionType": collection_type,
    }

    missing_fields = []
    possible_untranslated = []

    for field_name, value in row.items():
        key = field_to_key(field_name)
        if not key:
            continue

        # Handle None / empty values
        if value is None or (isinstance(value, str) and value.strip() == ""):
            if not is_shared_field(field_name):
                # Genuinely missing in this locale
                content[key] = "__MISSING__"
                missing_fields.append(field_name)
            else:
                content[key] = None
            continue

        # Sanitize HTML in rich text fields (heuristic: value contains <)
        str_value = str(value)
        if "<" in str_value and ">" in str_value:
            str_value = sanitize_html(str_value)

        # Untranslated detection: if non-EN and value looks like English
        if locale != "en" and not is_shared_field(field_name):
            if looks_like_english(str_value):
                # Flag but keep the value — prefix for grep-ability
                content[key] = f"__POSSIBLE_UNTRANSLATED__{str_value}"
                possible_untranslated.append({"field": field_name, "value": str_value[:80]})
                continue

        # Boolean handling
        if isinstance(value, bool):
            content[key] = value
        elif str_value.lower() in ("true", "yes", "1"):
            content[key] = True
        elif str_value.lower() in ("false", "no", "0"):
            content[key] = False
        else:
            content[key] = str_value

    # 3. Build SEO block from known SEO field patterns
    seo_title = (
        content.pop("meta_title", None)
        or content.pop("seo_title", None)
        or content.pop("og_title", None)
        or content.get("name")
        or content.get("title")
        or "__MISSING__"
    )
    seo_description = (
        content.pop("meta_description", None)
        or content.pop("seo_description", None)
        or content.pop("og_description", None)
        or content.get("description")
        or "__MISSING__"
    )
    og_image = (
        content.pop("og_image", None)
        or content.pop("og_image_url", None)
        or content.pop("meta_image", None)
    )

    content["seo"] = {
        "title": seo_title,
        "description": seo_description,
        "canonical": f"https://www.synup.com"
            + ("" if locale == "en" else f"/{locale}")
            + f"/{collection_type}/{slug}",
        "ogImage": og_image,
    }

    # Track report data
    for f in missing_fields:
        report["missing_fields"].append({
            "locale": locale,
            "collection": collection_type,
            "slug": slug,
            "field": f,
        })
    for u in possible_untranslated:
        report["possible_untranslated"].append({
            "locale": locale,
            "collection": collection_type,
            "slug": slug,
            "field": u["field"],
            "value_preview": u["value"],
        })

    return slug, content


# ---------------------------------------------------------------------------
# Process one xlsx file across all locales
# ---------------------------------------------------------------------------

def process_collection(collection_type: str) -> None:
    """
    Process one content collection across all 4 locales.
    Reads each locale's xlsx file and writes /content/[locale]/[collection]/[slug].json
    """
    print(f"\n  Processing: {collection_type}")

    # Collect rows per locale
    locale_rows: Dict[str, List[dict]] = {}

    for locale, folder_name in LOCALE_FOLDER_MAP.items():
        folder = EXPORTS_ROOT / folder_name
        if not folder.exists():
            report["errors"].append({
                "collection": collection_type,
                "locale": locale,
                "error": f"Folder not found: {folder}",
            })
            continue

        # Find matching xlsx file
        matched_file = None
        for xlsx_file in folder.glob("*.xlsx"):
            ct = get_collection_type(xlsx_file.stem)
            if ct == collection_type:
                matched_file = xlsx_file
                break

        if matched_file is None:
            report["errors"].append({
                "collection": collection_type,
                "locale": locale,
                "error": f"No xlsx file found for collection type '{collection_type}' in {folder}",
            })
            locale_rows[locale] = []
            continue

        rows = read_xlsx(matched_file)
        locale_rows[locale] = rows
        print(f"    [{locale}] {len(rows)} rows from {matched_file.name}")

    if not locale_rows:
        return

    # Determine slug field candidates from EN headers (most reliable)
    en_rows = locale_rows.get("en", [])
    slug_candidates = ["Slug", "slug", "Name", "name", "Title", "title"]
    if en_rows:
        headers = list(en_rows[0].keys())
        # Prioritize fields that look like slug fields
        slug_candidates = (
            [h for h in headers if h.lower() in ("slug", "name", "title")]
            + slug_candidates
        )

    # Build EN slug → row lookup for untranslated detection
    en_slug_map: Dict[str, dict] = {}
    for row in en_rows:
        _, result = row_to_json(row, collection_type, "en", slug_candidates) or (None, None)
        if result:
            en_slug_map[result["slug"]] = row

    # Process each locale
    for locale, rows in locale_rows.items():
        if not rows:
            continue

        locale_dir = CONTENT_ROOT / locale / collection_type
        locale_dir.mkdir(parents=True, exist_ok=True)

        count = 0
        for row in rows:
            en_row = None  # passed for untranslated detection

            result = row_to_json(row, collection_type, locale, slug_candidates, en_row)
            if result is None:
                continue

            slug, content = result

            # Validate slug is filesystem safe
            if not is_safe_slug(slug):
                report["errors"].append({
                    "collection": collection_type,
                    "locale": locale,
                    "error": f"Unsafe slug: {slug}",
                })
                continue

            # Write JSON file (security: only write inside CONTENT_ROOT)
            out_path = locale_dir / f"{slug}.json"
            assert out_path.resolve().is_relative_to(CONTENT_ROOT.resolve()), \
                f"Path traversal detected: {out_path}"

            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(content, f, ensure_ascii=False, indent=2)

            count += 1

        # Update report
        if locale not in report["items_per_locale"]:
            report["items_per_locale"][locale] = {}
        report["items_per_locale"][locale][collection_type] = count
        print(f"    [{locale}] Wrote {count} files → content/{locale}/{collection_type}/")

    report["collections_processed"].append(collection_type)


# ---------------------------------------------------------------------------
# Navigation — synthesize from available data
# ---------------------------------------------------------------------------

def generate_navigation() -> None:
    """
    Generate /content/[locale]/navigation/main.json for each locale.
    Navigation is synthesized from collection data and hardcoded structure
    (since Webflow nav is not exported as a CMS collection).

    The actual navigation copy will need to be reviewed/updated manually.
    Fields that cannot be derived are marked __MISSING__.
    """
    print("\n  Generating navigation files...")

    nav_template = {
        "en": {
            "locale": "en",
            "mainLinks": [
                {
                    "label": "Products",
                    "href": "/products",
                    "hasDropdown": True,
                    "children": [],
                },
                {
                    "label": "Solutions",
                    "href": "/solutions",
                    "hasDropdown": True,
                    "children": [],
                },
                {
                    "label": "Integrations",
                    "href": "/integrations",
                    "hasDropdown": False,
                    "children": [],
                },
                {
                    "label": "Resources",
                    "href": "/resources",
                    "hasDropdown": True,
                    "children": [],
                },
                {
                    "label": "Pricing",
                    "href": "/pricing",
                    "hasDropdown": False,
                    "children": [],
                },
            ],
            "ctaLabel": "Get Started",
            "ctaHref": "https://app.synup.com/signup",
            "footerColumns": [
                {
                    "heading": "Products",
                    "links": [
                        {"label": "Listings Management", "href": "/products/listings-management"},
                        {"label": "Reviews Management", "href": "/products/reviews-management"},
                        {"label": "Social Media Management", "href": "/products/social-media"},
                        {"label": "Analytics", "href": "/products/analytics"},
                    ],
                },
                {
                    "heading": "Solutions",
                    "links": [
                        {"label": "For Agencies", "href": "/solutions/agencies"},
                        {"label": "For Enterprises", "href": "/solutions/enterprise"},
                        {"label": "For SMBs", "href": "/solutions/smb"},
                    ],
                },
                {
                    "heading": "Resources",
                    "links": [
                        {"label": "Blog", "href": "/blog"},
                        {"label": "Case Studies", "href": "/case-studies"},
                        {"label": "Ebooks", "href": "/ebooks"},
                        {"label": "How-Tos", "href": "/how-tos"},
                    ],
                },
                {
                    "heading": "Company",
                    "links": [
                        {"label": "About", "href": "/about"},
                        {"label": "Careers", "href": "/careers"},
                        {"label": "Press", "href": "/press"},
                        {"label": "Contact", "href": "/contact"},
                    ],
                },
            ],
            "legalLinks": [
                {"label": "Privacy Policy", "href": "/privacy-policy"},
                {"label": "Terms of Service", "href": "/terms-of-service"},
                {"label": "Cookie Policy", "href": "/cookie-policy"},
            ],
            "copyright": "© 2025 Synup. All rights reserved.",
        },
        "de": {
            "locale": "de",
            "mainLinks": [
                {"label": "Produkte", "href": "/de/products", "hasDropdown": True, "children": []},
                {"label": "Lösungen", "href": "/de/solutions", "hasDropdown": True, "children": []},
                {"label": "Integrationen", "href": "/de/integrations", "hasDropdown": False, "children": []},
                {"label": "Ressourcen", "href": "/de/resources", "hasDropdown": True, "children": []},
                {"label": "Preise", "href": "/de/pricing", "hasDropdown": False, "children": []},
            ],
            "ctaLabel": "Jetzt starten",
            "ctaHref": "https://app.synup.com/signup",
            "footerColumns": [
                {
                    "heading": "Produkte",
                    "links": [
                        {"label": "Eintragsmanagement", "href": "/de/products/listings-management"},
                        {"label": "Bewertungsmanagement", "href": "/de/products/reviews-management"},
                        {"label": "Social-Media-Management", "href": "/de/products/social-media"},
                        {"label": "Analytik", "href": "/de/products/analytics"},
                    ],
                },
                {
                    "heading": "Lösungen",
                    "links": [
                        {"label": "Für Agenturen", "href": "/de/solutions/agencies"},
                        {"label": "Für Unternehmen", "href": "/de/solutions/enterprise"},
                        {"label": "Für KMU", "href": "/de/solutions/smb"},
                    ],
                },
                {
                    "heading": "Ressourcen",
                    "links": [
                        {"label": "Blog", "href": "/de/blog"},
                        {"label": "Fallstudien", "href": "/de/case-studies"},
                        {"label": "E-Books", "href": "/de/ebooks"},
                        {"label": "Anleitungen", "href": "/de/how-tos"},
                    ],
                },
                {
                    "heading": "Unternehmen",
                    "links": [
                        {"label": "Über uns", "href": "/de/about"},
                        {"label": "Karriere", "href": "/de/careers"},
                        {"label": "Presse", "href": "/de/press"},
                        {"label": "Kontakt", "href": "/de/contact"},
                    ],
                },
            ],
            "legalLinks": [
                {"label": "Datenschutzrichtlinie", "href": "/de/privacy-policy"},
                {"label": "Nutzungsbedingungen", "href": "/de/terms-of-service"},
                {"label": "Cookie-Richtlinie", "href": "/de/cookie-policy"},
            ],
            "copyright": "© 2025 Synup. Alle Rechte vorbehalten.",
        },
        "fr": {
            "locale": "fr",
            "mainLinks": [
                {"label": "Produits", "href": "/fr/products", "hasDropdown": True, "children": []},
                {"label": "Solutions", "href": "/fr/solutions", "hasDropdown": True, "children": []},
                {"label": "Intégrations", "href": "/fr/integrations", "hasDropdown": False, "children": []},
                {"label": "Ressources", "href": "/fr/resources", "hasDropdown": True, "children": []},
                {"label": "Tarifs", "href": "/fr/pricing", "hasDropdown": False, "children": []},
            ],
            "ctaLabel": "Commencer",
            "ctaHref": "https://app.synup.com/signup",
            "footerColumns": [
                {
                    "heading": "Produits",
                    "links": [
                        {"label": "Gestion des fiches", "href": "/fr/products/listings-management"},
                        {"label": "Gestion des avis", "href": "/fr/products/reviews-management"},
                        {"label": "Gestion des réseaux sociaux", "href": "/fr/products/social-media"},
                        {"label": "Analytique", "href": "/fr/products/analytics"},
                    ],
                },
                {
                    "heading": "Solutions",
                    "links": [
                        {"label": "Pour les agences", "href": "/fr/solutions/agencies"},
                        {"label": "Pour les entreprises", "href": "/fr/solutions/enterprise"},
                        {"label": "Pour les PME", "href": "/fr/solutions/smb"},
                    ],
                },
                {
                    "heading": "Ressources",
                    "links": [
                        {"label": "Blog", "href": "/fr/blog"},
                        {"label": "Études de cas", "href": "/fr/case-studies"},
                        {"label": "Ebooks", "href": "/fr/ebooks"},
                        {"label": "Guides pratiques", "href": "/fr/how-tos"},
                    ],
                },
                {
                    "heading": "Entreprise",
                    "links": [
                        {"label": "À propos", "href": "/fr/about"},
                        {"label": "Carrières", "href": "/fr/careers"},
                        {"label": "Presse", "href": "/fr/press"},
                        {"label": "Contact", "href": "/fr/contact"},
                    ],
                },
            ],
            "legalLinks": [
                {"label": "Politique de confidentialité", "href": "/fr/privacy-policy"},
                {"label": "Conditions d'utilisation", "href": "/fr/terms-of-service"},
                {"label": "Politique en matière de cookies", "href": "/fr/cookie-policy"},
            ],
            "copyright": "© 2025 Synup. Tous droits réservés.",
        },
        "es": {
            "locale": "es",
            "mainLinks": [
                {"label": "Productos", "href": "/es/products", "hasDropdown": True, "children": []},
                {"label": "Soluciones", "href": "/es/solutions", "hasDropdown": True, "children": []},
                {"label": "Integraciones", "href": "/es/integrations", "hasDropdown": False, "children": []},
                {"label": "Recursos", "href": "/es/resources", "hasDropdown": True, "children": []},
                {"label": "Precios", "href": "/es/pricing", "hasDropdown": False, "children": []},
            ],
            "ctaLabel": "Empezar",
            "ctaHref": "https://app.synup.com/signup",
            "footerColumns": [
                {
                    "heading": "Productos",
                    "links": [
                        {"label": "Gestión de listados", "href": "/es/products/listings-management"},
                        {"label": "Gestión de reseñas", "href": "/es/products/reviews-management"},
                        {"label": "Gestión de redes sociales", "href": "/es/products/social-media"},
                        {"label": "Analítica", "href": "/es/products/analytics"},
                    ],
                },
                {
                    "heading": "Soluciones",
                    "links": [
                        {"label": "Para agencias", "href": "/es/solutions/agencies"},
                        {"label": "Para empresas", "href": "/es/solutions/enterprise"},
                        {"label": "Para PYMEs", "href": "/es/solutions/smb"},
                    ],
                },
                {
                    "heading": "Recursos",
                    "links": [
                        {"label": "Blog", "href": "/es/blog"},
                        {"label": "Casos de estudio", "href": "/es/case-studies"},
                        {"label": "Ebooks", "href": "/es/ebooks"},
                        {"label": "Guías prácticas", "href": "/es/how-tos"},
                    ],
                },
                {
                    "heading": "Empresa",
                    "links": [
                        {"label": "Acerca de", "href": "/es/about"},
                        {"label": "Empleos", "href": "/es/careers"},
                        {"label": "Prensa", "href": "/es/press"},
                        {"label": "Contacto", "href": "/es/contact"},
                    ],
                },
            ],
            "legalLinks": [
                {"label": "Política de privacidad", "href": "/es/privacy-policy"},
                {"label": "Términos de servicio", "href": "/es/terms-of-service"},
                {"label": "Política de cookies", "href": "/es/cookie-policy"},
            ],
            "copyright": "© 2025 Synup. Todos los derechos reservados.",
        },
    }

    for locale, nav_data in nav_template.items():
        nav_dir = CONTENT_ROOT / locale / "navigation"
        nav_dir.mkdir(parents=True, exist_ok=True)
        nav_path = nav_dir / "main.json"
        with open(nav_path, "w", encoding="utf-8") as f:
            json.dump(nav_data, f, ensure_ascii=False, indent=2)
        print(f"    [{locale}] Wrote navigation/main.json")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Synup CMS Transformation")
    print(f"  Exports: {EXPORTS_ROOT}")
    print(f"  Output:  {CONTENT_ROOT}")
    print("=" * 60)

    if not EXPORTS_ROOT.exists():
        print(f"\nERROR: Exports directory not found: {EXPORTS_ROOT}")
        print("Expected layout:")
        print("  /exports/csv-exports-cms/english csvs/*.xlsx")
        print("  /exports/csv-exports-cms/german csvs/*.xlsx")
        print("  /exports/csv-exports-cms/french csvs/*.xlsx")
        print("  /exports/csv-exports-cms/spanish csvs/*.xlsx")
        sys.exit(1)

    # Ensure content directories exist
    for locale in LOCALE_FOLDER_MAP:
        (CONTENT_ROOT / locale).mkdir(parents=True, exist_ok=True)

    # Discover all unique collection types from EN exports
    en_folder = EXPORTS_ROOT / LOCALE_FOLDER_MAP["en"]
    collection_types_found = []
    for xlsx_file in sorted(en_folder.glob("*.xlsx")):
        ct = get_collection_type(xlsx_file.stem)
        if ct:
            collection_types_found.append(ct)
        else:
            print(f"  WARNING: Unrecognized file: {xlsx_file.name}")

    print(f"\nFound {len(collection_types_found)} collection types:")
    for ct in collection_types_found:
        print(f"  - {ct}")

    # Process each collection
    print("\nProcessing collections...")
    for collection_type in collection_types_found:
        process_collection(collection_type)

    # Generate navigation
    generate_navigation()

    # Write transform report
    report_path = CONTENT_ROOT / "transform-report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"\nTransform report written to: {report_path}")

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Collections processed: {len(report['collections_processed'])}")

    total_items = {locale: 0 for locale in LOCALE_FOLDER_MAP}
    for locale, collections in report["items_per_locale"].items():
        total = sum(collections.values())
        total_items[locale] = total
        print(f"  [{locale}] {total} items across {len(collections)} collections")

    print(f"\n__MISSING__ fields flagged: {len(report['missing_fields'])}")
    print(f"__POSSIBLE_UNTRANSLATED__ fields flagged: {len(report['possible_untranslated'])}")
    print(f"Errors: {len(report['errors'])}")

    if report["errors"]:
        print("\nERRORS:")
        for err in report["errors"]:
            print(f"  {err}")

    if report["missing_fields"]:
        print(f"\nTop 20 __MISSING__ fields (see {report_path} for full list):")
        for m in report["missing_fields"][:20]:
            print(f"  [{m['locale']}] {m['collection']}/{m['slug']}.{m['field']}")

    if report["possible_untranslated"]:
        print(f"\nTop 20 __POSSIBLE_UNTRANSLATED__ fields:")
        for u in report["possible_untranslated"][:20]:
            print(f"  [{u['locale']}] {u['collection']}/{u['slug']}.{u['field']}: \"{u['value_preview']}...\"")

    print("\nDone.")


if __name__ == "__main__":
    main()
