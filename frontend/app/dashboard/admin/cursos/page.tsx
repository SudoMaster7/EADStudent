"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Ban, Check, Edit, Eye, MoreHorizontal, Search, Trash2 } from "lucide-react"

// Dados simulados de cursos
const cursos = [
  {
    id: 1,
    titulo: "Desenvolvimento Web",
    professor: {
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    categoria: "Tecnologia",
    nivel: "Intermediário",
    status: "publicado",
    alunos: 45,
    dataCriacao: "10/01/2023",
    dataAtualizacao: "15/05/2023",
  },
  {
    id: 2,
    titulo: "Excel Avançado",
    professor: {
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    categoria: "Administração",
    nivel: "Avançado",
    status: "publicado",
    alunos: 32,
    dataCriacao: "05/02/2023",
    dataAtualizacao: "20/04/2023",
  },
  {
    id: 3,
    titulo: "Técnico em Enfermagem",
    professor: {
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    categoria: "Saúde",
    nivel: "Técnico",
    status: "revisao",
    alunos: 0,
    dataCriacao: "18/05/2023",
    dataAtualizacao: "18/05/2023",
  },
  {
    id: 4,
    titulo: "Programação em Python",
    professor: {
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    categoria: "Tecnologia",
    nivel: "Básico",
    status: "rascunho",
    alunos: 0,
    dataCriacao: "22/04/2023",
    dataAtualizacao: "30/04/2023",
  },
  {
    id: 5,
    titulo: "Marketing Digital",
    professor: {
      nome: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    categoria: "Marketing",
    nivel: "Intermediário",
    status: "arquivado",
    alunos: 15,
    dataCriacao: "03/12/2022",
    dataAtualizacao: "10/03/2023",
  },
]

export default function CursosAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("todas")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  // Filtrar cursos
  const filteredCursos = cursos.filter((curso) => {
    const matchesSearch =
      curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.professor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "todas" || curso.categoria.toLowerCase() === filterCategory.toLowerCase()
    const matchesStatus = filterStatus === "todos" || curso.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Extrair categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(cursos.map((curso) => curso.categoria)))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Cursos</h1>
          <p className="text-gray-500">Gerencie todos os cursos da plataforma</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por título ou professor..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas Categorias</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="revisao">Em Revisão</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela de Cursos */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Curso</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Alunos</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell className="font-medium">{curso.titulo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={curso.professor.avatar || "/placeholder.svg"} alt={curso.professor.nome} />
                      <AvatarFallback>{curso.professor.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{curso.professor.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{curso.categoria}</TableCell>
                <TableCell>{curso.nivel}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      curso.status === "publicado"
                        ? "default"
                        : curso.status === "revisao"
                          ? "outline"
                          : curso.status === "arquivado"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {curso.status === "publicado"
                      ? "Publicado"
                      : curso.status === "revisao"
                        ? "Em Revisão"
                        : curso.status === "rascunho"
                          ? "Rascunho"
                          : "Arquivado"}
                  </Badge>
                </TableCell>
                <TableCell>{curso.alunos}</TableCell>
                <TableCell>{curso.dataCriacao}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedCourse(curso)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {curso.status === "revisao" && (
                        <DropdownMenuItem className="text-green-600">
                          <Check className="mr-2 h-4 w-4" />
                          Aprovar
                        </DropdownMenuItem>
                      )}
                      {curso.status === "publicado" ? (
                        <DropdownMenuItem className="text-amber-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Arquivar
                        </DropdownMenuItem>
                      ) : (
                        curso.status === "arquivado" && (
                          <DropdownMenuItem className="text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            Restaurar
                          </DropdownMenuItem>
                        )
                      )}
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Curso</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita e todos os
                              dados associados serão perdidos.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredCursos.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Nenhum curso encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Detalhes do Curso */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Curso</DialogTitle>
              <DialogDescription>Informações detalhadas sobre o curso.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Título</Label>
                  <p className="font-medium">{selectedCourse.titulo}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Professor</Label>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedCourse.professor.avatar || "/placeholder.svg"}
                        alt={selectedCourse.professor.nome}
                      />
                      <AvatarFallback>{selectedCourse.professor.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{selectedCourse.professor.nome}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Categoria</Label>
                  <p className="font-medium">{selectedCourse.categoria}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Nível</Label>
                  <p className="font-medium">{selectedCourse.nivel}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <Badge
                    variant={
                      selectedCourse.status === "publicado"
                        ? "default"
                        : selectedCourse.status === "revisao"
                          ? "outline"
                          : selectedCourse.status === "arquivado"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {selectedCourse.status === "publicado"
                      ? "Publicado"
                      : selectedCourse.status === "revisao"
                        ? "Em Revisão"
                        : selectedCourse.status === "rascunho"
                          ? "Rascunho"
                          : "Arquivado"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Alunos Matriculados</Label>
                  <p className="font-medium">{selectedCourse.alunos}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Data de Criação</Label>
                  <p className="font-medium">{selectedCourse.dataCriacao}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Última Atualização</Label>
                  <p className="font-medium">{selectedCourse.dataAtualizacao}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Descrição</Label>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                </p>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Módulos</Label>
                <div className="border rounded-md p-2 space-y-2">
                  <div className="p-2 border-b">
                    <p className="font-medium">Módulo 1: Introdução</p>
                    <p className="text-sm text-gray-500">4 aulas • 45 minutos</p>
                  </div>
                  <div className="p-2 border-b">
                    <p className="font-medium">Módulo 2: Fundamentos</p>
                    <p className="text-sm text-gray-500">6 aulas • 1 hora e 20 minutos</p>
                  </div>
                  <div className="p-2">
                    <p className="font-medium">Módulo 3: Prática</p>
                    <p className="text-sm text-gray-500">5 aulas • 2 horas</p>
                  </div>
                </div>
              </div>

              {selectedCourse.status === "revisao" && (
                <div>
                  <Label htmlFor="feedback">Feedback para o Professor</Label>
                  <Textarea id="feedback" placeholder="Insira seu feedback sobre o curso aqui..." className="mt-1" />
                </div>
              )}
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              {selectedCourse.status === "revisao" && (
                <>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Rejeitar
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">Aprovar Curso</Button>
                </>
              )}
              {selectedCourse.status === "arquivado" && (
                <Button className="bg-green-600 hover:bg-green-700">Restaurar Curso</Button>
              )}
              {selectedCourse.status === "publicado" && (
                <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                  Arquivar Curso
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
