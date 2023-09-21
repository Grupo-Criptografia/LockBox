from django.shortcuts import render

from rest_framework.views import APIView
from .crypto_algorithms.shift import encrypt, decrypt, attack
from .serializer import dataShiftSerializer
from .tests import dataShiftTest
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class shiftView(APIView):
    def get(self, request, *args, **kwargs):

        plain_text = request.GET.get('plain_text')

        k = request.GET.get('k')
        cipher_text = request.GET.get('cipher_text')
        method = request.GET.get('method')
        list_plain_text = []

        try:

            if method == 'encrypt':
                k = int(k)
                cipher_text = encrypt(plain_text, k)

            if method == 'decrypt':
                k = int(k)
                plain_text = decrypt(cipher_text, k)

            if method == 'attack':
                k = 0
                list_plain_text = attack(cipher_text)

            data_obj = dataShiftTest(plain_text, cipher_text, k, list_plain_text)
            serializer_class = dataShiftSerializer(data_obj)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
