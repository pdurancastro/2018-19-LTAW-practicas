from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^index/',views.home_view),
    url(r'^trailer/', views.trailer),
    url(r'^accounts/', views.accounts),
    url(r'^patches/', views.patches),
    url(r'^contact/', views.contact),
    url(r'^action_search/', views.search),
]
