// import Image from "next/image"

// const sponsors = [
//   { src: "/images/sponsors/dr.png" },
//   { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTljkTq3KC4mwqsAQgBKjcglqRugXQeOjQkZg&s" },
//   { src: "/images/sponsors/10.jpeg" },
//   { src: "images/sponsors/download (2).png" },
//   { src: "/images/sponsors/12.png" },
//   { src: "images/sponsors/download (2).jpeg" },
//   { src: "/images/sponsors/download.png" },
//   { src: "/images/sponsors/download (1).png" },
//   { src: "images/sponsors/download (1).jpeg" },
//   { src: "/images/sponsors/images.png" },
//   { src: "/images/sponsors/DAIKIN_logo.svg.png" },
//   { src: "https://www.nmdc.co.in/cms-admin/Upload/NMDC_Logo/0d973f519b264626ba25b92727159077_20230804120651702.jpg" },
// ]

// export function Sponsors() {
//   return (
//     <section id="sponsors" className="py-16 bg-background">
//       <div className="container mx-auto px-4 max-w-6xl">

//         <h3 className="text-4xl font-bold text-primary text-center mb-12">
//           Previous Sponsors
//         </h3>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
//           {sponsors.map((sponsor, index) => (
//             <div
//               key={index}
//               className="h-24 flex items-center justify-center bg-card/5 rounded-xl border border-border/20 p-4 hover:shadow-md transition"
//             >
//               <Image
//                 src={sponsor.src}
//                 alt="Sponsor Logo"
//                 width={140}
//                 height={80}
//                 className="object-contain w-auto h-auto max-h-16"
//               />
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   )
// }
"use client"

import Image from "next/image"

const sponsors = [
  { src: "images/sponsors/download (4).png" },
  { src: "/images/sponsors/dr.png" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTljkTq3KC4mwqsAQgBKjcglqRugXQeOjQkZg&s" },
  { src: "/images/sponsors/10.jpeg" },
  { src: "/images/sponsors/download (2).png" },
  { src: "/images/sponsors/12.png" },
  { src: "/images/sponsors/download (2).jpeg" },
  { src: "/images/sponsors/download.png" },
  { src: "/images/sponsors/download (1).png" },
  { src: "/images/sponsors/download (1).jpeg" },
  { src: "/images/sponsors/images.png" },
  { src: "/images/sponsors/DAIKIN_logo.svg.png" },
  { src: "https://www.nmdc.co.in/cms-admin/Upload/NMDC_Logo/0d973f519b264626ba25b92727159077_20230804120651702.jpg" },
]

export function Sponsors() {
  return (
    <section id="sponsors" className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <h3 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
          Previous Sponsors
        </h3>

        {/* Slider Wrapper */}
        <div className="relative w-full overflow-hidden">

          <div className="flex w-max animate-scroll gap-10">
            {/* Duplicate array for seamless loop */}
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center 
                           h-20 sm:h-24 
                           min-w-[140px] sm:min-w-[180px]
                           bg-card/5 
                           rounded-xl 
                           border border-border/20 
                           px-6"
              >
                <Image
                  src={sponsor.src}
                  alt="Sponsor Logo"
                  width={160}
                  height={80}
                  className="object-contain max-h-12 sm:max-h-16 w-auto"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}