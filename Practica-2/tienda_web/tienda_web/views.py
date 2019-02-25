from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {'user':'Patricia'})

def mi_funcion(request):
    html = "Hola! Esto es una prueba"

    return HttpResponse(html)


def mi_producto(request, param):
    numero = int(param)
    html = "Acceso a producto: %i" % numero;
    return HttpResponse(html)

"""De momento a pelo luego iria en el html"""
PLANTILLA = """
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <p>Bienvenido a mi tienda,{{user}} </p>

  </body>
</html>

"""
def saludo(request):
    t = Template(PLANTILLA)
    c = Context({'user':'Epic Saxo guy'})

    """Plantilla t mas variables en c"""
    html = t.render(c)
    return HttpResponse(html)

def leer_html(request):
    """Diapo 23"""
    fp = open('tienda_web/index.html')
    t = Template(fp.read())
    fp.close()

    c = Context({'user':'Epic Saxo guy'})
    html = t.render(c)
    return HttpResponse(html)
