from functools import wraps
from PIL import Image
from io import BytesIO
import base64
import numpy as np
import ast

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
from .crypto_algorithms.elgamal import encryptElGamal, decryptElGamal, generate_keys
from .crypto_algorithms.rabin import encrypt_rabin, decrypt_rabin
from .crypto_algorithms.triple_des import encrypt_image_tdes, decrypt_image_tdes
from .crypto_algorithms.aes import encrypt_image_aes, decrypt_image_aes

from .serializer import dataShiftSerializer, dataSubstitutionSerializer, dataAffineSerializer, dataVigenereSerializer, \
    dataSDESSerializer, dataHillTextSerializer, dataHillImgSerializer, ElGamalSerializer , dataRabinSerializer, TdesSerializer, AesSerializer
from .tests import (dataShiftTest, dataSubstitutionTest, dataAffineTest, dataVigenereTest, dataSDESTest, dataHillTextTest, dataElGamalTest,
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


# class shiftView(APIView):
#     @handle_exceptions
#     def post(self, request):

#         plain_text = request.data.get('plain_text')
#         k = request.data.get('k')
#         cipher_text = request.data.get('cipher_text')
#         method = request.data.get('method')
#         list_plain_text = []

#         if method == 'encrypt':
#             k = int(k)
#             cipher_text = encryptShift(plain_text, k - 1)

#         if method == 'decrypt':
#             k = int(k)
#             plain_text = decryptShift(cipher_text, k - 1)

#         if method == 'attack':
#             k = 0
#             list_plain_text = attackShift(cipher_text)

#         data_obj = dataShiftTest(plain_text, cipher_text, k, list_plain_text)
#         serializer_class = dataShiftSerializer(data_obj)
#         return Response(serializer_class.data, status=status.HTTP_200_OK)

#HACK

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


class hillTextView(APIView):
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

        data_obj = dataHillTextTest(plain_text, cipher_text, k)
        serializer_class = dataHillTextSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
class hillImgView(APIView):
    #Para recibir archivos
    parser_classes= (MultiPartParser,)
    
    @handle_exceptions
    #los últimos parámetros son para aceptar opcionalmente más argumentos
    def post(self, request, *args, **kwargs):
        HillImgSerializer = dataHillImgSerializer(data=request.data)
        print(f"serializervalid:{HillImgSerializer.is_valid()}")
        if HillImgSerializer.is_valid():
            plain_img = request.data['plain_img']
            k = request.data.get('k')
            cipher_img = request.data['cipher_img']
            method =request.data.get('method')
            
        if method == 'encrypt':
            # cipher_img = Image.fromarray(encrypt_image_hill(np.ndarray(plain_img), np.ndarray(k)))
            print(f"k: {k}")
            k = ast.literal_eval(k)
            cipher_img = Image.fromarray(encrypt_image_hill(plain_img, np.array(k)))
            plain_img_base64 = convert_img_base64(plain_img)
            cipher_img_base64 = convert_pil_image_to_base64(cipher_img)
            
        if method == 'decrypt':
            k = ast.literal_eval(k)
            plain_img = Image.fromarray(decrypt_image_hill(cipher_img, k))
            plain_img_base64 = convert_pil_image_to_base64(plain_img)
            cipher_img_base64 = convert_img_base64(cipher_img)            

        response = {
            'plain_img': plain_img_base64,
            'cipher_img': cipher_img_base64,
            'k': k,
            'method': method
        } 
        
        return Response(response, status=status.HTTP_200_OK)
    
class elGamalView(APIView):
    @handle_exceptions
    def post(self, request):
        
        plain_text = request.data.get('plain_text')
        cipher_text = request.data.get('cipher_text')
        public_key = request.data.get('public_key')
        private_key = request.data.get('private_key')
        method = request.data.get('method')
        
        print(f"plain_text: {plain_text}")
        print(f"cipher_text: {cipher_text}")
        print(f"public_key: {public_key}")
        print(f"private_key: {private_key}")
        print(f"method: {method}")
        
        if method == 'encrypt':
            cipher_text = encryptElGamal(str(public_key), plain_text)
        if method == 'decrypt':
            plain_text = decryptElGamal(str(private_key), cipher_text)
        
        data_obj = dataElGamalTest(plain_text, cipher_text, public_key, private_key)
        serializer_class = ElGamalSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)
        
class tdesView(APIView):
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    def post(self, request, *args, **kwargs):
        tdesSerializer = TdesSerializer(data=request.data)

        print(f"Request: {tdesSerializer.is_valid()}")

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


class aesView(APIView):
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    def post(self, request, *args, **kwargs):
        aesSerializer = AesSerializer(data=request.data)

        if aesSerializer.is_valid():
            plain_img = request.data['plain_img']
            k = request.data.get('k')
            cipher_img = request.data['cipher_img']
            method = request.data.get('method')
            mode = request.data.get('mode')

            iv = bytes.fromhex("3E B2 66 97 3F 64 CC A0 4F E6 B5 A7 F6 95 D3 27")
            ctr = bytes.fromhex("8C F1 AC 1A B2 A1 AE D6 32 73 85 D5 B2 19 62 9F")

            if method == 'encrypt':
                if mode == 'ECB':
                    cipher_img = Image.fromarray(encrypt_image_aes(plain_img, bytes.fromhex(k), mode))
                if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                    cipher_img = Image.fromarray(encrypt_image_aes(plain_img, bytes.fromhex(k), mode, iv=iv))
                if mode == 'CTR':
                    cipher_img = Image.fromarray(
                        encrypt_image_aes(plain_img, bytes.fromhex(k), mode, initial_value=ctr))

                plain_img_base64 = convert_img_base64(plain_img)
                cipher_img_base64 = convert_pil_image_to_base64(cipher_img)

            if method == 'decrypt':
                if mode == 'ECB':
                    plain_img = Image.fromarray(decrypt_image_aes(cipher_img, bytes.fromhex(k), mode))
                if mode == 'CBC' or mode == 'OFB' or mode == 'CFB':
                    plain_img = Image.fromarray(decrypt_image_aes(cipher_img, bytes.fromhex(k), mode, iv=iv))
                if mode == 'CTR':
                    plain_img = Image.fromarray(
                        decrypt_image_aes(cipher_img, bytes.fromhex(k), mode, initial_value=ctr))

                plain_img_base64 = convert_pil_image_to_base64(plain_img)
                cipher_img_base64 = convert_img_base64(cipher_img)

        response = {
            'plain_img': plain_img_base64,
            'cipher_img': cipher_img_base64,
            'k': k,
            'mode': mode
        }

        return Response(response, status=status.HTTP_200_OK)
