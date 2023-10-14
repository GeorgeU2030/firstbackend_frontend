from django.urls import path, include
from rest_framework import routers
from tasks import views

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'tasks')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('tarea-con-descripcion-mas-larga/', views.tarea_con_descripcion_mas_larga, name='tarea-con-descripcion-mas-larga'),
]
