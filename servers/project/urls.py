"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from temporary_storage.views import Temporary_storage_api, Tags_view_set, Users_view
from temporary_storage.views import ObtainTokenView

from allauth.account.views import LoginView, LogoutView


router = DefaultRouter()
router.register(r'store', Temporary_storage_api, basename='store')
router.register(r'tags', Tags_view_set)
router.register(r'users', Users_view)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/v1/', include(router.urls)),
    path('api/v1/token/', ObtainTokenView.as_view(), name='obtain-token'),
    path('api/v1/store/', Temporary_storage_api.as_view({'get': 'list'}), name='store-list'),
]
