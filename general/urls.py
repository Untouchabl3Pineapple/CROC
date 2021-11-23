"""croc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from django.conf.urls import url 
from . import views

router = routers.DefaultRouter()
router.register(r'ButtonsEvents', views.ButtonsEventsViewSet)
router.register(r'ButtonsPosts', views.ButtonsPostsViewSet)
router.register(r'Events', views.EventsViewSet)
router.register(r'EventsTypes', views.EventsTypesViewSet)
router.register(r'Users', views.UsersViewSet)

urlpatterns = [
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("", include(router.urls)),
    path("monitoring/", views.general, name="home"),
    path("emulator/", views.emulator, name="emulator"),
    path("monitoring/edit/<project_id>/", views.edit, name="edit"),
    path("types/", views.types, name="types"),
    path("buttons/", views.buttons, name="buttons"),
    path("del_type/<uuid:product_id>/", views.product_delete_rest_endpoint, name="del"),
]