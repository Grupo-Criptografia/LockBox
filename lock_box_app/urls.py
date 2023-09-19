from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

routers = routers.DefaultRouter()

urlpatterns = [
    path("docs/", include_docs_urls(title="LockBox API"))
]
