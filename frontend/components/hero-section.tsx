import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 leading-tight">
          Transforme seu futuro com a FUNDEC EAD
        </h1>
        <p className="text-xl text-gray-600">
          Cursos técnicos e profissionalizantes de qualidade para impulsionar sua carreira. Estude online com
          flexibilidade e certificação reconhecida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/registro">Comece Agora</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cursos">Ver Cursos</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/school.png?height=400&width=500"
          alt="Estudantes da FUNDEC"
          className="rounded-lg shadow-xl max-w-full h-auto"
        />
      </div>
    </section>
  )
}
