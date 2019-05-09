from django import forms
from .models import Pedido

class formPedido(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['name_user','Tlf','cost','order']
        labels = {
            'name_user': 'Name User',
            'Tlf': 'Phone',
            'cost': 'Cost',
            'order': 'Order'
        }
        widgets = {
            'name_user':forms.TextInput(),
            'Tlf':forms.TextInput(),
            'cost':forms.TextInput(),
            'order':forms.TextInput(),
        }
