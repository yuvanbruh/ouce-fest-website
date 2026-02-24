"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What is Mecharena?",
    answer:
      "Mecharena 2026 is a celebration of mechanical engineering, robotics, and innovation — bringing together students, professionals, and enthusiasts for competitions, workshops, and showcases.",
  },
 {
  id: 2,
  question: "What is My Pass?",
  answer:
    "'My Pass' allows you to check all the events you have registered for using your phone number. You can view your registration status (Verified or Pending) and see your event details in one place.",
},
  {
    id: 3,
    question: "How do I register for Mecharena 2026?",
    answer:
      "Register by clicking the 'Register' button on the site or visiting the registration page. Complete the form, verify your email, and follow the payment instructions to confirm your participation.",
  },
  {
    id: 4,
    question: "What does the CLASSIC Pass include?",
    answer:
      "The CLASSIC Pass grants access to main events, selected workshops, exhibitions, and certain pronites. It may include event merchandise and priority entry where applicable — check the pass details on the registration page.",
  },
  {
    id: 5,
    question: "How do I register for individual events at Mecharena?",
    answer:
      "After registering for Mecharena, log into your dashboard, go to the 'Events' section, choose the events you want to join, form or join teams if needed, and submit your event registrations before the deadline.",
  },
]

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.15em] mb-12 sm:mb-16 font-sans">
          FAQs
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
