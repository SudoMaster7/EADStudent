"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Upload } from "lucide-react"

export default function CriarCursoPage() {
  const [activeTab, setActiveTab] = useState("informacoes")
  const [modules, setModules] = useState([
    { id: 1, title: "Módulo 1", lessons: [{ id: 1, title: "Aula 1", type: "video" }] },
  ])

  const addModule = () => {
    const newId = modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1
    setModules([...modules, { id: newId, title: `Módulo ${newId}`, lessons: [] }])
  }

  const removeModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId))
  }

  const addLesson = (moduleId: number) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const newLessonId = module.lessons.length > 0 ? Math.max(...module.lessons.map((l) => l.id)) + 1 : 1
          return {
            ...module,
            lessons: [...module.lessons, { id: newLessonId, title: `Aula ${newLessonId}`, type: "video" }],
          }
        }
        return module
      }),
    )
  }

  const removeLesson = (moduleId: number, lessonId: number) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
          }
        }
        return module
      }),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Criar Novo Curso</h1>
          <p className="text-gray-500">Preencha as informações para criar um novo curso</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/professor/cursos">Cancelar</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Salvar Curso</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Salvar Curso</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja salvar o curso como rascunho ou publicá-lo imediatamente?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="outline">Salvar como Rascunho</Button>
                </AlertDialogAction>
                <AlertDialogAction asChild>
                  <Button>Publicar Agora</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="informacoes" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="informacoes">Informações</TabsTrigger>
          <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Preencha as informações básicas do curso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Curso</Label>
                <Input id="title" placeholder="Ex: Desenvolvimento Web Completo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreva o curso em detalhes..." className="min-h-32" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="administracao">Administração</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="idiomas">Idiomas</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Nível</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basico">Básico</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (em semanas)</Label>
                  <Input id="duration" type="number" min="1" placeholder="Ex: 12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificate">Certificado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de certificado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curso_livre">Curso Livre</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="profissionalizante">Profissionalizante</SelectItem>
                      <SelectItem value="extensao">Extensão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Imagem de Capa</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">Arraste uma imagem ou clique para fazer upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG ou JPEG (máx. 2MB)</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objetivos de Aprendizagem</CardTitle>
              <CardDescription>O que os alunos aprenderão neste curso?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objectives">Objetivos (um por linha)</Label>
                <Textarea
                  id="objectives"
                  placeholder="Ex: Criar páginas web responsivas com HTML e CSS"
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prerequisites">Pré-requisitos (um por linha)</Label>
                <Textarea
                  id="prerequisites"
                  placeholder="Ex: Conhecimentos básicos de informática"
                  className="min-h-32"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("conteudo")}>
                Voltar
              </Button>
              <Button onClick={() => setActiveTab("conteudo")}>Próximo: Conteúdo</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="conteudo" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Estrutura do Curso</CardTitle>
                <CardDescription>Organize os módulos e aulas do seu curso</CardDescription>
              </div>
              <Button onClick={addModule}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Módulo
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {modules.map((module) => (
                <div key={module.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor={`module-${module.id}-title`}>Título do Módulo</Label>
                      <Input
                        id={`module-${module.id}-title`}
                        value={module.title}
                        onChange={(e) => {
                          setModules(modules.map((m) => (m.id === module.id ? { ...m, title: e.target.value } : m)))
                        }}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeModule(module.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Aulas</Label>
                      <Button variant="outline" size="sm" onClick={() => addLesson(module.id)}>
                        <Plus className="mr-2 h-3 w-3" />
                        Adicionar Aula
                      </Button>
                    </div>

                    <div className="space-y-3 mt-3">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-3 border rounded-md p-3">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <Label htmlFor={`lesson-${module.id}-${lesson.id}-title`} className="text-xs">
                                Título
                              </Label>
                              <Input
                                id={`lesson-${module.id}-${lesson.id}-title`}
                                value={lesson.title}
                                onChange={(e) => {
                                  setModules(
                                    modules.map((m) => {
                                      if (m.id === module.id) {
                                        return {
                                          ...m,
                                          lessons: m.lessons.map((l) =>
                                            l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                          ),
                                        }
                                      }
                                      return m
                                    }),
                                  )
                                }}
                              />
                            </div>

                            <div className="space-y-1">
                              <Label htmlFor={`lesson-${module.id}-${lesson.id}-type`} className="text-xs">
                                Tipo
                              </Label>
                              <Select
                                value={lesson.type}
                                onValueChange={(value) => {
                                  setModules(
                                    modules.map((m) => {
                                      if (m.id === module.id) {
                                        return {
                                          ...m,
                                          lessons: m.lessons.map((l) =>
                                            l.id === lesson.id ? { ...l, type: value } : l,
                                          ),
                                        }
                                      }
                                      return m
                                    }),
                                  )
                                }}
                              >
                                <SelectTrigger id={`lesson-${module.id}-${lesson.id}-type`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Vídeo</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="assignment">Atividade</SelectItem>
                                  <SelectItem value="text">Texto</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-1">
                              <Label htmlFor={`lesson-${module.id}-${lesson.id}-duration`} className="text-xs">
                                Duração (min)
                              </Label>
                              <Input
                                id={`lesson-${module.id}-${lesson.id}-duration`}
                                type="number"
                                min="1"
                                placeholder="Ex: 15"
                              />
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeLesson(module.id, lesson.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      {module.lessons.length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm border rounded-md">
                          Nenhuma aula adicionada. Clique em "Adicionar Aula" para começar.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {modules.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum módulo adicionado. Clique em "Adicionar Módulo" para começar.
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("informacoes")}>
                Voltar
              </Button>
              <Button onClick={() => setActiveTab("materiais")}>Próximo: Materiais</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="materiais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiais Complementares</CardTitle>
              <CardDescription>Adicione arquivos e recursos para os alunos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">Arraste arquivos ou clique para fazer upload</p>
                <p className="text-xs text-gray-400">PDF, DOC, PPT, ZIP (máx. 50MB por arquivo)</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Selecionar Arquivos
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Arquivos Adicionados</h3>

                <div className="border rounded-lg divide-y">
                  {[
                    { id: 1, name: "Apostila do Curso.pdf", size: "2.4 MB", type: "pdf" },
                    { id: 2, name: "Exemplos de Código.zip", size: "5.2 MB", type: "zip" },
                  ].map((file) => (
                    <div key={file.id} className="flex justify-between items-center p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Upload className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="links">Links Externos (um por linha)</Label>
                <Textarea
                  id="links"
                  placeholder="Ex: https://exemplo.com/recurso - Título do Recurso"
                  className="min-h-32"
                />
                <p className="text-xs text-gray-500">
                  Formato: URL - Título do Link (ex: https://exemplo.com - Site de Exemplo)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("conteudo")}>
                Voltar
              </Button>
              <Button onClick={() => setActiveTab("configuracoes")}>Próximo: Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Curso</CardTitle>
              <CardDescription>Defina as configurações e opções do curso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Opções de Visibilidade</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="visible">Curso Visível</Label>
                    <p className="text-sm text-gray-500">
                      Quando ativado, o curso aparecerá na lista de cursos disponíveis
                    </p>
                  </div>
                  <Switch id="visible" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enrollment">Matrículas Abertas</Label>
                    <p className="text-sm text-gray-500">Quando ativado, os alunos poderão se matricular no curso</p>
                  </div>
                  <Switch id="enrollment" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="forum">Fórum de Discussão</Label>
                    <p className="text-sm text-gray-500">
                      Quando ativado, os alunos poderão interagir no fórum do curso
                    </p>
                  </div>
                  <Switch id="forum" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Certificação</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="certificate-enabled">Emitir Certificado</Label>
                    <p className="text-sm text-gray-500">
                      Quando ativado, os alunos receberão certificado ao concluir o curso
                    </p>
                  </div>
                  <Switch id="certificate-enabled" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion">Critério de Conclusão</Label>
                  <Select defaultValue="100">
                    <SelectTrigger id="completion">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100% do conteúdo concluído</SelectItem>
                      <SelectItem value="80">80% do conteúdo concluído</SelectItem>
                      <SelectItem value="final">Apenas avaliação final</SelectItem>
                      <SelectItem value="custom">Critério personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Avaliação</h3>

                <div className="space-y-2">
                  <Label htmlFor="grading">Sistema de Avaliação</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger id="grading">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem (0-100%)</SelectItem>
                      <SelectItem value="points">Pontos</SelectItem>
                      <SelectItem value="letter">Conceitos (A, B, C, D, F)</SelectItem>
                      <SelectItem value="pass_fail">Aprovado/Reprovado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-grade">Correção Automática</Label>
                    <p className="text-sm text-gray-500">Quando ativado, quizzes serão corrigidos automaticamente</p>
                  </div>
                  <Switch id="auto-grade" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("materiais")}>
                Voltar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Finalizar e Salvar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Salvar Curso</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja salvar o curso como rascunho ou publicá-lo imediatamente?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant="outline">Salvar como Rascunho</Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                      <Button>Publicar Agora</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
