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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, FileText, MoreHorizontal, QrCode, Search, Send } from "lucide-react"

// Dados simulados de certificados
const certificados = [
  {
    id: 1,
    codigo: "CERT-2023-001",
    aluno: {
      nome: "João Silva",
      email: "joao.silva@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    curso: "Desenvolvimento Web",
    dataEmissao: "15/06/2023",
    dataValidade: "15/06/2028",
    status: "emitido",
  },
  {
    id: 2,
    codigo: "CERT-2023-002",
    aluno: {
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    curso: "Excel Avançado",
    dataEmissao: "20/06/2023",
    dataValidade: "20/06/2028",
    status: "emitido",
  },
  {
    id: 3,
    codigo: "CERT-2023-003",
    aluno: {
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    curso: "Inglês Técnico",
    dataEmissao: "25/06/2023",
    dataValidade: "25/06/2028",
    status: "emitido",
  },
  {
    id: 4,
    codigo: "CERT-2023-004",
    aluno: {
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    curso: "Marketing Digital",
    dataEmissao: "30/06/2023",
    dataValidade: "30/06/2028",
    status: "pendente",
  },
  {
    id: 5,
    codigo: "CERT-2023-005",
    aluno: {
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    curso: "Programação em Python",
    dataEmissao: "05/07/2023",
    dataValidade: "05/07/2028",
    status: "pendente",
  },
]

// Dados simulados de modelos de certificados
const modelosCertificados = [
  {
    id: 1,
    nome: "Padrão - Curso Livre",
    tipo: "curso_livre",
    imagem: "/placeholder.svg?height=200&width=300",
    ativo: true,
  },
  {
    id: 2,
    nome: "Padrão - Técnico",
    tipo: "tecnico",
    imagem: "/placeholder.svg?height=200&width=300",
    ativo: true,
  },
  {
    id: 3,
    nome: "Padrão - Profissionalizante",
    tipo: "profissionalizante",
    imagem: "/placeholder.svg?height=200&width=300",
    ativo: true,
  },
  {
    id: 4,
    nome: "Modelo Antigo",
    tipo: "curso_livre",
    imagem: "/placeholder.svg?height=200&width=300",
    ativo: false,
  },
]

export default function CertificadosAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("certificados")
  const [validationCode, setValidationCode] = useState("")
  const [validationResult, setValidationResult] = useState<any>(null)

  // Filtrar certificados
  const filteredCertificados = certificados.filter((certificado) => {
    const matchesSearch =
      certificado.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificado.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificado.curso.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "todos" || certificado.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Simular validação de certificado
  const validateCertificate = () => {
    const found = certificados.find((cert) => cert.codigo === validationCode)
    if (found) {
      setValidationResult({
        valid: true,
        certificate: found,
      })
    } else {
      setValidationResult({
        valid: false,
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Certificados</h1>
          <p className="text-gray-500">Emita, valide e gerencie certificados da plataforma</p>
        </div>
      </div>

      <Tabs defaultValue="certificados" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificados">Certificados</TabsTrigger>
          <TabsTrigger value="modelos">Modelos</TabsTrigger>
          <TabsTrigger value="validacao">Validação</TabsTrigger>
        </TabsList>

        <TabsContent value="certificados" className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por código, aluno ou curso..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="emitido">Emitido</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Emitir Certificado</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Emitir Novo Certificado</DialogTitle>
                    <DialogDescription>Preencha os dados para emitir um novo certificado.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="aluno" className="text-right">
                        Aluno
                      </Label>
                      <Select>
                        <SelectTrigger id="aluno" className="col-span-3">
                          <SelectValue placeholder="Selecione um aluno" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="maria">Maria Santos</SelectItem>
                          <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="curso" className="text-right">
                        Curso
                      </Label>
                      <Select>
                        <SelectTrigger id="curso" className="col-span-3">
                          <SelectValue placeholder="Selecione um curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dev_web">Desenvolvimento Web</SelectItem>
                          <SelectItem value="excel">Excel Avançado</SelectItem>
                          <SelectItem value="ingles">Inglês Técnico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="modelo" className="text-right">
                        Modelo
                      </Label>
                      <Select>
                        <SelectTrigger id="modelo" className="col-span-3">
                          <SelectValue placeholder="Selecione um modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="padrao_livre">Padrão - Curso Livre</SelectItem>
                          <SelectItem value="padrao_tecnico">Padrão - Técnico</SelectItem>
                          <SelectItem value="padrao_prof">Padrão - Profissionalizante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Emitir Certificado</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tabela de Certificados */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificados.map((certificado) => (
                  <TableRow key={certificado.id}>
                    <TableCell className="font-medium">{certificado.codigo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={certificado.aluno.avatar || "/placeholder.svg"}
                            alt={certificado.aluno.nome}
                          />
                          <AvatarFallback>{certificado.aluno.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{certificado.aluno.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>{certificado.curso}</TableCell>
                    <TableCell>{certificado.dataEmissao}</TableCell>
                    <TableCell>{certificado.dataValidade}</TableCell>
                    <TableCell>
                      <Badge variant={certificado.status === "emitido" ? "default" : "outline"}>
                        {certificado.status === "emitido" ? "Emitido" : "Pendente"}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => setSelectedCertificate(certificado)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          {certificado.status === "pendente" && (
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar por Email
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredCertificados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Nenhum certificado encontrado com os filtros selecionados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Modal de Visualização do Certificado */}
          {selectedCertificate && (
            <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Visualizar Certificado</DialogTitle>
                  <DialogDescription>Certificado {selectedCertificate.codigo}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex justify-center">
                    <img src="/placeholder.svg?height=300&width=600" alt="Certificado" className="max-w-full h-auto" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Código</Label>
                      <p className="font-medium">{selectedCertificate.codigo}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Status</Label>
                      <Badge variant={selectedCertificate.status === "emitido" ? "default" : "outline"}>
                        {selectedCertificate.status === "emitido" ? "Emitido" : "Pendente"}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Aluno</Label>
                      <p className="font-medium">{selectedCertificate.aluno.nome}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Email</Label>
                      <p className="font-medium">{selectedCertificate.aluno.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Curso</Label>
                      <p className="font-medium">{selectedCertificate.curso}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Data de Emissão</Label>
                      <p className="font-medium">{selectedCertificate.dataEmissao}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Validade</Label>
                      <p className="font-medium">{selectedCertificate.dataValidade}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  {selectedCertificate.status === "pendente" && (
                    <Button>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar por Email
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="modelos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Modelos de Certificados</h2>
            <Button>Adicionar Novo Modelo</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modelosCertificados.map((modelo) => (
              <Card key={modelo.id} className={modelo.ativo ? "" : "opacity-70"}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{modelo.nome}</CardTitle>
                    <Badge variant={modelo.ativo ? "default" : "outline"}>{modelo.ativo ? "Ativo" : "Inativo"}</Badge>
                  </div>
                  <CardDescription>Tipo: {modelo.tipo.replace("_", " ")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={modelo.imagem || "/placeholder.svg"}
                    alt={modelo.nome}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Validação de Certificados</CardTitle>
              <CardDescription>Verifique a autenticidade de um certificado pelo código</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código do certificado"
                  value={validationCode}
                  onChange={(e) => setValidationCode(e.target.value)}
                />
                <Button onClick={validateCertificate}>Validar</Button>
              </div>

              {validationResult && (
                <div
                  className={`p-4 rounded-md ${
                    validationResult.valid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  {validationResult.valid ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-700">
                        <QrCode className="h-5 w-5" />
                        <p className="font-medium">Certificado válido!</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Código:</p>
                          <p className="font-medium">{validationResult.certificate.codigo}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Aluno:</p>
                          <p className="font-medium">{validationResult.certificate.aluno.nome}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Curso:</p>
                          <p className="font-medium">{validationResult.certificate.curso}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Data de Emissão:</p>
                          <p className="font-medium">{validationResult.certificate.dataEmissao}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-700">
                      <QrCode className="h-5 w-5" />
                      <p className="font-medium">Certificado não encontrado ou inválido!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
