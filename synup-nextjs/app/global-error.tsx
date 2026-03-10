"use client";

/**
 * Global error boundary — catches errors in the root layout.
 * This component MUST be a Client Component.
 * It renders its own HTML shell because the root layout may have crashed.
 */

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <head>
        <title>Something went wrong — Synup</title>
      </head>
      <body
        style={{
          fontFamily: "Inter, Arial, sans-serif",
          backgroundColor: "#f7f7f8",
          margin: 0,
          padding: "80px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "480px",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#000d5e",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#21212180",
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            An unexpected error occurred. Our team has been notified. Please try
            again or return to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && error?.message && (
            <pre
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "0.75rem",
                textAlign: "left",
                overflowX: "auto",
                marginBottom: "2rem",
                color: "#cc3333",
              }}
            >
              {error.message}
              {error.digest ? `\n\nDigest: ${error.digest}` : ""}
            </pre>
          )}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                background: "#0085ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#0085ff",
                border: "1px solid #0085ff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
