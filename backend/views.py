from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q, Count, Avg
from django.contrib.auth import get_user_model

from .models import (
    Usuario, Categoria, Curso, Modulo, Aula, Material, Matricula, 
    ProgressoAula, Pergunta, Alternativa, Resposta, Atividade, 
    Certificado, TopicoForum, RespostaForum, Conquista, ConquistaUsuario,
    Notificacao
)
from .serializers import (
    UsuarioSerializer, CategoriaSerializer, CursoListSerializer, 
    CursoDetailSerializer, ModuloSerializer, AulaSerializer, 
    MaterialSerializer, MatriculaSerializer, ProgressoAulaSerializer,
    PerguntaSerializer, AlternativaSerializer, RespostaSerializer, 
    AtividadeSerializer, CertificadoSerializer, TopicoForumSerializer, 
    RespostaForumSerializer, ConquistaSerializer, ConquistaUsuarioSerializer,
    NotificacaoSerializer
)

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada para permitir apenas administradores a editar.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

```py project="Backend Django" file="urls.py" type="python"
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'cursos', views.CursoViewSet)
router.register(r'modulos', views.ModuloViewSet)
router.register(r'aulas', views.AulaViewSet)
router.register(r'materiais', views.MaterialViewSet)
router.register(r'matriculas', views.MatriculaViewSet)
router.register(r'progressos', views.ProgressoAulaViewSet)
router.register(r'perguntas', views.PerguntaViewSet)
router.register(r'alternativas', views.AlternativaViewSet)
router.register(r'respostas', views.RespostaViewSet)
router.register(r'atividades', views.AtividadeViewSet)
router.register(r'certificados', views.CertificadoViewSet)
router.register(r'topicos', views.TopicoForumViewSet)
router.register(r'respostas-forum', views.RespostaForumViewSet)
router.register(r'conquistas', views.ConquistaViewSet)
router.register(r'conquistas-usuario', views.ConquistaUsuarioViewSet)
router.register(r'notificacoes', views.NotificacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    # Rotas personalizadas
    path('cursos/<int:curso_id>/matricular/', views.CursoViewSet.as_view({'post': 'matricular'})),
    path('cursos/<int:curso_id>/cancelar-matricula/', views.CursoViewSet.as_view({'post': 'cancelar_matricula'})),
    path('aulas/<int:aula_id>/marcar-concluida/', views.AulaViewSet.as_view({'post': 'marcar_concluida'})),
    path('certificados/validar/<str:codigo>/', views.CertificadoViewSet.as_view({'get': 'validar'})),
    path('usuarios/me/', views.UsuarioViewSet.as_view({'get': 'me'})),
    path('notificacoes/marcar-lida/<int:pk>/', views.NotificacaoViewSet.as_view({'post': 'marcar_lida'})),
    path('notificacoes/marcar-todas-lidas/', views.NotificacaoViewSet.as_view({'post': 'marcar_todas_lidas'})),
]
