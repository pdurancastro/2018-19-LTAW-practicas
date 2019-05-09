# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    #Quiero que me muestre la pagina en funcion de lo que pido
    return render(request, "index.html", {})

def trailer (request):
    return render(request, "trailer.html", {})

def accounts (request):
    return render(request, "accounts.html", {})

def patches (request):
    return render(request, "patches.html",{})

def contact (request):
    return render(request, "contact.html",{})

#Llamas a la funcion desde urls

def search (request):

    #Quiero que me muestre la pagina en funcion de lo que pido
    Peticion = request.GET.get('Caja_Busqueda',None)
    Cuentas = Product.objects.all()
    Lista_de_cuentas = []

    for producto in Cuentas:
        #producto_database = producto.name
        if Peticion == producto.name:
            #print("Estos son los productos")
            Lista_de_cuentas.append(producto)
            print(Lista_de_cuentas)
            print(producto.character)
    #print(Peticion de productos)

    return render(request, 'list.html',{'item_list':Lista_de_cuentas})

def search2 (request):

    #Quiero que me muestre la pagina en funcion de lo que pido
    Peticion = request.GET.get('Caja_Busqueda',None)
    Cuentas = Product.objects.all()
    Lista_de_cuentas = []

    for producto in Cuentas:
        #producto_database = producto.name
        if Peticion == producto.character:
            #print("Estos son los productos")
            Lista_de_cuentas.append(producto)
            print(Lista_de_cuentas)
            print(producto.character)
    #print(Peticion de productos)

    return render(request, 'list.html',{'item_list':Lista_de_cuentas})

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
