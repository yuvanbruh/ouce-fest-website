import React from "react"
import Link from "next/link"

export default function BrochurePage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mecharena 2026 Brochure</h1>

        <div className="flex gap-4 items-center mb-4">
          <a
            href="/brochure.pdf"
            download
            className="inline-block bg-cyan-600 text-white px-4 py-2 rounded shadow hover:bg-cyan-500 transition"
          >
            Download Brochure (PDF)
          </a>

          <Link href="/" className="text-sm text-muted-foreground underline">
            Back to Home
          </Link>
        </div>

        <div className="w-full h-[80vh] bg-[#0b0e11] rounded overflow-hidden shadow-lg">
          {/* Browser PDF viewer; replace /brochure.pdf in public/ with your file to load */}
          <iframe
            src="/brochure.pdf"
            title="Mecharena Brochure"
            className="w-full h-full block"
            style={{ border: "none" }}
          />
        </div>

        <p className="text-sm text-muted-foreground mt-3">
          If the PDF doesn't load, upload the brochure file to <code>/public/brochure.pdf</code> in the repository and refresh.
        </p>
      </div>
    </main>
  )
}
