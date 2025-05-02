from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class Usuario(AbstractUser):
    """
    Modelo de usuário personalizado que estende o modelo de usuário padrão do Django.
    """
    TIPO_CHOICES = (
        ('aluno', 'Aluno'),
        ('professor', 'Professor'),
        ('admin', 'Administrador'),
    )
    
    STATUS_CHOICES = (
        ('ativo', 'Ativo'),
        ('inativo', 'Inativo'),
        ('pendente', 'Pendente'),
    )
    
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='aluno')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)
    data_nascimento = models.DateField(null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='perfil/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    
    # Campos específicos para professores
    formacao = models.CharField(max_length=255, null=True, blank=True)
    area_especializacao = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        verbose_name = _('usuário')
        verbose_name_plural = _('usuários')

class Categoria(models.Model):
    """
    Modelo para categorias de cursos.
    """
    nome = models.CharField(max_length=100)
    descricao = models.TextField(null=True, blank=True)
    icone = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = _('categoria')
        verbose_name_plural = _('categorias')

class Curso(models.Model):
    """
    Modelo para cursos.
    """
    NIVEL_CHOICES = (
        ('basico', 'Básico'),
        ('intermediario', 'Intermediário'),
        ('avancado', 'Avançado'),
        ('tecnico', 'Técnico'),
    )
    
    STATUS_CHOICES = (
        ('rascunho', 'Rascunho'),
        ('revisao', 'Em Revisão'),
        ('publicado', 'Publicado'),
        ('arquivado', 'Arquivado'),
    )
    
    CERTIFICADO_CHOICES = (
        ('curso_livre', 'Curso Livre'),
        ('tecnico', 'Técnico'),
        ('profissionalizante', 'Profissionalizante'),
        ('extensao', 'Extensão'),
    )
    
    titulo = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    descricao = models.TextField()
    objetivos = models.TextField(null=True, blank=True)
    pre_requisitos = models.TextField(null=True, blank=True)
    imagem_capa = models.ImageField(upload_to='cursos/', null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='cursos')
    nivel = models.CharField(max_length=15, choices=NIVEL_CHOICES, default='basico')
    duracao_semanas = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='rascunho')
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='cursos_ministrados')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    # Configurações do curso
    visivel = models.BooleanField(default=True)
    matriculas_abertas = models.BooleanField(default=True)
    forum_habilitado = models.BooleanField(default=True)
    
    # Certificação
    certificado_habilitado = models.BooleanField(default=True)
    tipo_certificado = models.CharField(max_length=20, choices=CERTIFICADO_CHOICES, default='curso_livre')
    criterio_conclusao = models.PositiveIntegerField(default=100, help_text='Porcentagem necessária para conclusão')
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = _('curso')
        verbose_name_plural = _('cursos')

class Modulo(models.Model):
    """
    Modelo para módulos de um curso.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='modulos')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    ordem = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('módulo')
        verbose_name_plural = _('módulos')
        ordering = ['ordem']

class Aula(models.Model):
    """
    Modelo para aulas de um módulo.
    """
    TIPO_CHOICES = (
        ('video', 'Vídeo'),
        ('texto', 'Texto'),
        ('quiz', 'Quiz'),
        ('assignment', 'Atividade'),
    )
    
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE, related_name='aulas')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='video')
    conteudo = models.TextField(null=True, blank=True)
    video_url = models.URLField(null=True, blank=True)
    duracao_minutos = models.PositiveIntegerField(default=0)
    ordem = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.modulo.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('aula')
        verbose_name_plural = _('aulas')
        ordering = ['ordem']

class Material(models.Model):
    """
    Modelo para materiais complementares de um curso.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='materiais')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    arquivo = models.FileField(upload_to='materiais/', null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('material')
        verbose_name_plural = _('materiais')

class Matricula(models.Model):
    """
    Modelo para matrículas de alunos em cursos.
    """
    STATUS_CHOICES = (
        ('ativa', 'Ativa'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    )
    
    aluno = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='matriculas')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='matriculas')
    data_matricula = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ativa')
    progresso = models.PositiveIntegerField(default=0, help_text='Porcentagem de conclusão')
    nota_final = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.aluno.username} - {self.curso.titulo}"
    
    class Meta:
        verbose_name = _('matrícula')
        verbose_name_plural = _('matrículas')
        unique_together = ['aluno', 'curso']

class ProgressoAula(models.Model):
    """
    Modelo para acompanhar o progresso do aluno em cada aula.
    """
    STATUS_CHOICES = (
        ('nao_iniciada', 'Não Iniciada'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
    )
    
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, related_name='progressos')
    aula = models.ForeignKey(Aula, on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='nao_iniciada')
    data_inicio = models.DateTimeField(null=True, blank=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)
    nota = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.matricula.aluno.username} - {self.aula.titulo}"
    
    class Meta:
        verbose_name = _('progresso de aula')
        verbose_name_plural = _('progressos de aulas')
        unique_together = ['matricula', 'aula']

class Pergunta(models.Model):
    """
    Modelo para perguntas de quizzes.
    """
    TIPO_CHOICES = (
        ('multipla_escolha', 'Múltipla Escolha'),
        ('verdadeiro_falso', 'Verdadeiro ou Falso'),
        ('resposta_curta', 'Resposta Curta'),
    )
    
    aula = models.ForeignKey(Aula, on_delete=models.CASCADE, related_name='perguntas')
    texto = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='multipla_escolha')
    pontos = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.aula.titulo} - Pergunta {self.id}"
    
    class Meta:
        verbose_name = _('pergunta')
        verbose_name_plural = _('perguntas')

class Alternativa(models.Model):
    """
    Modelo para alternativas de perguntas de múltipla escolha.
    """
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE, related_name='alternativas')
    texto = models.TextField()
    correta = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.pergunta.id} - Alternativa {self.id}"
    
    class Meta:
        verbose_name = _('alternativa')
        verbose_name_plural = _('alternativas')

class Resposta(models.Model):
    """
    Modelo para respostas dos alunos às perguntas.
    """
    progresso_aula = models.ForeignKey(ProgressoAula, on_delete=models.CASCADE, related_name='respostas')
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE)
    alternativa_selecionada = models.ForeignKey(Alternativa, on_delete=models.CASCADE, null=True, blank=True)
    texto_resposta = models.TextField(null=True, blank=True)
    correta = models.BooleanField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.progresso_aula.matricula.aluno.username} - Resposta {self.id}"
    
    class Meta:
        verbose_name = _('resposta')
        verbose_name_plural = _('respostas')
        unique_together = ['progresso_aula', 'pergunta']

class Atividade(models.Model):
    """
    Modelo para atividades práticas.
    """
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('enviada', 'Enviada'),
        ('avaliada', 'Avaliada'),
    )
    
    progresso_aula = models.ForeignKey(ProgressoAula, on_delete=models.CASCADE, related_name='atividades')
    descricao = models.TextField()
    arquivo = models.FileField(upload_to='atividades/envios/', null=True, blank=True)
    comentario = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    nota = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    data_envio = models.DateTimeField(null=True, blank=True)
    data_avaliacao = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.progresso_aula.matricula.aluno.username} - Atividade {self.id}"
    
    class Meta:
        verbose_name = _('atividade')
        verbose_name_plural = _('atividades')

class Certificado(models.Model):
    """
    Modelo para certificados emitidos.
    """
    matricula = models.OneToOneField(Matricula, on_delete=models.CASCADE, related_name='certificado')
    codigo = models.CharField(max_length=50, unique=True)
    data_emissao = models.DateTimeField(auto_now_add=True)
    arquivo = models.FileField(upload_to='certificados/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.matricula.aluno.username} - {self.matricula.curso.titulo}"
    
    class Meta:
        verbose_name = _('certificado')
        verbose_name_plural = _('certificados')

class TopicoForum(models.Model):
    """
    Modelo para tópicos do fórum de discussão.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='topicos')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='topicos')
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('tópico do fórum')
        verbose_name_plural = _('tópicos do fórum')

class RespostaForum(models.Model):
    """
    Modelo para respostas em tópicos do fórum.
    """
    topico = models.ForeignKey(TopicoForum, on_delete=models.CASCADE, related_name='respostas')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='respostas_forum')
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.topico.titulo} - Resposta {self.id}"
    
    class Meta:
        verbose_name = _('resposta do fórum')
        verbose_name_plural = _('respostas do fórum')

class Conquista(models.Model):
    """
    Modelo para conquistas e gamificação.
    """
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    icone = models.CharField(max_length=50)
    pontos = models.PositiveIntegerField(default=10)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = _('conquista')
        verbose_name_plural = _('conquistas')

class ConquistaUsuario(models.Model):
    """
    Modelo para registrar conquistas obtidas pelos usuários.
    """
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='conquistas')
    conquista = models.ForeignKey(Conquista, on_delete=models.CASCADE)
    data_obtencao = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.usuario.username} - {self.conquista.nome}"
    
    class Meta:
        verbose_name = _('conquista do usuário')
        verbose_name_plural = _('conquistas dos usuários')
        unique_together = ['usuario', 'conquista']

class Notificacao(models.Model):
    """
    Modelo para notificações do sistema.
    """
    TIPO_CHOICES = (
        ('sistema', 'Sistema'),
        ('curso', 'Curso'),
        ('atividade', 'Atividade'),
        ('forum', 'Fórum'),
    )
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='not

Parece que o código foi cortado. Vamos continuar com o restante do modelo de Notificação e adicionar os outros arquivos necessários:

```py project="Backend Django" file="models.py" type="python"
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class Usuario(AbstractUser):
    """
    Modelo de usuário personalizado que estende o modelo de usuário padrão do Django.
    """
    TIPO_CHOICES = (
        ('aluno', 'Aluno'),
        ('professor', 'Professor'),
        ('admin', 'Administrador'),
    )
    
    STATUS_CHOICES = (
        ('ativo', 'Ativo'),
        ('inativo', 'Inativo'),
        ('pendente', 'Pendente'),
    )
    
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='aluno')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)
    data_nascimento = models.DateField(null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='perfil/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    
    # Campos específicos para professores
    formacao = models.CharField(max_length=255, null=True, blank=True)
    area_especializacao = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        verbose_name = _('usuário')
        verbose_name_plural = _('usuários')

class Categoria(models.Model):
    """
    Modelo para categorias de cursos.
    """
    nome = models.CharField(max_length=100)
    descricao = models.TextField(null=True, blank=True)
    icone = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = _('categoria')
        verbose_name_plural = _('categorias')

class Curso(models.Model):
    """
    Modelo para cursos.
    """
    NIVEL_CHOICES = (
        ('basico', 'Básico'),
        ('intermediario', 'Intermediário'),
        ('avancado', 'Avançado'),
        ('tecnico', 'Técnico'),
    )
    
    STATUS_CHOICES = (
        ('rascunho', 'Rascunho'),
        ('revisao', 'Em Revisão'),
        ('publicado', 'Publicado'),
        ('arquivado', 'Arquivado'),
    )
    
    CERTIFICADO_CHOICES = (
        ('curso_livre', 'Curso Livre'),
        ('tecnico', 'Técnico'),
        ('profissionalizante', 'Profissionalizante'),
        ('extensao', 'Extensão'),
    )
    
    titulo = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    descricao = models.TextField()
    objetivos = models.TextField(null=True, blank=True)
    pre_requisitos = models.TextField(null=True, blank=True)
    imagem_capa = models.ImageField(upload_to='cursos/', null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='cursos')
    nivel = models.CharField(max_length=15, choices=NIVEL_CHOICES, default='basico')
    duracao_semanas = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='rascunho')
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='cursos_ministrados')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    # Configurações do curso
    visivel = models.BooleanField(default=True)
    matriculas_abertas = models.BooleanField(default=True)
    forum_habilitado = models.BooleanField(default=True)
    
    # Certificação
    certificado_habilitado = models.BooleanField(default=True)
    tipo_certificado = models.CharField(max_length=20, choices=CERTIFICADO_CHOICES, default='curso_livre')
    criterio_conclusao = models.PositiveIntegerField(default=100, help_text='Porcentagem necessária para conclusão')
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = _('curso')
        verbose_name_plural = _('cursos')

class Modulo(models.Model):
    """
    Modelo para módulos de um curso.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='modulos')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    ordem = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('módulo')
        verbose_name_plural = _('módulos')
        ordering = ['ordem']

class Aula(models.Model):
    """
    Modelo para aulas de um módulo.
    """
    TIPO_CHOICES = (
        ('video', 'Vídeo'),
        ('texto', 'Texto'),
        ('quiz', 'Quiz'),
        ('assignment', 'Atividade'),
    )
    
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE, related_name='aulas')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='video')
    conteudo = models.TextField(null=True, blank=True)
    video_url = models.URLField(null=True, blank=True)
    duracao_minutos = models.PositiveIntegerField(default=0)
    ordem = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.modulo.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('aula')
        verbose_name_plural = _('aulas')
        ordering = ['ordem']

class Material(models.Model):
    """
    Modelo para materiais complementares de um curso.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='materiais')
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    arquivo = models.FileField(upload_to='materiais/', null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('material')
        verbose_name_plural = _('materiais')

class Matricula(models.Model):
    """
    Modelo para matrículas de alunos em cursos.
    """
    STATUS_CHOICES = (
        ('ativa', 'Ativa'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    )
    
    aluno = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='matriculas')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='matriculas')
    data_matricula = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ativa')
    progresso = models.PositiveIntegerField(default=0, help_text='Porcentagem de conclusão')
    nota_final = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.aluno.username} - {self.curso.titulo}"
    
    class Meta:
        verbose_name = _('matrícula')
        verbose_name_plural = _('matrículas')
        unique_together = ['aluno', 'curso']

class ProgressoAula(models.Model):
    """
    Modelo para acompanhar o progresso do aluno em cada aula.
    """
    STATUS_CHOICES = (
        ('nao_iniciada', 'Não Iniciada'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
    )
    
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, related_name='progressos')
    aula = models.ForeignKey(Aula, on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='nao_iniciada')
    data_inicio = models.DateTimeField(null=True, blank=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)
    nota = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.matricula.aluno.username} - {self.aula.titulo}"
    
    class Meta:
        verbose_name = _('progresso de aula')
        verbose_name_plural = _('progressos de aulas')
        unique_together = ['matricula', 'aula']

class Pergunta(models.Model):
    """
    Modelo para perguntas de quizzes.
    """
    TIPO_CHOICES = (
        ('multipla_escolha', 'Múltipla Escolha'),
        ('verdadeiro_falso', 'Verdadeiro ou Falso'),
        ('resposta_curta', 'Resposta Curta'),
    )
    
    aula = models.ForeignKey(Aula, on_delete=models.CASCADE, related_name='perguntas')
    texto = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='multipla_escolha')
    pontos = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.aula.titulo} - Pergunta {self.id}"
    
    class Meta:
        verbose_name = _('pergunta')
        verbose_name_plural = _('perguntas')

class Alternativa(models.Model):
    """
    Modelo para alternativas de perguntas de múltipla escolha.
    """
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE, related_name='alternativas')
    texto = models.TextField()
    correta = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.pergunta.id} - Alternativa {self.id}"
    
    class Meta:
        verbose_name = _('alternativa')
        verbose_name_plural = _('alternativas')

class Resposta(models.Model):
    """
    Modelo para respostas dos alunos às perguntas.
    """
    progresso_aula = models.ForeignKey(ProgressoAula, on_delete=models.CASCADE, related_name='respostas')
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE)
    alternativa_selecionada = models.ForeignKey(Alternativa, on_delete=models.CASCADE, null=True, blank=True)
    texto_resposta = models.TextField(null=True, blank=True)
    correta = models.BooleanField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.progresso_aula.matricula.aluno.username} - Resposta {self.id}"
    
    class Meta:
        verbose_name = _('resposta')
        verbose_name_plural = _('respostas')
        unique_together = ['progresso_aula', 'pergunta']

class Atividade(models.Model):
    """
    Modelo para atividades práticas.
    """
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('enviada', 'Enviada'),
        ('avaliada', 'Avaliada'),
    )
    
    progresso_aula = models.ForeignKey(ProgressoAula, on_delete=models.CASCADE, related_name='atividades')
    descricao = models.TextField()
    arquivo = models.FileField(upload_to='atividades/envios/', null=True, blank=True)
    comentario = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    nota = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    data_envio = models.DateTimeField(null=True, blank=True)
    data_avaliacao = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.progresso_aula.matricula.aluno.username} - Atividade {self.id}"
    
    class Meta:
        verbose_name = _('atividade')
        verbose_name_plural = _('atividades')

class Certificado(models.Model):
    """
    Modelo para certificados emitidos.
    """
    matricula = models.OneToOneField(Matricula, on_delete=models.CASCADE, related_name='certificado')
    codigo = models.CharField(max_length=50, unique=True)
    data_emissao = models.DateTimeField(auto_now_add=True)
    arquivo = models.FileField(upload_to='certificados/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.matricula.aluno.username} - {self.matricula.curso.titulo}"
    
    class Meta:
        verbose_name = _('certificado')
        verbose_name_plural = _('certificados')

class TopicoForum(models.Model):
    """
    Modelo para tópicos do fórum de discussão.
    """
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='topicos')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='topicos')
    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.curso.titulo} - {self.titulo}"
    
    class Meta:
        verbose_name = _('tópico do fórum')
        verbose_name_plural = _('tópicos do fórum')

class RespostaForum(models.Model):
    """
    Modelo para respostas em tópicos do fórum.
    """
    topico = models.ForeignKey(TopicoForum, on_delete=models.CASCADE, related_name='respostas')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='respostas_forum')
    conteudo = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.topico.titulo} - Resposta {self.id}"
    
    class Meta:
        verbose_name = _('resposta do fórum')
        verbose_name_plural = _('respostas do fórum')

class Conquista(models.Model):
    """
    Modelo para conquistas e gamificação.
    """
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    icone = models.CharField(max_length=50)
    pontos = models.PositiveIntegerField(default=10)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = _('conquista')
        verbose_name_plural = _('conquistas')

class ConquistaUsuario(models.Model):
    """
    Modelo para registrar conquistas obtidas pelos usuários.
    """
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='conquistas')
    conquista = models.ForeignKey(Conquista, on_delete=models.CASCADE)
    data_obtencao = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.usuario.username} - {self.conquista.nome}"
    
    class Meta:
        verbose_name = _('conquista do usuário')
        verbose_name_plural = _('conquistas dos usuários')
        unique_together = ['usuario', 'conquista']

class Notificacao(models.Model):
    """
    Modelo para notificações do sistema.
    """
    TIPO_CHOICES = (
        ('sistema', 'Sistema'),
        ('curso', 'Curso'),
        ('atividade', 'Atividade'),
        ('forum', 'Fórum'),
    )
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificacoes')
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='sistema')
    titulo = models.CharField(max_length=255)
    mensagem = models.TextField()
    lida = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)
    link = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self):
        return f"{self.usuario.username} - {self.titulo}"
    
    class Meta:
        verbose_name = _('notificação')
        verbose_name_plural = _('notificações')
        ordering = ['-data_criacao']
