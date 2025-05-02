"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulação de registro - em produção, isso seria uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulação de sucesso - redirecionar para o login
      router.push("/login")
    } catch (err) {
      setError("Falha no cadastro. Tente novamente mais tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <img src="/fundec-logo.png?height=40&width=40" alt="FUNDEC Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-blue-700">FUNDEC EAD</h1>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crie sua conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para se cadastrar na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="aluno" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="aluno">Aluno</TabsTrigger>
                <TabsTrigger value="professor">Professor</TabsTrigger>
              </TabsList>

              <TabsContent value="aluno">
                <form onSubmit={handleRegistro} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input id="sobrenome" type="text" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" type="text" placeholder="000.000.000-00" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha</Label>
                      <Input id="senha" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                      <Input id="confirmar-senha" type="password" required />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="termos" required />
                    <Label htmlFor="termos" className="text-sm">
                      Concordo com os{" "}
                      <Link href="/termos" className="text-blue-600 hover:underline">
                        termos de uso
                      </Link>{" "}
                      e{" "}
                      <Link href="/privacidade" className="text-blue-600 hover:underline">
                        política de privacidade
                      </Link>
                    </Label>
                  </div>

                  {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="professor">
                <form onSubmit={handleRegistro} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-prof">Nome</Label>
                      <Input id="nome-prof" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome-prof">Sobrenome</Label>
                      <Input id="sobrenome-prof" type="text" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-prof">E-mail</Label>
                    <Input id="email-prof" type="email" placeholder="seu@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf-prof">CPF</Label>
                    <Input id="cpf-prof" type="text" placeholder="000.000.000-00" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Área de Especialização</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="administracao">Administração</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="engenharia">Engenharia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formacao">Formação Acadêmica</Label>
                    <Input id="formacao" type="text" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-prof">Senha</Label>
                      <Input id="senha-prof" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha-prof">Confirmar Senha</Label>
                      <Input id="confirmar-senha-prof" type="password" required />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="termos-prof" required />
                    <Label htmlFor="termos-prof" className="text-sm">
                      Concordo com os{" "}
                      <Link href="/termos" className="text-blue-600 hover:underline">
                        termos de uso
                      </Link>{" "}
                      e{" "}
                      <Link href="/privacidade" className="text-blue-600 hover:underline">
                        política de privacidade
                      </Link>
                    </Label>
                  </div>

                  {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Solicitar Cadastro"}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Cadastros de professores passam por aprovação administrativa.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
