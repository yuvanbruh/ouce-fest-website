import Image from "next/image"

const sponsors = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_2013_Google.png/1200px-Logo_2013_Google.png", name: "Google" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png", name: "Microsoft" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png", name: "AWS" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Avalanche_blockchain_logo.svg/1200px-Avalanche_blockchain_logo.svg.png", name: "Avalanche" },
  { src: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/ISRO_logo.svg/1024px-ISRO_logo.svg.png", name: "ISRO" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png", name: "Google Cloud" },
]

export function Sponsors() {
  return (
    <section id="sponsors" className="py-10 sm:py-12 md:py-14 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center text-primary mb-6 sm:mb-8">Previous Sponsors</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 items-center justify-center">
          {sponsors.map((s) => (
            <div key={s.name} className="flex items-center justify-center p-2 sm:p-3 md:p-4 bg-card/5 rounded-md border border-border/20">
              <Image src={s.src} alt={s.name} width={120} height={50} className="object-contain w-full h-auto max-w-[100px] sm:max-w-[120px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
