from django.urls import path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from lock_box_app.views import shiftView, substitutionView, affineView, permutationView, vigenereView, sdesView, \
    hillTextView, hillImgView, tdesView, rabinView, aesView, RSAView, elGamalView, digSignatureView

routers = routers.DefaultRouter()

urlpatterns = [
    path('shift/', shiftView.as_view()),
    path('substitution/', substitutionView.as_view()),
    path('affine/', affineView.as_view()),
    path('permutation/', permutationView.as_view()),
    path('vigenere/', vigenereView.as_view()),
    path('sdes/', sdesView.as_view()),
    path('hillText/', hillTextView.as_view()),
    path('hillImg/', hillImgView.as_view()),
    path('elgamal/', elGamalView.as_view()),
    path('rabin/', rabinView.as_view()),
    path('RSA/', RSAView.as_view()),
    path('TDES/', tdesView.as_view()),
    path('AES/', aesView.as_view()),
    path('digsignature/', digSignatureView.as_view()),
    path("docs/", include_docs_urls(title="LockBox API")),
]
