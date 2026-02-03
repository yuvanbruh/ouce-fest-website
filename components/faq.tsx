"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What is Cognizance?",
    answer:
      "Cognizance is the annual technical festival of IIT Roorkee, one of the largest and most prestigious techfests in India. It brings together the brightest minds from across the country to participate in competitions, workshops, and exhibitions.",
  },
  {
    id: 2,
    question: "What is a Pronite?",
    answer:
      "Pronite refers to the professional night events during Cognizance, featuring performances by renowned artists, bands, and entertainers. These are the highlight evening events that provide a perfect blend of technology and entertainment.",
  },
  {
    id: 3,
    question: "How to register for Cognizance 2026?",
    answer:
      "You can register for Cognizance 2026 by clicking the 'Register' button on our homepage or visiting the registration page. Fill in your details, verify your email, and complete the payment process to secure your spot.",
  },
  {
    id: 4,
    question: "What is included in the CLASSIC Pass?",
    answer:
      "The CLASSIC Pass includes access to all main events, workshops, exhibitions, and selected pronites. It also provides accommodation facilities, event merchandise, and priority registration for popular competitions.",
  },
  {
    id: 5,
    question: "How to register for Events in Cognizance 2026?",
    answer:
      "After completing your Cognizance registration, log in to your dashboard and browse the Events section. Select the events you wish to participate in, form teams if required, and submit your registration before the deadline.",
  },
]

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.15em] mb-16 font-sans">
          FAQS
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`border-b border-border/50 transition-colors ${
                openId === faq.id ? "bg-secondary/20" : ""
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between py-5 px-4 text-left hover:bg-secondary/10 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm">{faq.id}.</span>
                  <span className="text-primary font-medium">{faq.question}</span>
                </div>
                <span className="text-muted-foreground">
                  {openId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              {openId === faq.id && (
                <div className="px-4 pb-5 pl-12">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
