from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .crypto_algorithms.shift import encryptShift, decryptShift, attackShift
from .crypto_algorithms.substitution import encryptSubs, decryptSubs, attackSubs
from .serializer import dataShiftSerializer, dataSubstitutionSerializer
from .tests import dataShiftTest, dataSubstitutionTest


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
                cipher_text = encryptShift(plain_text, k)

            if method == 'decrypt':
                k = int(k)
                plain_text = decryptShift(cipher_text, k)

            if method == 'attack':
                k = 0
                list_plain_text = attackShift(cipher_text)

            data_obj = dataShiftTest(plain_text, cipher_text, k, list_plain_text)
            serializer_class = dataShiftSerializer(data_obj)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class substitutionView(APIView):

    def get(self, request, *args, **kwargs):

        plain_text = request.GET.get('plain_text')

        k = request.GET.get('k')
        cipher_text = request.GET.get('cipher_text')
        method = request.GET.get('method')
        list_attack = {}

        print(f"plain_text: {plain_text}")
        print(f"k: {k}")
        print(f"cipher_text: {cipher_text}")
        print(f"method: {method}")

        try:
            if method == 'encrypt':
                cipher_text = encryptSubs(plain_text, k)

            if method == 'decrypt':
                plain_text = decryptSubs(cipher_text, k)

            if method == 'attack':
                list_attack = attackSubs(cipher_text)

            print(f"plain_text: {plain_text}")
            print(f"k: {k}")
            print(f"cipher_text: {cipher_text}")
            print(f"method: {method}")
            print(f"list attack. {list_attack}")

            data_obj = dataSubstitutionTest(plain_text, cipher_text, k, list_attack)
            serializer_class = dataSubstitutionSerializer(data_obj)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
