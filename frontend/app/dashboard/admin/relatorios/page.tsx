"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Download, BarChart3, PieChart, LineChart, Users, BookOpen, GraduationCap } from "lucide-react"

export default function RelatoriosAdminPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios e Análises</h1>
          <p className="text-gray-500">Visualize dados e métricas da plataforma</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <DatePickerWithRange />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select defaultValue="todas">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas Categorias</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="administracao">Administração</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="idiomas">Idiomas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Usuário</label>
                <Select defaultValue="todos">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos Usuários</SelectItem>
                    <SelectItem value="alunos">Alunos</SelectItem>
                    <SelectItem value="professores">Professores</SelectItem>
                    <SelectItem value="admins">Administradores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Aplicar Filtros</Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="visao_geral" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="visao_geral">Visão Geral</TabsTrigger>
              <TabsTrigger value="usuarios">Usuários</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            </TabsList>

            <TabsContent value="visao_geral" className="space-y-4">
              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total de Usuários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">523</p>
                        <p className="text-xs text-green-600">+12% no último mês</p>
                      </div>
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Cursos Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">48</p>
                        <p className="text-xs text-green-600">+3 no último mês</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Certificados Emitidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">312</p>
                        <p className="text-xs text-green-600">+28 no último mês</p>
                      </div>
                      <GraduationCap className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Usuários Registrados</CardTitle>
                    <CardDescription>Últimos 30 dias</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de usuários registrados</p>
                        <p className="text-sm text-gray-400 mt-2">Dados dos últimos 30 dias</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cursos Mais Populares</CardTitle>
                    <CardDescription>Por número de matrículas</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de cursos populares</p>
                        <p className="text-sm text-gray-400 mt-2">Top 5 cursos por matrículas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Conclusão de Cursos</CardTitle>
                  <CardDescription>Porcentagem de alunos que concluem os cursos</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Gráfico de taxa de conclusão</p>
                      <p className="text-sm text-gray-400 mt-2">Dados por categoria de curso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usuarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento de Usuários</CardTitle>
                  <CardDescription>Novos registros ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Gráfico de crescimento de usuários</p>
                      <p className="text-sm text-gray-400 mt-2">Dados mensais</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Tipo</CardTitle>
                    <CardDescription>Alunos, professores e administradores</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de distribuição de usuários</p>
                        <p className="text-sm text-gray-400 mt-2">Por tipo de usuário</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engajamento de Usuários</CardTitle>
                    <CardDescription>Frequência de acesso à plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de engajamento</p>
                        <p className="text-sm text-gray-400 mt-2">Acessos por semana</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cursos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cursos por Categoria</CardTitle>
                    <CardDescription>Distribuição de cursos por área</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de distribuição de cursos</p>
                        <p className="text-sm text-gray-400 mt-2">Por categoria</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Matrículas por Curso</CardTitle>
                    <CardDescription>Top 10 cursos mais populares</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de matrículas</p>
                        <p className="text-sm text-gray-400 mt-2">Top 10 cursos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Avaliações de Cursos</CardTitle>
                  <CardDescription>Média de avaliações por categoria</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Gráfico de avaliações</p>
                      <p className="text-sm text-gray-400 mt-2">Média por categoria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financeiro" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>Receita gerada ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Gráfico de receita mensal</p>
                      <p className="text-sm text-gray-400 mt-2">Últimos 12 meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Receita por Categoria</CardTitle>
                    <CardDescription>Distribuição de receita por área</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de receita por categoria</p>
                        <p className="text-sm text-gray-400 mt-2">Distribuição percentual</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Valor Médio por Matrícula</CardTitle>
                    <CardDescription>Evolução do ticket médio</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center border rounded-md">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Gráfico de ticket médio</p>
                        <p className="text-sm text-gray-400 mt-2">Evolução trimestral</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
