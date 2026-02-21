import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.15em] mb-8 sm:mb-12 md:mb-16 font-sans">
          ABOUT US
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] mb-2">
               UNIVERSITY COLLEGE OF ENGINEERING
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-wide mb-3 sm:mb-4 font-sans">
                {"MECHARENA'2026"}
              </h3>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-cyan-400" />
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              MECHARENA, the conjugation of the finest technical minds of the country is the annual technical fest of
              UCEOU, MECHANICAL DEPARTMENT. It is a platform for your ideas to speak out loud and to promote the skills aiming to reach the
              pinnacle of your mind.
            </p>

            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-[0.1em] mb-2 sm:mb-3 font-sans">
                
              </h4>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 mb-3 sm:mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {"Empyrean Technogenesis represents the rise of technology to its highest realm—where innovation is born, evolves, and transcends limits. It symbolizes the fusion of human intellect and advanced systems, shaping a future driven by limitless progress and elevated intelligence."}
              </p>
            </div>
          </div>

          {/* Robot Image */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/images/robot-about.jpg"
              alt="Futuristic robot"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
