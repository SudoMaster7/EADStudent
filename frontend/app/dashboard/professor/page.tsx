"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Calendar, Clock, FileText, MessageSquare, Plus, Users } from "lucide-react"

export default function ProfessorDashboard() {
  // Dados simulados
  const cursos = [
    {
      id: 1,
      title: "Desenvolvimento Web",
      students: 45,
      lastUpdate: "Hoje",
      status: "ativo",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Excel Avançado",
      students: 32,
      lastUpdate: "Ontem",
      status: "ativo",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Programação em Python",
      students: 0,
      lastUpdate: "3 dias atrás",
      status: "rascunho",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const atividades = [
    {
      id: 1,
      title: "Projetos para avaliar",
      count: 12,
      course: "Desenvolvimento Web",
      deadline: "Em 2 dias",
    },
    {
      id: 2,
      title: "Dúvidas no fórum",
      count: 8,
      course: "Excel Avançado",
      deadline: "Novas",
    },
  ]

  const estatisticas = [
    {
      title: "Cursos Ativos",
      value: 2,
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Total de Alunos",
      value: 77,
      icon: Users,
      color: "green",
    },
    {
      title: "Pendências",
      value: 12,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Notificações",
      value: 5,
      icon: Bell,
      color: "purple",
    },
  ]

  const proximasAulas = [
    {
      id: 1,
      title: "Introdução ao CSS Grid",
      course: "Desenvolvimento Web",
      date: "Hoje, 14:00",
      students: 45,
    },
    {
      id: 2,
      title: "Fórmulas Avançadas",
      course: "Excel Avançado",
      date: "Amanhã, 10:00",
      students: 32,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard do Professor</h1>
          <p className="text-gray-500">Bem-vindo de volta, Professor!</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Agenda
          </Button>
          <Button asChild>
            <Link href="/dashboard/professor/criar-curso">
              <Plus className="mr-2 h-4 w-4" />
              Criar Curso
            </Link>
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estatisticas.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-700`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Próximas Aulas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Aulas</CardTitle>
          <CardDescription>Aulas agendadas para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proximasAulas.map((aula) => (
              <div key={aula.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">{aula.title}</h4>
                    <p className="text-sm text-gray-500">{aula.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{aula.date}</p>
                  <p className="text-sm text-gray-500">{aula.students} alunos</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/professor/agenda">Ver Agenda Completa</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Cursos e Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Meus Cursos</CardTitle>
                <CardDescription>Gerencie seus cursos</CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/professor/criar-curso">Criar Curso</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ativos">
                <TabsList className="mb-4">
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                </TabsList>

                <TabsContent value="ativos" className="space-y-6">
                  {cursos
                    .filter((curso) => curso.status === "ativo")
                    .map((curso) => (
                      <div key={curso.id} className="flex gap-4">
                        <img
                          src={curso.image || "/placeholder.svg"}
                          alt={curso.title}
                          className="w-24 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{curso.title}</h3>
                            <Badge variant="outline">{curso.students} alunos</Badge>
                          </div>
                          <div className="text-sm text-gray-500">Última atualização: {curso.lastUpdate}</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}`}>Editar</Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}/alunos`}>Ver Alunos</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="rascunhos" className="space-y-6">
                  {cursos
                    .filter((curso) => curso.status === "rascunho")
                    .map((curso) => (
                      <div key={curso.id} className="flex gap-4">
                        <img
                          src={curso.image || "/placeholder.svg"}
                          alt={curso.title}
                          className="w-24 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{curso.title}</h3>
                            <Badge variant="outline">Rascunho</Badge>
                          </div>
                          <div className="text-sm text-gray-500">Última atualização: {curso.lastUpdate}</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}`}>Continuar Editando</Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}/publicar`}>Publicar</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="todos" className="space-y-6">
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
                          <Badge variant={curso.status === "ativo" ? "default" : "outline"}>
                            {curso.status === "ativo" ? `${curso.students} alunos` : "Rascunho"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">Última atualização: {curso.lastUpdate}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/professor/cursos/${curso.id}`}>
                              {curso.status === "ativo" ? "Editar" : "Continuar Editando"}
                            </Link>
                          </Button>
                          {curso.status === "ativo" ? (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}/alunos`}>Ver Alunos</Link>
                            </Button>
                          ) : (
                            <Button size="sm" asChild>
                              <Link href={`/dashboard/professor/cursos/${curso.id}/publicar`}>Publicar</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/professor/cursos">Ver Todos os Cursos</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Pendências</CardTitle>
              <CardDescription>Itens que precisam de sua atenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atividades.map((atividade) => (
                  <div key={atividade.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{atividade.title}</h4>
                      <Badge>{atividade.count}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{atividade.course}</p>
                    <p className="text-sm text-gray-500">{atividade.deadline}</p>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/dashboard/professor/atividades/${atividade.id}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/professor/atividades">Ver Todas as Pendências</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Fórum de Discussão */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Fórum de Discussão</CardTitle>
            <CardDescription>Perguntas recentes dos alunos</CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard/professor/forum">Ver Todos</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dúvida sobre Flexbox</h4>
                    <p className="text-sm text-gray-500">Por Maria Santos • Desenvolvimento Web • 2 dias atrás</p>
                  </div>
                </div>
                <Badge variant="outline">3 respostas</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
