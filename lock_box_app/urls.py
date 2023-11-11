from django.urls import path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from lock_box_app.views import shiftView, substitutionView, affineView, permutationView, vigenereView, sdesView, \
    hillView, tdesView

routers = routers.DefaultRouter()

urlpatterns = [
    path('shift/', shiftView.as_view()),
    path('substitution/', substitutionView.as_view()),
    path('affine/', affineView.as_view()),
    path('permutation/', permutationView.as_view()),
    path('vigenere/', vigenereView.as_view()),
    path('sdes/', sdesView.as_view()),
    path('hill/', hillView.as_view()),
    path('TDES/', tdesView.as_view()),
    path("docs/", include_docs_urls(title="LockBox API")),
]
