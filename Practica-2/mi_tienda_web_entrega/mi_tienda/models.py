# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Product (models.Model):
    name = models.CharField(max_length=200)
    character = models.CharField(max_length=200, default = "")
    stock = models.IntegerField()
    price = models.FloatField()

#Modelo persona
class Pedido (models.Model):
    name_user = models.CharField(max_length=200)
    Tlf = models.IntegerField()
    cost = models.FloatField()
    order = models.IntegerField()
