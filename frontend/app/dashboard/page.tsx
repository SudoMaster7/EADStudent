"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Calendar, CheckCircle, Clock, Trophy, Users } from "lucide-react"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("aluno") // Simulação - em produção, viria da autenticação
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulação de carregamento do progresso
    const timer = setTimeout(() => setProgress(67), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo de volta, Usuário!</p>
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

      {userRole === "aluno" && <AlunoContent progress={progress} />}
      {userRole === "professor" && <ProfessorContent />}
      {userRole === "admin" && <AdminContent />}
    </div>
  )
}

function AlunoContent({ progress }: { progress: number }) {
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

  return (
    <>
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
                <Link href="/dashboard/cursos">Ver Todos os Cursos</Link>
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
                <Link href="/dashboard/atividades">Ver Todas as Atividades</Link>
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
            <Link href="/dashboard/conquistas">Ver Todas as Conquistas</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

function ProfessorContent() {
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

  return (
    <>
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cursos Ativos</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Alunos</p>
                <h3 className="text-2xl font-bold">77</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendentes</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Bell className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Notificações</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </>
  )
}

function AdminContent() {
  // Dados simulados
  const estatisticas = [
    { title: "Usuários Ativos", value: 523, change: "+12%", icon: Users },
    { title: "Cursos Ativos", value: 48, change: "+3", icon: BookOpen },
    { title: "Certificados Emitidos", value: 312, change: "+28", icon: Trophy },
    { title: "Taxa de Conclusão", value: "78%", change: "+5%", icon: CheckCircle },
  ]

  return (
    <>
      {/* Resumo  value: "78%", change: "+5%", icon: CheckCircle },
  ];

  return (
    <>
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estatisticas.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos e Relatórios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Usuários Registrados</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md">
              <p className="text-gray-500">Gráfico de usuários registrados</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cursos Mais Populares</CardTitle>
            <CardDescription>Por número de matrículas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md">
              <p className="text-gray-500">Gráfico de cursos populares</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas ações na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 border-b last:border-0">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Novo usuário registrado</p>
                    <span className="text-sm text-gray-500">Há 2 horas</span>
                  </div>
                  <p className="text-sm text-gray-600">João Silva se registrou como aluno</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/admin/atividades">Ver Todas as Atividades</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Usuários</CardTitle>
            <CardDescription>Adicionar, editar ou remover usuários</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/admin/usuarios">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Cursos</CardTitle>
            <CardDescription>Aprovar, editar ou remover cursos</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/admin/cursos">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificados</CardTitle>
            <CardDescription>Gerenciar e validar certificados emitidos</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/admin/certificados">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
