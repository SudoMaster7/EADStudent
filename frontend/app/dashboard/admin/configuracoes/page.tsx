"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"

export default function ConfiguracoesAdminPage() {
  const [emailSettings, setEmailSettings] = useState({
    enableWelcomeEmail: true,
    enableCourseCompletionEmail: true,
    enableCertificateEmail: true,
    enableNewsletterEmail: false,
  })

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "FUNDEC EAD",
    siteDescription: "Plataforma de ensino online da FUNDEC para cursos técnicos e profissionalizantes",
    enableRegistration: true,
    requireApproval: true,
    enableCertificates: true,
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações do Sistema</h1>
          <p className="text-gray-500">Gerencie as configurações da plataforma</p>
        </div>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="aparencia">Aparência</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="integracao">Integrações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input
                    id="site-name"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL do Site</Label>
                  <Input id="site-url" value="https://fundec-ead.com.br" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Funcionalidades</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registration">Permitir Cadastros</Label>
                    <p className="text-sm text-gray-500">Habilitar novos cadastros na plataforma</p>
                  </div>
                  <Switch
                    id="registration"
                    checked={generalSettings.enableRegistration}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, enableRegistration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="approval">Exigir Aprovação</Label>
                    <p className="text-sm text-gray-500">Novos usuários precisam de aprovação administrativa</p>
                  </div>
                  <Switch
                    id="approval"
                    checked={generalSettings.requireApproval}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, requireApproval: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="certificates">Emissão de Certificados</Label>
                    <p className="text-sm text-gray-500">Habilitar emissão de certificados para cursos concluídos</p>
                  </div>
                  <Switch
                    id="certificates"
                    checked={generalSettings.enableCertificates}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, enableCertificates: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Cursos</CardTitle>
              <CardDescription>Configurações relacionadas aos cursos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-course-type">Tipo de Curso Padrão</Label>
                  <Select defaultValue="curso_livre">
                    <SelectTrigger id="default-course-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curso_livre">Curso Livre</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="profissionalizante">Profissionalizante</SelectItem>
                      <SelectItem value="extensao">Extensão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-completion">Critério de Conclusão Padrão</Label>
                  <Select defaultValue="100">
                    <SelectTrigger id="default-completion">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100% do conteúdo concluído</SelectItem>
                      <SelectItem value="80">80% do conteúdo concluído</SelectItem>
                      <SelectItem value="final">Apenas avaliação final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="course-approval">Aprovação de Cursos</Label>
                    <p className="text-sm text-gray-500">Novos cursos precisam de aprovação administrativa</p>
                  </div>
                  <Switch id="course-approval" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="course-forum">Fórum nos Cursos</Label>
                    <p className="text-sm text-gray-500">Habilitar fórum de discussão em todos os cursos</p>
                  </div>
                  <Switch id="course-forum" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema e Aparência</CardTitle>
              <CardDescription>Personalize a aparência da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Logo do Site</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                  <img src="/placeholder.svg?height=60&width=200" alt="Logo atual" className="h-15 w-auto mb-2" />
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">Arraste uma imagem ou clique para fazer upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG ou SVG (máx. 2MB)</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                  <img src="/placeholder.svg?height=32&width=32" alt="Favicon atual" className="h-8 w-8 mb-2" />
                  <Upload className="h-6 w-6 text-gray-400" />
                  <p className="text-sm text-gray-500">Arraste uma imagem ou clique para fazer upload</p>
                  <p className="text-xs text-gray-400">ICO, PNG (máx. 1MB)</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input type="color" id="primary-color" defaultValue="#1E40AF" className="w-12 h-10 p-1" />
                    <Input defaultValue="#1E40AF" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input type="color" id="secondary-color" defaultValue="#2563EB" className="w-12 h-10 p-1" />
                    <Input defaultValue="#2563EB" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme-mode">Modo do Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema (automático)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalização da Página Inicial</CardTitle>
              <CardDescription>Configure os elementos da página inicial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Título do Hero</Label>
                <Input id="hero-title" defaultValue="Transforme seu futuro com a FUNDEC EAD" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtítulo do Hero</Label>
                <Textarea
                  id="hero-subtitle"
                  defaultValue="Cursos técnicos e profissionalizantes de qualidade para impulsionar sua carreira. Estude online com flexibilidade e certificação reconhecida."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-courses">Cursos em Destaque</Label>
                <Select defaultValue="popular">
                  <SelectTrigger id="featured-courses">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais Populares</SelectItem>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="manual">Seleção Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-testimonials">Mostrar Depoimentos</Label>
                  <p className="text-sm text-gray-500">Exibir seção de depoimentos na página inicial</p>
                </div>
                <Switch id="show-testimonials" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure o servidor de email e notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Servidor SMTP</Label>
                  <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Porta SMTP</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">Usuário SMTP</Label>
                  <Input id="smtp-user" defaultValue="contato@fundec.edu.br" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Senha SMTP</Label>
                  <Input id="smtp-password" type="password" defaultValue="********" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-email">Email de Remetente</Label>
                <Input id="from-email" defaultValue="noreply@fundec.edu.br" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply-to">Email de Resposta</Label>
                <Input id="reply-to" defaultValue="contato@fundec.edu.br" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notificações por Email</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="welcome-email">Email de Boas-vindas</Label>
                    <p className="text-sm text-gray-500">Enviar email quando um novo usuário se cadastrar</p>
                  </div>
                  <Switch
                    id="welcome-email"
                    checked={emailSettings.enableWelcomeEmail}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableWelcomeEmail: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="course-completion">Email de Conclusão de Curso</Label>
                    <p className="text-sm text-gray-500">Enviar email quando um aluno concluir um curso</p>
                  </div>
                  <Switch
                    id="course-completion"
                    checked={emailSettings.enableCourseCompletionEmail}
                    onCheckedChange={(checked) =>
                      setEmailSettings({ ...emailSettings, enableCourseCompletionEmail: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="certificate-email">Email de Certificado</Label>
                    <p className="text-sm text-gray-500">Enviar email com o certificado quando emitido</p>
                  </div>
                  <Switch
                    id="certificate-email"
                    checked={emailSettings.enableCertificateEmail}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableCertificateEmail: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter-email">Newsletter</Label>
                    <p className="text-sm text-gray-500">Enviar emails periódicos com novidades</p>
                  </div>
                  <Switch
                    id="newsletter-email"
                    checked={emailSettings.enableNewsletterEmail}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableNewsletterEmail: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modelos de Email</CardTitle>
              <CardDescription>Personalize os modelos de email enviados pela plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-template">Selecione um modelo</Label>
                <Select defaultValue="welcome">
                  <SelectTrigger id="email-template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Boas-vindas</SelectItem>
                    <SelectItem value="course_completion">Conclusão de Curso</SelectItem>
                    <SelectItem value="certificate">Certificado</SelectItem>
                    <SelectItem value="password_reset">Redefinição de Senha</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-subject">Assunto</Label>
                <Input id="email-subject" defaultValue="Bem-vindo à FUNDEC EAD!" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-content">Conteúdo</Label>
                <Textarea
                  id="email-content"
                  className="min-h-[200px]"
                  defaultValue="Olá {{nome}},

Seja bem-vindo à plataforma FUNDEC EAD!

Estamos muito felizes em tê-lo como parte da nossa comunidade de aprendizado. Aqui você terá acesso a cursos de qualidade que irão impulsionar sua carreira.

Para começar, acesse seu painel em: {{link_painel}}

Atenciosamente,
Equipe FUNDEC EAD"
                />
              </div>

              <div className="space-y-2">
                <Label>Variáveis Disponíveis</Label>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{nome}}"}</code> - Nome do usuário
                  </p>
                  <p>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{email}}"}</code> - Email do usuário
                  </p>
                  <p>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{link_painel}}"}</code> - Link para o painel
                  </p>
                  <p>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{curso}}"}</code> - Nome do curso
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Modelo</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integracao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure integrações com serviços externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Pagamentos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=40&width=40" alt="Stripe" className="h-8 w-8" />
                        <h4 className="font-medium">Stripe</h4>
                      </div>
                      <Switch id="stripe-enabled" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-key">Chave API</Label>
                      <Input id="stripe-key" placeholder="sk_test_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripe-public-key">Chave Pública</Label>
                      <Input id="stripe-public-key" placeholder="pk_test_..." />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=40&width=40" alt="PayPal" className="h-8 w-8" />
                        <h4 className="font-medium">PayPal</h4>
                      </div>
                      <Switch id="paypal-enabled" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">Client ID</Label>
                      <Input id="paypal-client-id" placeholder="client_id_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">Secret</Label>
                      <Input id="paypal-secret" placeholder="secret_..." />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=40&width=40" alt="Google" className="h-8 w-8" />
                        <h4 className="font-medium">Google</h4>
                      </div>
                      <Switch id="google-enabled" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="google-client-id">Client ID</Label>
                      <Input id="google-client-id" placeholder="client_id_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="google-secret">Client Secret</Label>
                      <Input id="google-secret" placeholder="secret_..." />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=40&width=40" alt="Facebook" className="h-8 w-8" />
                        <h4 className="font-medium">Facebook</h4>
                      </div>
                      <Switch id="facebook-enabled" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook-app-id">App ID</Label>
                      <Input id="facebook-app-id" placeholder="app_id_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook-secret">App Secret</Label>
                      <Input id="facebook-secret" placeholder="secret_..." />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Armazenamento</h3>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=40&width=40" alt="AWS S3" className="h-8 w-8" />
                      <h4 className="font-medium">Amazon S3</h4>
                    </div>
                    <Switch id="s3-enabled" defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="s3-access-key">Access Key</Label>
                      <Input id="s3-access-key" placeholder="AKIA..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s3-secret-key">Secret Key</Label>
                      <Input id="s3-secret-key" placeholder="secret_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s3-bucket">Bucket</Label>
                      <Input id="s3-bucket" placeholder="fundec-ead-files" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s3-region">Região</Label>
                      <Input id="s3-region" placeholder="us-east-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Integrações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Configure as políticas de segurança da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Política de Senhas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-complexity">Exigir Senhas Complexas</Label>
                      <p className="text-sm text-gray-500">
                        Senhas devem conter letras maiúsculas, minúsculas, números e símbolos
                      </p>
                    </div>
                    <Switch id="password-complexity" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-length">Tamanho Mínimo da Senha</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="password-length">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 caracteres</SelectItem>
                        <SelectItem value="8">8 caracteres</SelectItem>
                        <SelectItem value="10">10 caracteres</SelectItem>
                        <SelectItem value="12">12 caracteres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-expiration">Expiração de Senha</Label>
                    <Select defaultValue="never">
                      <SelectTrigger id="password-expiration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Nunca</SelectItem>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Autenticação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-500">Permitir que usuários ativem 2FA em suas contas</p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="social-login">Login com Redes Sociais</Label>
                      <p className="text-sm text-gray-500">Permitir login com Google, Facebook, etc.</p>
                    </div>
                    <Switch id="social-login" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tempo de Sessão</Label>
                    <Select defaultValue="24">
                      <SelectTrigger id="session-timeout">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hora</SelectItem>
                        <SelectItem value="8">8 horas</SelectItem>
                        <SelectItem value="24">24 horas</SelectItem>
                        <SelectItem value="168">7 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Proteção contra Ataques</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="rate-limiting">Limitação de Taxa</Label>
                      <p className="text-sm text-gray-500">Limitar número de requisições por IP</p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="captcha">CAPT\
