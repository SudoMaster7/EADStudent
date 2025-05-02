import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeaturedCourses } from "@/components/featured-courses"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/fundec-logo.png?height=40&width=40" alt="FUNDEC Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-blue-700">FUNDEC EAD</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-blue-700 hover:text-blue-500 font-medium">
            Início
          </Link>
          <Link href="/cursos" className="text-blue-700 hover:text-blue-500 font-medium">
            Cursos
          </Link>
          <Link href="/sobre" className="text-blue-700 hover:text-blue-500 font-medium">
            Sobre
          </Link>
          <Link href="/contato" className="text-blue-700 hover:text-blue-500 font-medium">
            Contato
          </Link>
        </nav>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/registro">Cadastrar</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <HeroSection />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">Cursos em Destaque</h2>
          <FeaturedCourses />
        </section>

        <AboutSection />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">Por que escolher a FUNDEC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-blue-700">Qualidade Reconhecida</h3>
                <p>Cursos técnicos e profissionalizantes com certificação reconhecida no mercado de trabalho.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-blue-700">Professores Especializados</h3>
                <p>Corpo docente formado por profissionais com ampla experiência prática e acadêmica.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-blue-700">Metodologia Inovadora</h3>
                <p>Aprendizado prático com foco no desenvolvimento de habilidades valorizadas pelo mercado.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FUNDEC EAD</h3>
              <p>Fundação de Apoio à Escola Técnica de Duque de Caxias, RJ.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/cursos" className="hover:underline">
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="hover:underline">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:underline">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>contato@fundec.edu.br</li>
                <li>(21) 1234-5678</li>
                <li>Duque de Caxias, RJ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-blue-300">
                  Facebook
                </Link>
                <Link href="#" className="hover:text-blue-300">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-blue-300">
                  YouTube
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-700 text-center">
            <p>© {new Date().getFullYear()} FUNDEC EAD. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
