import Image from "next/image"

const sponsors = [
  { src: "/images/sponsors/sponsor-1.svg", name: "Sponsor 1" },
  { src: "/images/sponsors/sponsor-2.svg", name: "Sponsor 2" },
  { src: "/images/sponsors/sponsor-3.svg", name: "Sponsor 3" },
  { src: "/images/sponsors/sponsor-4.svg", name: "Sponsor 4" },
  { src: "/images/sponsors/sponsor-5.svg", name: "Sponsor 5" },
  { src: "/images/sponsors/sponsor-6.svg", name: "Sponsor 6" },
]

export function Sponsors() {
  return (
    <section id="sponsors" className="py-14 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center text-primary mb-8">Previous Sponsors</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {sponsors.map((s) => (
            <div key={s.name} className="flex items-center justify-center p-4 bg-card/5 rounded-md border border-border/20">
              <Image src={s.src} alt={s.name} width={160} height={60} className="object-contain" />
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-4">Replace the placeholder logos in <code>/public/images/sponsors/</code> with real sponsor images to update this section.</p>
      </div>
    </section>
  )
}
