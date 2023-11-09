from functools import wraps

# generar archivos de importación para estos from import
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .crypto_algorithms.shift import encryptShift, decryptShift, attackShift
from .crypto_algorithms.substitution import encryptSubs, decryptSubs, attackSubs
from .crypto_algorithms.affine import encryptAffine, decryptAffine, attackAffine
from .crypto_algorithms.permutation import encryptPermutation, decryptPermutation
from .crypto_algorithms.vigenere import encryptVigenere, decryptVigenere, attackVigenere
from .crypto_algorithms.simplified_des import encrypt_des, decrypt_des
from .crypto_algorithms.hill import encrypt_text_hill, decrypt_text_hill
from .crypto_algorithms.triple_des import encrypt_image_tdes, decrypt_image_tdes

from .serializer import dataShiftSerializer, dataSubstitutionSerializer, dataAffineSerializer, dataVigenereSerializer, \
    dataSDESSerializer, dataHillSerializer
from .tests import dataShiftTest, dataSubstitutionTest, dataAffineTest, dataVigenereTest, dataSDESTest, dataHillTest, \
    dataTDESTest


# Decorador personalizado para manejar excepciones
def handle_exceptions(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        try:
            return view_func(*args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return wrapper


class shiftView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')
        list_plain_text = []

        if method == 'encrypt':
            k = int(k)
            cipher_text = encryptShift(plain_text, k - 1)

        if method == 'decrypt':
            k = int(k)
            plain_text = decryptShift(cipher_text, k - 1)

        if method == 'attack':
            k = 0
            list_plain_text = attackShift(cipher_text)

        data_obj = dataShiftTest(plain_text, cipher_text, k, list_plain_text)
        serializer_class = dataShiftSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class substitutionView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')

        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')
        list_attack = {}

        if method == 'encrypt':
            cipher_text = encryptSubs(plain_text, k)

        if method == 'decrypt':
            plain_text = decryptSubs(cipher_text, k)

        if method == 'attack':
            list_attack = attackSubs(cipher_text)

        data_obj = dataSubstitutionTest(plain_text, cipher_text, k, list_attack)
        serializer_class = dataSubstitutionSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class affineView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')

        if method == 'encrypt':
            cipher_text = encryptAffine(plain_text, k)

        if method == 'decrypt':
            plain_text = decryptAffine(cipher_text, k)

        if method == 'attack':
            plain_text, k = attackAffine(cipher_text)

        data_obj = dataAffineTest(plain_text, cipher_text, k)
        serializer_class = dataAffineSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class permutationView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')

        k = [int(key.strip()) for key in k.split(",")]

        if method == 'encrypt':
            cipher_text = encryptPermutation(plain_text, k)

        if method == 'decrypt':
            plain_text = decryptPermutation(cipher_text, k)

        data_obj = dataAffineTest(plain_text, cipher_text, k)
        serializer_class = dataAffineSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class vigenereView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        m = request.data.get('m')
        list_attack = {}
        method = request.data.get('method')

        if method == 'encrypt':
            cipher_text = encryptVigenere(plain_text, k)

        if method == 'decrypt':
            plain_text = decryptVigenere(cipher_text, k)

        if method == 'attack':
            m = int(m)
            list_attack = attackVigenere(cipher_text, m)

        data_obj = dataVigenereTest(plain_text, cipher_text, k, list_attack)
        serializer_class = dataVigenereSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class sdesView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')

        k = int(k, 2)

        print(f"plain_text: {plain_text}")
        print(f"k: {k}")
        print(f"cipher_text: {cipher_text}")
        print(f"method: {method}")

        if method == 'encrypt':
            cipher_text = encrypt_des(k, plain_text)

        if method == 'decrypt':
            plain_text = decrypt_des(k, plain_text)

        data_obj = dataSDESTest(plain_text, cipher_text, k)
        serializer_class = dataSDESSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class hillView(APIView):
    @handle_exceptions
    def post(self, request):
        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        method = request.data.get('method')

        print(f"plain_text: {plain_text}")
        print(f"k: {k}")
        print(f"cipher_text: {cipher_text}")
        print(f"method: {method}")

        if method == 'encrypt':
            cipher_text = encrypt_text_hill(plain_text, k)

        if method == 'decrypt':
            plain_text = decrypt_text_hill(cipher_text, k)

        data_obj = dataHillTest(plain_text, cipher_text, k)
        serializer_class = dataHillSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class tdesView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_img = request.data.get('plain_img')
        k = request.data.get('k')
        cipher_img = request.data.get('cipher_img')
        method = request.data.get('method')
        mode = request.data.get('mode')

        print(f"plain_img: {plain_img}")
        print(f"k: {k}")
        print(f"cipher_img: {cipher_img}")
        print(f"method: {method}")

        if method == 'encrypt':
            if mode == 'ECB':
                cipher_img = encrypt_image_tdes(plain_img, k, mode)
            if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                cipher_img = encrypt_image_tdes(plain_img, k, mode, iv=b"initvect")
            if mode == 'CTR':
                cipher_img = encrypt_image_tdes(plain_img, k, mode, initial_value=b"casaverd")
        if method == 'decrypt':
            if mode == 'ECB':
                cipher_img = decrypt_image_tdes(plain_img, k, mode)
            if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                cipher_img = decrypt_image_tdes(plain_img, k, mode, iv=b"initvect")
            if mode == 'CTR':
                cipher_img = decrypt_image_tdes(plain_img, k, mode, initial_value=b"casaverd")

        data_obj = dataTDESTest(plain_img, cipher_img, k, mode)
        serializer_class = dataSDESSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
