from functools import wraps
from PIL import Image
from io import BytesIO
import base64

from .crypto_algorithms.util import convert_img_base64, convert_pil_image_to_base64

from numpy import asarray
import os
# generar archivos de importación para estos from import
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser

from .crypto_algorithms.shift import encryptShift, decryptShift, attackShift
from .crypto_algorithms.substitution import encryptSubs, decryptSubs, attackSubs
from .crypto_algorithms.affine import encryptAffine, decryptAffine, attackAffine
from .crypto_algorithms.permutation import encryptPermutation, decryptPermutation
from .crypto_algorithms.vigenere import encryptVigenere, decryptVigenere, attackVigenere
from .crypto_algorithms.simplified_des import encrypt_des, decrypt_des
from .crypto_algorithms.hill import encrypt_text_hill, decrypt_text_hill, encrypt_image_hill, decrypt_image_hill
from .crypto_algorithms.rabin import encrypt_rabin, decrypt_rabin
from .crypto_algorithms.triple_des import encrypt_image_tdes, decrypt_image_tdes

from .serializer import dataShiftSerializer, dataSubstitutionSerializer, dataAffineSerializer, dataVigenereSerializer, \
    dataSDESSerializer, dataHillSerializer, dataRabinSerializer, TdesSerializer
from .tests import (dataShiftTest, dataSubstitutionTest, dataAffineTest, dataVigenereTest, dataSDESTest, dataHillTest,
                    dataRabinTest)


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

        file_path = '../feligustin.jpg'
        absolute_path = os.path.abspath(file_path)
        img = Image.open(absolute_path)
        numpydata = asarray(img)

        plain_text = request.data.get('plain_text')
        k = request.data.get('k')
        cipher_text = request.data.get('cipher_text')
        # plain_img = request.data.get('plain_img')
        plain_img = numpydata
        cipher_img = request.data.get('cipher_img')
        method = request.data.get('method')

        print(f"plain_text: {plain_text}")
        print(f"k: {k}")
        print(f"cipher_text: {cipher_text}")
        print(f"plain image{plain_img}")
        print(f"cipher image{cipher_img}")
        print(f"method: {method}")

        if method == 'encrypt':
            cipher_text = encrypt_text_hill(plain_text, k)

        if method == 'decrypt':
            plain_text = decrypt_text_hill(cipher_text, k)

        if method == 'encrypt_img':
            k = asarray(k)
            cipher_img = encrypt_image_hill(plain_img, k)

        if method == 'decrypt_img':
            k = asarray(k)
            plain_img = decrypt_image_hill(cipher_img, k)

        data_obj = dataHillTest(plain_text, cipher_text, plain_img, cipher_img, k)
        serializer_class = dataHillSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class tdesView(APIView):
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    def post(self, request, *args, **kwargs):
        tdesSerializer = TdesSerializer(data=request.data)

        if tdesSerializer.is_valid():
            plain_img = request.data['plain_img']
            k = request.data.get('k')
            cipher_img = request.data['cipher_img']
            method = request.data.get('method')
            mode = request.data.get('mode')

            if method == 'encrypt':
                if mode == 'ECB':
                    cipher_img = Image.fromarray(encrypt_image_tdes(plain_img, k.encode(), mode))
                if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                    cipher_img = Image.fromarray(encrypt_image_tdes(plain_img, k.encode(), mode, iv=b'initvect'))
                if mode == 'CTR':
                    cipher_img = Image.fromarray(
                        encrypt_image_tdes(plain_img, k.encode(), mode, initial_value=b'casaverb'))

                plain_img_base64 = convert_img_base64(plain_img)
                cipher_img_base64 = convert_pil_image_to_base64(cipher_img)

            if method == 'decrypt':
                if mode == 'ECB':
                    plain_img = Image.fromarray(decrypt_image_tdes(cipher_img, k.encode(), mode))
                    plain_img.show()
                if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                    plain_img = Image.fromarray(decrypt_image_tdes(cipher_img, k.encode(), mode, iv=b'initvect'))
                if mode == 'CTR':
                    plain_img = Image.fromarray(
                        decrypt_image_tdes(cipher_img, k.encode(), mode, initial_value=b'casaverb'))

                plain_img_base64 = convert_pil_image_to_base64(plain_img)
                cipher_img_base64 = convert_img_base64(cipher_img)

        response = {
            'plain_img': plain_img_base64,
            'cipher_img': cipher_img_base64,
            'k': k,
            'mode': mode
        }

        return Response(response, status=status.HTTP_200_OK)


class rabinView(APIView):
    @handle_exceptions
    def post(self, request):
        plain_text = request.data.get('plain_text')
        cipher_text = request.data.get('cipher_text')
        n = request.data.get('n')
        p = request.data.get('p')
        q = request.data.get('q')
        method = request.data.get('method')

        print(f"plain_text: {plain_text}")

        print(f"n: {n}")
        print(f"p,q: {p, q}")
        print(f"cipher_text: {cipher_text}")
        print(f"method: {method}")

        if method == 'encrypt':
            cipher_text = encrypt_rabin(plain_text, n)

        if method == 'decrypt':
            plain_text = decrypt_rabin(plain_text, p, q)

        data_obj = dataRabinTest(plain_text, cipher_text, n, p, q)
        serializer_class = dataRabinSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
