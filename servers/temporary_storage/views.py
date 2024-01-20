from rest_framework import viewsets
from .models import Temporary_storage, Tag_post, Author, Archive, Executor, Undeclared_temporary_storage
from .serializers import Temporary_storage_serializer, Tag_serializer, Users_serializer, Undeclared_temporary_storage_serializer, Archive_serializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import Group

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.http import Http404

class Temporary_storage_api(viewsets.ModelViewSet):
    queryset = Temporary_storage.objects.all()
    serializer_class = Temporary_storage_serializer
    lookup_field = 'pk'
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        executor_id_param = self.request.query_params.get('ex_i')
        executor_dbase = self.request.query_params.get('get_exdb')
        if executor_id_param:
            try:
                executor_id_param = int(executor_id_param)
                queryset = Temporary_storage.objects.filter(executor_id=executor_id_param)
            except ValueError:
                return Response({'error': 'Invalid executor_id_param. Must be a valid integer.'})
        elif executor_dbase:
            try:
                queryset = Executor.objects.all()
            except Exception:
                return Response({'error': 'something go wrong :('})
        else:
            queryset = Temporary_storage.objects.all()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Undeclared_temporary_storage_api(viewsets.ModelViewSet):
    queryset = Undeclared_temporary_storage.objects.all()
    serializer_class = Undeclared_temporary_storage_serializer
    lookup_field = 'pk'
    def list(self, request, *args, **kwargs):
        declared_id_param = self.request.query_params.get('declared')
        if declared_id_param:
            try:
                declared_id_param = int(declared_id_param)
                Undeclared_temporary_storage.declared(declared_id_param)
            except ValueError:
                raise Http404()
            
        queryset = Undeclared_temporary_storage.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Archive_api(viewsets.ModelViewSet):
    queryset = Archive.objects.all()
    serializer_class = Archive_serializer
    lookup_field = 'pk'


class Tags_view_set(viewsets.ModelViewSet):
    queryset = Tag_post.objects.all()
    serializer_class = Tag_serializer


class Users_view(viewsets.ModelViewSet):
    queryset = Executor.objects.all()
    serializer_class = Users_serializer


class ObtainTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(ObtainTokenView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        author_id = Author.objects.get(name=token.user.username)
        return Response({
                'token': token.key,
                'id': token.user.id,
                'username': token.user.username,
                'username_id': author_id.user_id,
                'is_superuser': token.user.is_superuser,
        })

    def get(self, request):
        return Response({'error': 'use post request'})
