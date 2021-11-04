from rest_framework import serializers as core_serializers
from .models import *


class ButtonsEventsSerializer(core_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Buttonsevents
        fields = ("id", "buttoncolor", "number")


class UsersSerializer(core_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ("login", "name", "surname", "middlename", "accesslist")


class EventsSerializer(core_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Events
        fields = ("id", "buttonevent", "eventtype", "eventdescription",
                  "detectingtime", "fixingtime", "timeupdate", "user_login")


class ButtonsPostsSerializer(core_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Buttonsposts
        fields = ("post", "leftside", "rightside", "leftcolor", "rightcolor")


class EventsTypesSerializer(core_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Eventstypes
        fields = ("id", "eventtype")