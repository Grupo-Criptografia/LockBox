from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from lock_box_app.views import shiftView

routers = routers.DefaultRouter()

urlpatterns = [
    path('shift/', shiftView.as_view()),
    path("docs/", include_docs_urls(title="LockBox API"))
]
