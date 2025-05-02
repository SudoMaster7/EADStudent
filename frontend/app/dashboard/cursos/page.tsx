import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Dados simulados de cursos
const cursos = [
  {
    id: 1,
    title: "Desenvolvimento Web",
    description: "Aprenda HTML, CSS, JavaScript e React para criar sites modernos e responsivos.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Tecnologia",
    duration: "18 semanas",
    level: "Intermediário",
    progress: 67,
    enrolled: true,
  },
  {
    id: 2,
    title: "Excel Avançado",
    description: "Domine fórmulas avançadas, tabelas dinâmicas e automação com macros no Excel.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Administração",
    duration: "8 semanas",
    level: "Avançado",
    progress: 42,
    enrolled: true,
  },
  {
    id: 3,
    title: "Inglês Técnico",
    description: "Aprenda vocabulário técnico em inglês para melhorar sua comunicação profissional.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Idiomas",
    duration: "12 semanas",
    level: "Básico ao Intermediário",
    progress: 89,
    enrolled: true,
  },
  {
    id: 4,
    title: "Técnico em Enfermagem",
    description: "Formação completa para atuar como técnico de enfermagem em hospitais e clínicas.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Saúde",
    duration: "24 meses",
    level: "Técnico",
    progress: 0,
    enrolled: false,
  },
  {
    id: 5,
    title: "Auxiliar Administrativo",
    description: "Desenvolva habilidades essenciais para trabalhar em setores administrativos.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Administração",
    duration: "6 meses",
    level: "Básico",
    progress: 0,
    enrolled: false,
  },
  {
    id: 6,
    title: "Programação em Python",
    description: "Aprenda a linguagem Python para desenvolvimento de aplicações e análise de dados.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Tecnologia",
    duration: "14 semanas",
    level: "Intermediário",
    progress: 0,
    enrolled: false,
  },
]

export default function CursosPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cursos</h1>
          <p className="text-gray-500">Explore e matricule-se nos cursos disponíveis</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Buscar cursos..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="administracao">Administração</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="idiomas">Idiomas</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Níveis</SelectItem>
              <SelectItem value="basico">Básico</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
              <SelectItem value="tecnico">Técnico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Meus Cursos */}
      <div>
        <h2 className="text-xl font-bold mb-4">Meus Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos
            .filter((curso) => curso.enrolled)
            .map((curso) => (
              <Card key={curso.id} className="overflow-hidden transition-all hover:shadow-lg">
                <img src={curso.image || "/placeholder.svg"} alt={curso.title} className="w-full h-48 object-cover" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{curso.title}</h3>
                    <Badge variant="outline" className="bg-blue-50">
                      {curso.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{curso.category}</span>
                    <span>Duração: {curso.duration}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{curso.progress}%</span>
                    </div>
                    <Progress value={curso.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/cursos/${curso.id}`}>Continuar</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      {/* Cursos Disponíveis */}
      <div>
        <h2 className="text-xl font-bold mb-4">Cursos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos
            .filter((curso) => !curso.enrolled)
            .map((curso) => (
              <Card key={curso.id} className="overflow-hidden transition-all hover:shadow-lg">
                <img src={curso.image || "/placeholder.svg"} alt={curso.title} className="w-full h-48 object-cover" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{curso.title}</h3>
                    <Badge variant="outline" className="bg-blue-50">
                      {curso.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600 line-clamp-2">{curso.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{curso.category}</span>
                    <span>Duração: {curso.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" asChild className="flex-1">
                    <Link href={`/dashboard/cursos/${curso.id}/detalhes`}>Ver Detalhes</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href={`/dashboard/cursos/${curso.id}/matricula`}>Matricular</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
