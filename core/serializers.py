from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateSerializer):
    birth_date = serializers.DateField(required=False)
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id','username','first_name','last_name','email','password']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id','username','first_name','last_name','email']