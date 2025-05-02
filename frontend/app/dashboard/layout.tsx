"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Book,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Trophy,
  User,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Extract the user role from the URL path with better validation
  const determineUserRole = () => {
    const pathParts = pathname.split("/")
    const potentialRole = pathParts[2]

    // Check if the potential role is one of our valid roles
    if (potentialRole === "aluno" || potentialRole === "professor" || potentialRole === "admin") {
      return potentialRole
    }

    // For shared paths like /dashboard/cursos, /dashboard/forum, etc.
    // Default to "aluno" role
    return "aluno"
  }

  const userRole = determineUserRole()

  // Function to check if a navigation item is active
  const isNavItemActive = (href: string) => {
    // Exact match
    if (pathname === href) return true

    // Check if it's a sub-path of the current path (for nested routes)
    if (href !== "/dashboard" && pathname.startsWith(href)) return true

    // Special case for the dashboard home
    if (href === `/dashboard/${userRole}` && (pathname === `/dashboard/${userRole}` || pathname === "/dashboard"))
      return true

    return false
  }

  // Menus de navegação por tipo de usuário
  const navItems = {
    aluno: [
      { name: "Início", href: "/dashboard/aluno", icon: Home },
      { name: "Meus Cursos", href: "/dashboard/cursos", icon: Book },
      { name: "Calendário", href: "/dashboard/calendario", icon: Calendar },
      { name: "Fórum", href: "/dashboard/forum", icon: MessageSquare },
      { name: "Conquistas", href: "/dashboard/conquistas", icon: Trophy },
      { name: "Perfil", href: "/dashboard/perfil", icon: User },
    ],
    professor: [
      { name: "Início", href: "/dashboard/professor", icon: Home },
      { name: "Meus Cursos", href: "/dashboard/professor/cursos", icon: Book },
      { name: "Criar Curso", href: "/dashboard/professor/criar-curso", icon: Book },
      { name: "Avaliações", href: "/dashboard/professor/avaliacoes", icon: Calendar },
      { name: "Fórum", href: "/dashboard/forum", icon: MessageSquare },
      { name: "Perfil", href: "/dashboard/perfil", icon: User },
    ],
    admin: [
      { name: "Início", href: "/dashboard/admin", icon: Home },
      { name: "Usuários", href: "/dashboard/admin/usuarios", icon: User },
      { name: "Cursos", href: "/dashboard/admin/cursos", icon: Book },
      { name: "Relatórios", href: "/dashboard/admin/relatorios", icon: Calendar },
      { name: "Certificados", href: "/dashboard/admin/certificados", icon: Trophy },
      { name: "Configurações", href: "/dashboard/admin/configuracoes", icon: Settings },
    ],
  }

  // Get user display name based on role
  const getUserDisplayName = () => {
    switch (userRole) {
      case "professor":
        return "Professor"
      case "admin":
        return "Administrador"
      default:
        return "Aluno"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 py-4">
                    <img src="/fundec-logo.png?height=40&width=40" alt="FUNDEC Logo" className="h-8 w-8" />
                    <h1 className="text-xl font-bold text-blue-700">FUNDEC EAD</h1>
                  </div>
                  <nav className="flex-1 space-y-1 py-4">
                    {navItems[userRole as keyof typeof navItems].map((item) => {
                      const isActive = isNavItemActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                            isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href={`/dashboard/${userRole}`} className="flex items-center gap-2">
              <img src="/fundec-logo.png?height=40&width=40" alt="FUNDEC Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-blue-700 hidden md:block">FUNDEC EAD</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer py-3">
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">Nova aula disponível</div>
                        <div className="text-sm text-gray-500">
                          A aula "Introdução ao HTML" foi adicionada ao curso de Desenvolvimento Web.
                        </div>
                        <div className="text-xs text-gray-400">Há 2 horas</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center font-medium text-blue-600">
                  Ver todas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex">{getUserDisplayName()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Desktop only */}
        <aside className="hidden md:block w-64 bg-white border-r h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navItems[userRole as keyof typeof navItems].map((item) => {
              const isActive = isNavItemActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                    isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
