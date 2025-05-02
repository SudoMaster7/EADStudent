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
  DialogTrigger,
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
import { Ban, Check, Edit, MoreHorizontal, Search, Trash2, UserPlus } from "lucide-react"

// Dados simulados de usuários
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    tipo: "aluno",
    status: "ativo",
    dataCadastro: "15/03/2023",
    cursos: 3,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    tipo: "aluno",
    status: "ativo",
    dataCadastro: "22/04/2023",
    cursos: 2,
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    tipo: "professor",
    status: "ativo",
    dataCadastro: "10/01/2023",
    cursos: 4,
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    tipo: "aluno",
    status: "inativo",
    dataCadastro: "05/02/2023",
    cursos: 1,
  },
  {
    id: 5,
    nome: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    tipo: "professor",
    status: "pendente",
    dataCadastro: "18/05/2023",
    cursos: 0,
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    tipo: "admin",
    status: "ativo",
    dataCadastro: "03/12/2022",
    cursos: 0,
  },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [filterStatus, setFilterStatus] = useState("todos")

  // Filtrar usuários
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "todos" || usuario.tipo === filterType
    const matchesStatus = filterStatus === "todos" || usuario.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-gray-500">Gerencie os usuários da plataforma</p>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>Preencha os dados para adicionar um novo usuário à plataforma.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input id="nome" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">
                    Tipo
                  </Label>
                  <Select>
                    <SelectTrigger id="tipo" className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluno">Aluno</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nome ou email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="aluno">Alunos</SelectItem>
              <SelectItem value="professor">Professores</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Cursos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={usuario.nome} />
                      <AvatarFallback>{usuario.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{usuario.nome}</p>
                      <p className="text-sm text-gray-500">{usuario.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      usuario.tipo === "admin"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : usuario.tipo === "professor"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {usuario.tipo === "admin" ? "Administrador" : usuario.tipo === "professor" ? "Professor" : "Aluno"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      usuario.status === "ativo" ? "default" : usuario.status === "inativo" ? "destructive" : "outline"
                    }
                  >
                    {usuario.status === "ativo" ? "Ativo" : usuario.status === "inativo" ? "Inativo" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell>{usuario.dataCadastro}</TableCell>
                <TableCell>{usuario.cursos}</TableCell>
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {usuario.status === "pendente" && (
                        <DropdownMenuItem className="text-green-600">
                          <Check className="mr-2 h-4 w-4" />
                          Aprovar
                        </DropdownMenuItem>
                      )}
                      {usuario.status === "ativo" ? (
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Desativar
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <Check className="mr-2 h-4 w-4" />
                          Ativar
                        </DropdownMenuItem>
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
                            <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
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

            {filteredUsuarios.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Nenhum usuário encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
