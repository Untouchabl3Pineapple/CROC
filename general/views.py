from django.shortcuts import render
from django.http import HttpResponse
import requests
import operator
import bs4
from .models import *
from rest_framework import viewsets
# from rest_framework import api_view
from rest_framework.decorators import api_view
# from rest_framework.parsers import JSONParser

from .serializers import (
    ButtonsEventsSerializer,
    ButtonsPostsSerializer,
    EventsSerializer,
    EventsTypesSerializer,
    UsersSerializer,
)

@api_view(['GET', 'PUT', 'DELETE'])
def put_by_key(request, pk):
    pass


def general(request):
    return render(request, "general/monitoring.html")


def emulator(request):
    return render(request, "general/emulator.html")


def edit(request, project_id='None'):
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

