from django.http import HttpResponse
from django.template import Template, Context


def index(request):
    fp = open('/home/alumnos/pcastro/github/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/templates/main.html')
    t = Template(fp.read())
    fp.close()
    c = Context({'user': 'Obijuan'})
    html = t.render(c)
    return HttpResponse(html)

#-- Resto del fichero....



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
