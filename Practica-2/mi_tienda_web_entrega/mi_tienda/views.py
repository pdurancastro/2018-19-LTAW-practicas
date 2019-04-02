# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def trailer (request):
    return render(request, "trailer.html", {})

def accounts (request):
    return render(request, "accounts.html", {})

def patches (request):
    return render(request, "patches.html",{})

def contact (request):
    return render(request, "contact.html",{})

def search (request):
    #Quiero que me muestre la pagina en funcion de lo que pido
    return render(request, "search.html",{})

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    list_accounts = []

    for producto in objects:
        print(producto.name)
        #html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'
        list_accounts.append(producto)

    #return HttpResponse(html)
    return render(request,'list.html',{'item_list':list_accounts})
