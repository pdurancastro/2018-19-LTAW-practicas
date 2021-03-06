"""mi_tienda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

"""Puedo importar mi tienda directamente """
from django.conf.urls import include, url
from django.contrib import admin
from tienda_web.views import mi_funcion
from tienda_web.views import mi_producto
from tienda_web.views import saludo
from tienda_web.views import leer_html
from tienda_web.views import index




"""Definir las URLS de la tienda """
""" r'^admin/ r--> Expresion regular, admin/ --> debe estar al comienzo  """
urlpatterns = [
    url(r'^', index),
    url(r'^producto/(\d{1,2})/', mi_producto),
    url(r'^hola/', mi_funcion),
    url(r'^saludo/', saludo),
    url(r'^leer_html/', leer_html),
    url(r'^index/', index),
    url(r'^test/', include(admin.site.urls)),
]
