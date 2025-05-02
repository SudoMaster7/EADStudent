from rest_framework import serializers
from .models import (
    Usuario, Categoria, Curso, Modulo, Aula, Material, Matricula, 
    ProgressoAula, Pergunta, Alternativa, Resposta, Atividade, 
    Certificado, TopicoForum, RespostaForum, Conquista, ConquistaUsuario,
    Notificacao
)
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 
                  'password_confirm', 'tipo', 'status', 'cpf', 'data_nascimento', 
                  'telefone', 'foto_perfil', 'bio', 'formacao', 'area_especializacao')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }
    
    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({"password": "As senhas não conferem."})
        
        try:
            validate_password(attrs.get('password'))
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            tipo=validated_data.get('tipo', 'aluno'),
            status=validated_data.get('status', 'pendente'),
            cpf=validated_data.get('cpf', None),
            data_nascimento=validated_data.get('data_nascimento', None),
            telefone=validated_data.get('telefone', None),
            foto_perfil=validated_data.get('foto_perfil', None),
            bio=validated_data.get('bio', None),
            formacao=validated_data.get('formacao', None),
            area_especializacao=validated_data.get('area_especializacao', None),
        )
        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            validated_data.pop('password_confirm', None)
            instance.set_password(password)
        
        return super().update(instance, validated_data)

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class AlternativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternativa
        fields = ('id', 'texto', 'correta')

class PerguntaSerializer(serializers.ModelSerializer):
    alternativas = AlternativaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Pergunta
        fields = ('id', 'texto', 'tipo', 'pontos', 'alternativas')

class AulaSerializer(serializers.ModelSerializer):
    perguntas = PerguntaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Aula
        fields = ('id', 'titulo', 'descricao', 'tipo', 'conteudo', 'video_url', 
                  'duracao_minutos', 'ordem', 'perguntas')

class ModuloSerializer(serializers.ModelSerializer):
    aulas = AulaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Modulo
        fields = ('id', 'titulo', 'descricao', 'ordem', 'aulas')

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ('id', 'titulo', 'descricao', 'arquivo', 'url')

class CursoListSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    professor_nome = serializers.ReadOnlyField(source='professor.get_full_name')
    total_alunos = serializers.SerializerMethodField()
    
    class Meta:
        model = Curso
        fields = ('id', 'titulo', 'slug', 'descricao', 'imagem_capa', 'categoria', 
                  'categoria_nome', 'nivel', 'duracao_semanas', 'status', 
                  'professor', 'professor_nome', 'data_criacao', 'total_alunos')
    
    def get_total_alunos(self, obj):
        return obj.matriculas.count()

class CursoDetailSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    professor_nome = serializers.ReadOnlyField(source='professor.get_full_name')
    modulos = ModuloSerializer(many=True, read_only=True)
    materiais = MaterialSerializer(many=True, read_only=True)
    total_alunos = serializers.SerializerMethodField()
    
    class Meta:
        model = Curso
        fields = ('id', 'titulo', 'slug', 'descricao', 'objetivos', 'pre_requisitos', 
                  'imagem_capa', 'categoria', 'categoria_nome', 'nivel', 'duracao_semanas', 
                  'status', 'professor', 'professor_nome', 'data_criacao', 'data_atualizacao', 
                  'visivel', 'matriculas_abertas', 'forum_habilitado', 'certificado_habilitado', 
                  'tipo_certificado', 'criterio_conclusao', 'modulos', 'materiais', 'total_alunos')
    
    def get_total_alunos(self, obj):
        return obj.matriculas.count()

class ProgressoAulaSerializer(serializers.ModelSerializer):
    aula_titulo = serializers.ReadOnlyField(source='aula.titulo')
    aula_tipo = serializers.ReadOnlyField(source='aula.tipo')
    
    class Meta:
        model = ProgressoAula
        fields = ('id', 'aula', 'aula_titulo', 'aula_tipo', 'status', 
                  'data_inicio', 'data_conclusao', 'nota')

class MatriculaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.ReadOnlyField(source='aluno.get_full_name')
    curso_titulo = serializers.ReadOnlyField(source='curso.titulo')
    progressos = ProgressoAulaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Matricula
        fields = ('id', 'aluno', 'aluno_nome', 'curso', 'curso_titulo', 
                  'data_matricula', 'data_conclusao', 'status', 'progresso', 
                  'nota_final', 'progressos')

class RespostaSerializer(serializers.ModelSerializer):
    pergunta_texto = serializers.ReadOnlyField(source='pergunta.texto')
    
    class Meta:
        model = Resposta
        fields = ('id', 'pergunta', 'pergunta_texto', 'alternativa_selecionada', 
                  'texto_resposta', 'correta')

class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ('id', 'descricao', 'arquivo', 'comentario', 'status', 
                  'nota', 'data_envio', 'data_avaliacao')

class CertificadoSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.ReadOnlyField(source='matricula.aluno.get_full_name')
    curso_titulo = serializers.ReadOnlyField(source='matricula.curso.titulo')
    
    class Meta:
        model = Certificado
        fields = ('id', 'matricula', 'aluno_nome', 'curso_titulo', 'codigo', 
                  'data_emissao', 'arquivo')

class RespostaForumSerializer(serializers.ModelSerializer):
    autor_nome = serializers.ReadOnlyField(source='autor.get_full_name')
    
    class Meta:
        model = RespostaForum
        fields = ('id', 'autor', 'autor_nome', 'conteudo', 'data_criacao', 'data_atualizacao')

class TopicoForumSerializer(serializers.ModelSerializer):
    autor_nome = serializers.ReadOnlyField(source='autor.get_full_name')
    respostas = RespostaForumSerializer(many=True, read_only=True)
    total_respostas = serializers.SerializerMethodField()
    
    class Meta:
        model = TopicoForum
        fields = ('id', 'curso', 'autor', 'autor_nome', 'titulo', 'conteudo', 
                  'data_criacao', 'data_atualizacao', 'respostas', 'total_respostas')
    
    def get_total_respostas(self, obj):
        return obj.respostas.count()

class ConquistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conquista
        fields = ('id', 'nome', 'descricao', 'icone', 'pontos')

class ConquistaUsuarioSerializer(serializers.ModelSerializer):
    conquista_nome = serializers.ReadOnlyField(source='conquista.nome')
    conquista_descricao = serializers.ReadOnlyField(source='conquista.descricao')
    conquista_icone = serializers.ReadOnlyField(source='conquista.icone')
    conquista_pontos = serializers.ReadOnlyField(source='conquista.pontos')
    
    class Meta:
        model = ConquistaUsuario
        fields = ('id', 'usuario', 'conquista', 'conquista_nome', 'conquista_descricao', 
                  'conquista_icone', 'conquista_pontos', 'data_obtencao')

class NotificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacao
        fields = ('id', 'usuario', 'tipo', 'titulo', 'mensagem', 'lida', 'data_criacao', 'link')
