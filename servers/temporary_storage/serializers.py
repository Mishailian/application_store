from rest_framework import serializers
from .models import Temporary_storage, Tag_post, Executor, Undeclared_temporary_storage, Archive

class Temporary_storage_serializer(serializers.ModelSerializer):
    class Meta:
        model = Temporary_storage
        fields = '__all__'

        
class Tag_serializer(serializers.ModelSerializer):
    class Meta:
        model = Tag_post
        fields = '__all__'

class Users_serializer(serializers.ModelSerializer):
    class Meta:
        model = Executor
        fields = '__all__'

class Undeclared_temporary_storage_serializer(serializers.ModelSerializer):
    class Meta:
        model = Undeclared_temporary_storage
        fields = '__all__'


class Archive_serializer(serializers.ModelSerializer):
    class Meta:
        model = Archive
        fields = '__all__'