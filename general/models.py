# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import uuid


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Buttonsevents(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    buttoncolor = models.SmallIntegerField()
    number = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'buttonsevents'

    def __str__(self):
        return "ButtonEvents"
    

class Buttonsposts(models.Model):
    post = models.SmallIntegerField(primary_key=True)
    leftside = models.SmallIntegerField()
    rightside = models.SmallIntegerField()
    leftcolor = models.SmallIntegerField()
    rightcolor = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'buttonsposts'

    def __str__(self):
        return "ButtonPosts"


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Events(models.Model):
    id = models.UUIDField(primary_key=True)
    buttonevent = models.ForeignKey(Buttonsevents, models.DO_NOTHING)
    eventtype = models.ForeignKey('Eventstypes', models.DO_NOTHING, blank=True, null=True)
    eventdescription = models.TextField(blank=True, null=True)
    detectingtime = models.DateTimeField()
    fixingtime = models.DateTimeField(blank=True, null=True)
    timeupdate = models.DateTimeField()
    user_login = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_login', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'events'

    def __str__(self):
        return "Events"


class Eventstypes(models.Model):
    id = models.UUIDField(primary_key=True)
    eventtype = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'eventstypes'

    def __str__(self):
        return "EventsTypes"

class GeneralButtonsevents(models.Model):
    button_type = models.SmallIntegerField()
    number = models.SmallIntegerField()
    time_stamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'general_buttonsevents'


class GeneralButtonsposts(models.Model):
    left_side = models.SmallIntegerField()
    right_side = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'general_buttonsposts'


class GeneralEventstypes(models.Model):
    event_type = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'general_eventstypes'


class Users(models.Model):
    login = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=127)
    surname = models.CharField(max_length=127)
    middlename = models.CharField(max_length=127, blank=True, null=True)
    accesslist = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'

    def __str__(self):
        return "Users"