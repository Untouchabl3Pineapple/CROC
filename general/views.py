from django.http.response import Http404
from django.shortcuts import render
from django.http import HttpResponse
import requests
import operator
import bs4
from .models import *
from rest_framework import viewsets
# from rest_framework import api_view
from rest_framework.decorators import api_view
from rest_framework.response import Response

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


@api_view(["DELETE"])
def product_delete_rest_endpoint(request, product_id):
    Eventstypes.objects.get(id=product_id).delete()    
    return render(request, "general/types.html")



def general(request):
    return render(request, "general/monitoring.html")


def emulator(request):
    return render(request, "general/emulator.html")


def analytics(request):
    return render(request, "general/analytics.html")


def buttons(request):
    return render(request, "general/buttons.html")


def edit(request, project_id='None'):
    return render(request, "general/edit.html")

def types(request):
    return render(request, "general/types.html")




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

