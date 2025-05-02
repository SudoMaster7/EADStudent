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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("aluno")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulação de login - em produção, isso seria uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para o dashboard específico com base no tipo de usuário selecionado
      router.push(`/dashboard/${activeTab}`)
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.")
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
            <CardTitle className="text-2xl text-center">Acesse sua conta</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="aluno" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="aluno">Aluno</TabsTrigger>
                <TabsTrigger value="professor">Professor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              {["aluno", "professor", "admin"].map((role) => (
                <TabsContent key={role} value={role}>
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/registro" className="text-blue-600 hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
