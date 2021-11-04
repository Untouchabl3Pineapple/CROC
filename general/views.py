from django.shortcuts import render
from django.http import HttpResponse
import requests
import operator
import bs4
from .models import *
from rest_framework import viewsets
from .serializers import (
    ButtonsEventsSerializer,
    ButtonsPostsSerializer,
    EventsSerializer,
    EventsTypesSerializer,
    UsersSerializer,
)


def general(request):
    return render(request, "general/monitoring.html")


def emulator(request):
    return render(request, "general/emulator.html")


def edit(request):
    return render(request, "general/edit.html")


class ButtonsEventsViewSet(viewsets.ModelViewSet):
    queryset = Buttonsevents.objects.all()
    serializer_class = ButtonsEventsSerializer


class ButtonsPostsViewSet(viewsets.ModelViewSet):
    queryset = Buttonsposts.objects.all()
    serializer_class = ButtonsPostsSerializer


class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer


class EventsTypesViewSet(viewsets.ModelViewSet):
    queryset = Eventstypes.objects.all()
    serializer_class = EventsTypesSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer