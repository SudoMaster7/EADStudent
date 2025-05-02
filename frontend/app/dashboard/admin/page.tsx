"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, BookOpen, CheckCircle, Download, PieChart, Settings, Trophy, Users } from "lucide-react"

export default function AdminDashboard() {
  // Dados simulados
  const estatisticas = [
    { title: "Usuários Ativos", value: 523, change: "+12%", icon: Users },
    { title: "Cursos Ativos", value: 48, change: "+3", icon: BookOpen },
    { title: "Certificados Emitidos", value: 312, change: "+28", icon: Trophy },
    { title: "Taxa de Conclusão", value: "78%", change: "+5%", icon: CheckCircle },
  ]

  const atividadesRecentes = [
    {
      id: 1,
      tipo: "usuario",
      titulo: "Novo usuário registrado",
      descricao: "João Silva se registrou como aluno",
      tempo: "Há 2 horas",
      icon: Users,
    },
    {
      id: 2,
      tipo: "curso",
      titulo: "Novo curso publicado",
      descricao: "Prof. Carlos publicou o curso 'Desenvolvimento Web'",
      tempo: "Há 3 horas",
      icon: BookOpen,
    },
    {
      id: 3,
      tipo: "certificado",
      titulo: "Certificado emitido",
      descricao: "Maria Santos concluiu o curso 'Excel Avançado'",
      tempo: "Há 5 horas",
      icon: Trophy,
    },
    {
      id: 4,
      tipo: "aprovacao",
      titulo: "Professor pendente",
      descricao: "Roberto Almeida solicitou cadastro como professor",
      tempo: "Há 1 dia",
      icon: Users,
    },
    {
      id: 5,
      tipo: "sistema",
      titulo: "Backup realizado",
      descricao: "Backup automático do sistema concluído",
      tempo: "Há 1 dia",
      icon: Settings,
    },
  ]

  const usuariosPendentes = [
    {
      id: 1,
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      tipo: "professor",
      area: "Tecnologia",
      data: "18/05/2023",
    },
    {
      id: 2,
      nome: "Fernanda Santos",
      email: "fernanda.santos@email.com",
      tipo: "professor",
      area: "Administração",
      data: "20/05/2023",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Administrativo</h1>
          <p className="text-gray-500">Bem-vindo de volta, Administrador!</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatórios
          </Button>
          <Button asChild>
            <Link href="/dashboard/admin/configuracoes">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
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

      {/* Aprovações Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle>Aprovações Pendentes</CardTitle>
          <CardDescription>Usuários aguardando aprovação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuariosPendentes.map((usuario) => (
              <div key={usuario.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">{usuario.nome}</h4>
                    <p className="text-sm text-gray-500">
                      {usuario.email} • {usuario.tipo} • {usuario.area}
                    </p>
                    <p className="text-xs text-gray-400">Solicitado em {usuario.data}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Recusar
                  </Button>
                  <Button size="sm">Aprovar</Button>
                </div>
              </div>
            ))}

            {usuariosPendentes.length === 0 && (
              <div className="text-center py-8 text-gray-500">Não há aprovações pendentes no momento.</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/admin/usuarios?status=pendente">Ver Todas as Solicitações</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Gráficos e Relatórios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Usuários Registrados</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Gráfico de usuários registrados</p>
                <p className="text-sm text-gray-400 mt-2">Dados dos últimos 30 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Cursos Mais Populares</CardTitle>
              <CardDescription>Por número de matrículas</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Gráfico de cursos populares</p>
                <p className="text-sm text-gray-400 mt-2">Top 5 cursos por matrículas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações na plataforma</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/admin/atividades">Ver Todas</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atividadesRecentes.map((atividade) => (
              <div key={atividade.id} className="flex items-start gap-4 p-3 border-b last:border-0">
                <div className="bg-gray-100 p-2 rounded-full">
                  <atividade.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{atividade.titulo}</p>
                    <span className="text-sm text-gray-500">{atividade.tempo}</span>
                  </div>
                  <p className="text-sm text-gray-600">{atividade.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  )
}
