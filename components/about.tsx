import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          ABOUT US
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="space-y-10">

            <div>
              <p className="text-base tracking-[0.3em] text-muted-foreground mb-4">
                UNIVERSITY COLLEGE OF ENGINEERING (AUTONOMOUS)
              </p>

              <h3 className="text-4xl md:text-5xl font-semi-bold text-foreground mb-6">
                MECHARENA 2026
              </h3>

              <div className="w-28 h-1 bg-gradient-to-r from-primary to-cyan-400" />
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              MECHARENA is a National Level Technical Symposium organized by the
              Department of Mechanical Engineering, UCE Osmania University.
              Since 2002, it has grown into one of the most recognized
              student-led technical fests in the region.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Featuring competitions, workshops, and expert talks in robotics,
              automation, 3D printing, and design & manufacturing,
              MECHARENA provides a powerful platform to innovate, compete,
              and showcase technical excellence.
            </p>

            <p className="text-xl font-semibold tracking-wider text-primary pt-4">
              ENVISION • EVOLVE • EXCEL
            </p>

          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[600px]">
            <Image
              src="images/sponsors/IMG_20251120_151840.jpg.jpeg"
              alt="Department of Mechanical Engineering"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}