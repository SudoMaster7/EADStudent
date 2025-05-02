"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, CheckCircle, Clock, GraduationCap, Play, Trophy } from "lucide-react"

export default function AlunoDashboard() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulação de carregamento do progresso
    const timer = setTimeout(() => setProgress(67), 500)
    return () => clearTimeout(timer)
  }, [])

  // Dados simulados
  const cursos = [
    {
      id: 1,
      title: "Desenvolvimento Web",
      progress: 67,
      lastAccess: "Hoje",
      nextClass: "CSS Avançado",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Excel Avançado",
      progress: 42,
      lastAccess: "Ontem",
      nextClass: "Fórmulas Avançadas",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Inglês Técnico",
      progress: 89,
      lastAccess: "3 dias atrás",
      nextClass: "Vocabulário Técnico",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const atividades = [
    {
      id: 1,
      title: "Projeto Final - Desenvolvimento Web",
      deadline: "Em 5 dias",
      course: "Desenvolvimento Web",
      status: "pendente",
    },
    {
      id: 2,
      title: "Quiz - Excel Avançado",
      deadline: "Em 2 dias",
      course: "Excel Avançado",
      status: "pendente",
    },
    {
      id: 3,
      title: "Apresentação - Inglês Técnico",
      deadline: "Concluído",
      course: "Inglês Técnico",
      status: "concluido",
    },
  ]

  const conquistas = [
    {
      id: 1,
      title: "Primeira Aula",
      description: "Completou sua primeira aula",
      icon: "🎯",
    },
    {
      id: 2,
      title: "Estudante Dedicado",
      description: "Estudou por 5 dias consecutivos",
      icon: "🔥",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Acertou 100% em um quiz",
      icon: "🏆",
    },
  ]

  const cursosRecomendados = [
    {
      id: 4,
      title: "Programação em Python",
      description: "Aprenda a linguagem Python para desenvolvimento de aplicações e análise de dados.",
      category: "Tecnologia",
      level: "Intermediário",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "Marketing Digital",
      description: "Estratégias e ferramentas para marketing online e gestão de redes sociais.",
      category: "Marketing",
      level: "Básico",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard do Aluno</h1>
          <p className="text-gray-500">Bem-vindo de volta, Aluno!</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Calendário
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Continuar Estudando
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cursos Ativos</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Atividades Concluídas</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conquistas</p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próxima Aula */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Aprendendo</CardTitle>
          <CardDescription>Retome de onde você parou</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">CSS Avançado - Flexbox e Grid</h3>
                <p className="text-sm text-gray-500">Módulo 3: CSS Básico e Intermediário • Desenvolvimento Web</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                20 min
              </Badge>
            </div>
            <Progress value={25} className="h-2" />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">25% concluído</p>
              <Button size="sm" className="gap-1">
                <Play className="h-4 w-4" />
                Continuar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso do Curso */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
          <CardDescription>Seu progresso em todos os cursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Cursos e Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Meus Cursos</CardTitle>
              <CardDescription>Continue de onde parou</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cursos.map((curso) => (
                  <div key={curso.id} className="flex gap-4">
                    <img
                      src={curso.image || "/placeholder.svg"}
                      alt={curso.title}
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{curso.title}</h3>
                        <span className="text-sm text-gray-500">Último acesso: {curso.lastAccess}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{curso.progress}%</span>
                        </div>
                        <Progress value={curso.progress} className="h-2" />
                      </div>
                      <div className="text-sm">
                        Próxima aula: <span className="font-medium">{curso.nextClass}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/aluno/cursos">Ver Todos os Cursos</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Atividades</CardTitle>
              <CardDescription>Suas próximas entregas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atividades.map((atividade) => (
                  <div key={atividade.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{atividade.title}</h4>
                      <Badge variant={atividade.status === "concluido" ? "outline" : "default"}>
                        {atividade.status === "concluido" ? "Concluído" : atividade.deadline}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{atividade.course}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/aluno/atividades">Ver Todas as Atividades</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Conquistas */}
      <Card>
        <CardHeader>
          <CardTitle>Conquistas Recentes</CardTitle>
          <CardDescription>Suas últimas conquistas desbloqueadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conquistas.map((conquista) => (
              <div key={conquista.id} className="border rounded-lg p-4 text-center space-y-2">
                <div className="text-3xl">{conquista.icon}</div>
                <h4 className="font-medium">{conquista.title}</h4>
                <p className="text-sm text-gray-500">{conquista.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/aluno/conquistas">Ver Todas as Conquistas</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Cursos Recomendados */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos Recomendados</CardTitle>
          <CardDescription>Com base nos seus interesses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cursosRecomendados.map((curso) => (
              <div key={curso.id} className="border rounded-lg overflow-hidden">
                <img src={curso.image || "/placeholder.svg"} alt={curso.title} className="w-full h-32 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{curso.title}</h4>
                    <Badge variant="outline">{curso.level}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{curso.description}</p>
                  <p className="text-xs text-gray-400">{curso.category}</p>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/dashboard/aluno/cursos/${curso.id}`}>Ver Detalhes</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/aluno/descobrir">Descobrir Mais Cursos</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Certificados */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Meus Certificados</CardTitle>
            <CardDescription>Certificados obtidos</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/aluno/certificados">Ver Todos</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border rounded-lg">
            <div className="text-center">
              <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Complete um curso para obter seu primeiro certificado</p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/aluno/cursos">Explorar Cursos</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
