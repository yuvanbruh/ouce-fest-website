import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Events } from "@/components/events"
import { Workshops } from "@/components/workshops"
import { FAQ } from "@/components/faq"
import { Sponsors } from "@/components/sponsors"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Sponsors />
      <Workshops />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
