"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, Download, FileText, MessageSquare, Play, PlayCircle } from "lucide-react"

export default function CursoPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("conteudo")

  // Simulação de dados do curso
  const curso = {
    id: Number.parseInt(params.id),
    title: "Desenvolvimento Web",
    description: "Aprenda HTML, CSS, JavaScript e React para criar sites modernos e responsivos.",
    image: "/placeholder.svg?height=300&width=800",
    category: "Tecnologia",
    duration: "18 semanas",
    level: "Intermediário",
    progress: 67,
    instructor: "Prof. Carlos Silva",
    instructorImage: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    students: 45,
    lastAccess: "Ontem",
    nextClass: "CSS Avançado - Flexbox e Grid",
    modules: [
      {
        id: 1,
        title: "Introdução ao Desenvolvimento Web",
        progress: 100,
        lessons: [
          { id: 1, title: "Boas-vindas ao curso", duration: "5 min", type: "video", completed: true },
          { id: 2, title: "Como funciona a web", duration: "12 min", type: "video", completed: true },
          { id: 3, title: "Ferramentas necessárias", duration: "8 min", type: "video", completed: true },
          { id: 4, title: "Quiz: Conceitos básicos", duration: "10 min", type: "quiz", completed: true },
        ],
      },
      {
        id: 2,
        title: "HTML Básico",
        progress: 100,
        lessons: [
          { id: 5, title: "Estrutura básica do HTML", duration: "15 min", type: "video", completed: true },
          { id: 6, title: "Tags principais", duration: "18 min", type: "video", completed: true },
          { id: 7, title: "Formulários", duration: "20 min", type: "video", completed: true },
          { id: 8, title: "Prática: Criando uma página", duration: "30 min", type: "assignment", completed: true },
        ],
      },
      {
        id: 3,
        title: "CSS Básico e Intermediário",
        progress: 75,
        lessons: [
          { id: 9, title: "Introdução ao CSS", duration: "10 min", type: "video", completed: true },
          { id: 10, title: "Seletores e propriedades", duration: "15 min", type: "video", completed: true },
          { id: 11, title: "Box Model", duration: "12 min", type: "video", completed: true },
          { id: 12, title: "CSS Flexbox", duration: "20 min", type: "video", completed: false },
          { id: 13, title: "CSS Grid", duration: "25 min", type: "video", completed: false },
          {
            id: 14,
            title: "Prática: Estilizando uma página",
            duration: "45 min",
            type: "assignment",
            completed: false,
          },
        ],
      },
      {
        id: 4,
        title: "JavaScript Básico",
        progress: 0,
        lessons: [
          { id: 15, title: "Introdução ao JavaScript", duration: "15 min", type: "video", completed: false },
          { id: 16, title: "Variáveis e tipos de dados", duration: "18 min", type: "video", completed: false },
          { id: 17, title: "Funções", duration: "20 min", type: "video", completed: false },
          { id: 18, title: "DOM Manipulation", duration: "25 min", type: "video", completed: false },
          {
            id: 19,
            title: "Prática: Criando interatividade",
            duration: "40 min",
            type: "assignment",
            completed: false,
          },
        ],
      },
      {
        id: 5,
        title: "Projeto Final",
        progress: 0,
        lessons: [
          { id: 20, title: "Requisitos do projeto", duration: "10 min", type: "video", completed: false },
          { id: 21, title: "Planejamento", duration: "15 min", type: "video", completed: false },
          { id: 22, title: "Desenvolvimento do projeto", duration: "120 min", type: "assignment", completed: false },
          { id: 23, title: "Entrega e avaliação", duration: "30 min", type: "assignment", completed: false },
        ],
      },
    ],
    materials: [
      { id: 1, title: "Guia de HTML5", type: "pdf", size: "2.4 MB" },
      { id: 2, title: "Cheatsheet CSS", type: "pdf", size: "1.8 MB" },
      { id: 3, title: "Exemplos de código", type: "zip", size: "5.2 MB" },
      { id: 4, title: "Slides das aulas", type: "pptx", size: "8.7 MB" },
    ],
    forum: [
      {
        id: 1,
        title: "Dúvida sobre Flexbox",
        author: "Maria Santos",
        date: "2 dias atrás",
        replies: 3,
      },
      {
        id: 2,
        title: "Problema com responsividade",
        author: "João Oliveira",
        date: "1 semana atrás",
        replies: 5,
      },
      {
        id: 3,
        title: "Como centralizar um div?",
        author: "Ana Costa",
        date: "3 dias atrás",
        replies: 8,
      },
    ],
  }

  // Encontrar a próxima aula não concluída
  const findNextLesson = () => {
    for (const module of curso.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          return { moduleId: module.id, lesson }
        }
      }
    }
    return null
  }

  const nextLesson = findNextLesson()

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Curso */}
      <div className="relative">
        <img
          src={curso.image || "/placeholder.svg"}
          alt={curso.title}
          className="w-full h-48 md:h-64 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">{curso.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-blue-500 hover:bg-blue-600">{curso.category}</Badge>
              <Badge variant="outline" className="text-white border-white">
                {curso.level}
              </Badge>
              <span className="text-sm">Duração: {curso.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso e Próxima Aula */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
            <CardDescription>Continue de onde parou</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso geral</span>
                <span className="font-medium">{curso.progress}%</span>
              </div>
              <Progress value={curso.progress} className="h-2" />
            </div>

            {nextLesson && (
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Próxima Aula</h3>
                    <p className="text-sm text-gray-500">
                      Módulo {nextLesson.moduleId}: {curso.modules.find((m) => m.id === nextLesson.moduleId)?.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {nextLesson.lesson.duration}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{nextLesson.lesson.title}</h4>
                  <Button size="sm" className="gap-1">
                    <Play className="h-4 w-4" />
                    Iniciar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instrutor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={curso.instructorImage || "/placeholder.svg"}
                alt={curso.instructor}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="font-medium">{curso.instructor}</h3>
              <p className="text-sm text-gray-500">Especialista em Desenvolvimento Web</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm">{curso.rating}/5</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Ver Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo do Curso */}
      <Tabs defaultValue="conteudo" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="forum">Fórum</TabsTrigger>
          <TabsTrigger value="sobre">Sobre</TabsTrigger>
        </TabsList>

        <TabsContent value="conteudo" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {curso.modules.map((module) => (
              <AccordionItem key={module.id} value={`module-${module.id}`}>
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                  <div className="flex flex-1 justify-between items-center pr-4">
                    <div className="text-left">
                      <h3 className="font-medium">
                        Módulo {module.id}: {module.title}
                      </h3>
                      <p className="text-sm text-gray-500">{module.lessons.length} aulas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={module.progress} className="w-24 h-2" />
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-2 py-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          lesson.completed ? "bg-green-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {lesson.type === "video" && <PlayCircle className="h-5 w-5 text-blue-600" />}
                          {lesson.type === "quiz" && <FileText className="h-5 w-5 text-purple-600" />}
                          {lesson.type === "assignment" && <FileText className="h-5 w-5 text-orange-600" />}
                          <div>
                            <h4 className={`font-medium ${lesson.completed ? "text-green-700" : ""}`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>
                                {lesson.type === "video" ? "Vídeo" : lesson.type === "quiz" ? "Quiz" : "Atividade"}
                              </span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 gap-1 border-green-200">
                              <CheckCircle className="h-3 w-3" />
                              Concluído
                            </Badge>
                          ) : (
                            <Button size="sm">Iniciar</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="materiais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiais do Curso</CardTitle>
              <CardDescription>Arquivos complementares para seus estudos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curso.materials.map((material) => (
                  <div key={material.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">{material.title}</h4>
                        <p className="text-sm text-gray-500">
                          {material.type.toUpperCase()} • {material.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forum" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fórum de Discussão</CardTitle>
                <CardDescription>Tire suas dúvidas e interaja com outros alunos</CardDescription>
              </div>
              <Button>Nova Discussão</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curso.forum.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">{topic.title}</h4>
                        <p className="text-sm text-gray-500">
                          Por {topic.author} • {topic.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{topic.replies} respostas</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sobre" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-gray-700">{curso.description}</p>
                <p className="text-gray-700 mt-2">
                  Este curso foi desenvolvido para iniciantes que desejam ingressar no mundo do desenvolvimento web.
                  Você aprenderá desde os conceitos básicos de HTML e CSS até a criação de aplicações interativas com
                  JavaScript e React.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">O que você aprenderá</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Estruturar páginas web com HTML5 semântico</li>
                  <li>Estilizar sites com CSS moderno (Flexbox e Grid)</li>
                  <li>Criar interatividade com JavaScript</li>
                  <li>Desenvolver interfaces responsivas</li>
                  <li>Implementar boas práticas de desenvolvimento web</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Pré-requisitos</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Conhecimentos básicos de informática</li>
                  <li>Acesso a um computador com conexão à internet</li>
                  <li>Vontade de aprender e praticar</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Informações Adicionais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p className="font-medium">{curso.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nível</p>
                    <p className="font-medium">{curso.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duração</p>
                    <p className="font-medium">{curso.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Alunos</p>
                    <p className="font-medium">{curso.students}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
