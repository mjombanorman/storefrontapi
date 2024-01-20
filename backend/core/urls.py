from django.views.generic import TemplateView
from django.urls import path
# from rest_framework_swagger.views import get_swagger_view

# schema_view = get_swagger_view(title='Pastebin API')




# URLConf
urlpatterns = [
    path('', TemplateView.as_view(template_name='core/index.html')),
    # path('swagger', schema_view, name='swagger-ui'),
]