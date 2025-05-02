import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Dados simulados de cursos em destaque
const featuredCourses = [
  {
    id: 1,
    title: "Técnico em Informática",
    description: "Aprenda programação, redes, manutenção de computadores e desenvolvimento web.",
    image: "/tecnologia.png?height=200&width=300",
    category: "Tecnologia",
    duration: "18 meses",
    level: "Técnico",
  },
  {
    id: 2,
    title: "Auxiliar Administrativo",
    description: "Desenvolva habilidades essenciais para trabalhar em setores administrativos.",
    image: "/administrativo.png?height=200&width=300",
    category: "Administração",
    duration: "6 meses",
    level: "Profissionalizante",
  },
  {
    id: 3,
    title: "Técnico em Enfermagem",
    description: "Formação completa para atuar como técnico de enfermagem em hospitais e clínicas.",
    image: "/enfermagem.png?height=200&width=300",
    category: "Saúde",
    duration: "24 meses",
    level: "Técnico",
  },
]

export function FeaturedCourses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredCourses.map((course) => (
        <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
          <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <Badge variant="outline" className="bg-blue-50">
                {course.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-600">{course.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{course.category}</span>
              <span>Duração: {course.duration}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/cursos/${course.id}`}>Ver Detalhes</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
