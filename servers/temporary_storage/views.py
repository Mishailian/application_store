from rest_framework import viewsets
from .models import Temporary_storage, Tag_post, Author, Archive, Executor, Undeclared_temporary_storage
from .serializers import Temporary_storage_serializer, Tag_serializer, Users_serializer, Undeclared_temporary_storage_serializer, Archive_serializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import Group

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.http import Http404, HttpResponseNotFound

# initialization of constants
limitOfReturnedObjects = 14


def cunculatePage(page):
    page = int(page)
    start = page * limitOfReturnedObjects
    end = start + limitOfReturnedObjects
    return [start, end]


class Temporary_storage_api(viewsets.ModelViewSet):
    queryset = Temporary_storage.objects.all()
    serializer_class = Temporary_storage_serializer
    lookup_field = 'pk'
    # print(f'{queryset}, {serializer_class}, ')
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # ⥥ for filter by executor
        executor_id_param = self.request.query_params.get('ex_i')
        # ⥥ get all executors
        executor_dbase = self.request.query_params.get('get_exdb')
        # ⥥ get page of posts
        page = self.request.query_params.get('page')
        # ⥥ get count of posts
        countOfObjects = self.request.query_params.get('count')
        # ⥥ get count of filtered posts
        countOfFilteredObjects = self.request.query_params.get('ex_count')

        if executor_id_param:
            try:
                borders = cunculatePage(int(page))
                executor_id_param = int(executor_id_param)
                queryset = Temporary_storage.objects.filter(
                    executor_id=executor_id_param)[borders[0]:borders[1]]
            except ValueError:
                return Response({'error': 'Invalid executor_id_param. Must be a valid integer.'})
        elif executor_dbase:
            try:
                queryset = Executor.objects.all()
            except Exception:
                return Response({'error': 'something go wrong :('})
        elif page:
            try:
                borders = cunculatePage(int(page))
                queryset = Temporary_storage.objects.all()[
                    borders[0]:borders[1]]
                print(queryset)

            except Exception:
                return Response({'error': 'something go wrong :('})

        elif countOfObjects:
            try:
                return Response(Temporary_storage.objects.count())

            except Exception:
                return Response({'error': 'something go wrong :('})

        elif countOfFilteredObjects:
            try:
                countOfFilteredObjects = int(countOfFilteredObjects)
                queryset = Temporary_storage.objects.filter(
                    executor_id=countOfFilteredObjects).count()
                return Response(queryset)

            except Exception:
                return Response({'error': 'something go wrong :('})

        else:
            queryset = Temporary_storage.objects.all()[:limitOfReturnedObjects]

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class Undeclared_temporary_storage_api(viewsets.ModelViewSet):
    queryset = Undeclared_temporary_storage.objects.all()
    serializer_class = Undeclared_temporary_storage_serializer
    lookup_field = 'pk'
# need pagination here!!!!!!!!

    def list(self, request, *args, **kwargs):
        declared_id_param = self.request.query_params.get('declared')
        page = self.request.query_params.get('page')
        countOfObjects = self.request.query_params.get('count')

        if declared_id_param:
            try:
                declared_id_param = int(declared_id_param)
                Undeclared_temporary_storage.declared(declared_id_param)
                return Response()
            except ValueError:
                return HttpResponseNotFound()

        elif countOfObjects:
            try:
                print(Undeclared_temporary_storage.objects.count())
                return Response(Undeclared_temporary_storage.objects.count())

            except Exception:
                return Response({'error': 'something go wrong :('})

        elif page:
            borders = cunculatePage(int(page))
            queryset = Undeclared_temporary_storage.objects.all()[
                borders[0]:borders[1]]
        else:
            queryset = Undeclared_temporary_storage.objects.all()[
                :limitOfReturnedObjects]

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
        author = Author.objects.get(name=token.user.username)
        return Response({
            'token': token.key,
            'id': token.user.id,
            'username': token.user.username,
            'username': str(author),
            'is_superuser': token.user.is_superuser,
        })

    def get(self, request):
        return Response({'error': 'use post request'})
