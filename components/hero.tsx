import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Navigation from "@/components/navigation"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fixed Navigation */}
      <Navigation />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/todo_bg_01.webp')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm mb-8">
            <CheckCircle className="h-4 w-4" />
            <span>Einfach. Effizient. Überall.</span>
          </div>

          {/* H1 Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight mb-6">
            Alle To Do's in der Hosentasche
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 text-pretty leading-relaxed mb-10 max-w-2xl mx-auto">
            Verwalte deine Aufgaben mühelos – jederzeit und überall. 
            Die smarte To-Do App, die sich deinem Leben anpasst.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8" asChild>
              <Link href="/auth/sign-up">Jetzt starten</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
            >
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
