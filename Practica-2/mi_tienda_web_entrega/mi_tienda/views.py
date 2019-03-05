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

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'
    return HttpResponse(html)
