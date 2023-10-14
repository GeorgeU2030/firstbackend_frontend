from rest_framework import viewsets,status
from .serializer import TaskSerializer
from .models import Task
from django.db.models import Max
from django.db.models.functions import Length
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

@api_view(['GET'])
def tarea_con_descripcion_mas_larga(request):
    # Calculamos la longitud de la descripción para cada tarea
    tasks = Task.objects.annotate(description_length=Length('description'))

    # Encontramos la longitud máxima
    max_length = tasks.aggregate(max_length=Max('description_length'))['max_length']

    # Filtramos las tareas que tienen la longitud máxima
    tareas_con_descripcion_mas_larga = tasks.filter(description_length=max_length)

    # Asumiendo que solo queremos una tarea, tomamos la primera (si hay más de una con la misma longitud)
    if tareas_con_descripcion_mas_larga.exists():
        tarea_mas_larga = tareas_con_descripcion_mas_larga.first()
        serializer = TaskSerializer(tarea_mas_larga)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "No se encontraron tareas con descripciones."},
                        status=status.HTTP_404_NOT_FOUND)
