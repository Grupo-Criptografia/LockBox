from functools import wraps
from PIL import Image
import numpy as np
import ast
import rsa.pkcs1

from .crypto_algorithms.util import convert_img_base64, convert_pil_image_to_base64

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
from .crypto_algorithms.elgamal import encryptElGamal, decryptElGamal
from .crypto_algorithms.rabin import encrypt_rabin, decrypt_rabin
from .crypto_algorithms.triple_des import encrypt_image_tdes, decrypt_image_tdes
from .crypto_algorithms.aes import encrypt_image_aes, decrypt_image_aes
from .crypto_algorithms.RSA import RSAdecrypt, RSAencrypt
from .crypto_algorithms.digital_signature import sign, verify
from .crypto_algorithms.visual_cript import encrypt_image, decrypt_image
from .crypto_algorithms.watermark import add_watermark_w, extract_watermark_w

from .serializer import dataShiftSerializer, dataSubstitutionSerializer, dataAffineSerializer, dataVigenereSerializer, \
    dataSDESSerializer, dataHillTextSerializer, dataHillImgSerializer, ElGamalSerializer, dataRabinSerializer, \
    TdesSerializer, AesSerializer, dataRSASerializer, VisualCryptSerializer, DigSignatureSerializer, WatermarkSerializer
from .tests import (dataShiftTest, dataSubstitutionTest, dataAffineTest, dataVigenereTest, dataSDESTest,
                    dataHillTextTest, dataElGamalTest,
                    dataRabinTest, dataRSATest)


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

        if method == 'encrypt':
            cipher_text = encrypt_text_hill(plain_text, k)

        if method == 'decrypt':
            plain_text = decrypt_text_hill(cipher_text, k)

        data_obj = dataHillTextTest(plain_text, cipher_text, k)
        serializer_class = dataHillTextSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class hillImgView(APIView):
    # Para recibir archivos
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    # los últimos parámetros son para aceptar opcionalmente más argumentos
    def post(self, request, *args, **kwargs):
        HillImgSerializer = dataHillImgSerializer(data=request.data)
        if HillImgSerializer.is_valid():
            plain_img = request.data['plain_img']
            k = request.data.get('k')
            cipher_img = request.data['cipher_img']
            method = request.data.get('method')

        if method == 'encrypt':
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

        if method == 'encrypt':
            cipher_text = encrypt_rabin(plain_text, n)

        if method == 'decrypt':
            plain_text = decrypt_rabin(plain_text, p, q)

        data_obj = dataRabinTest(plain_text, cipher_text, n, p, q)
        serializer_class = dataRabinSerializer(data_obj)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class RSAView(APIView):
    @handle_exceptions
    def post(self, request):

        plain_text = request.data.get('plain_text')
        cipher_text = request.data.get('cipher_text')
        public_key = request.data.get('public_key')
        private_key = request.data.get('private_key')
        method = request.data.get('method')

        if method == 'encrypt':
            key_array = [int(x) for x in public_key.replace('(', '').replace(')', '').replace(' ', '').split(",")]
            pu_key = rsa.PublicKey(key_array[0], key_array[1])
            cipher_text = RSAencrypt(plain_text, pu_key)

        if method == 'decrypt':
            key_array = [int(x) for x in private_key.replace('(', '').replace(')', '').replace(' ', '').split(",")]
            n = key_array[1] * key_array[2]
            pr_key = rsa.PrivateKey(n, 0, key_array[0], key_array[1], key_array[2])
            plain_text = RSAdecrypt(cipher_text, pr_key)

        data_obj = dataRSATest(plain_text, cipher_text, public_key, private_key)
        serializer_class = dataRSASerializer(data_obj)
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


class digSignatureView(APIView):
    @handle_exceptions
    def post(self, request):
        digSignatureSerializer = DigSignatureSerializer(data=request.data)

        if digSignatureSerializer.is_valid():
            message = request.data.get('message')
            signature = request.data.get('signature')
            pk = request.data.get('pk')
            vk = request.data.get('vk')
            method = request.data.get('method')

            if method == 'sign':
                signature, pk, vk = sign(message)

                response = {
                    'signature': signature,
                    'pk': pk,
                    'vk': vk
                }

            if method == 'verify':
                response_verification = verify(signature, vk, message)

                response = {
                    'message': message,
                    'signature': signature,
                    'vk': vk,
                    'response': response_verification
                }

            return Response(response, status=status.HTTP_200_OK)

        else:
            return Response(digSignatureSerializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class visualCryptView(APIView):
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    def post(self, request, *args, **kwargs):
        visualCryptSerializer = VisualCryptSerializer(data=request.data)

        if visualCryptSerializer.is_valid():
            plain_img = request.data['plain_img']
            share_img1 = request.data['share_img1']
            share_img2 = request.data['share_img2']
            method = request.data.get('method')

            if method == 'encrypt':
                share_img1, share_img2 = encrypt_image(plain_img)

                response = {
                    'share_img1': share_img1,
                    'share_img2': share_img2
                }

            elif method == 'decrypt':
                plain_img = decrypt_image(share_img1, share_img2)
                response = {
                    'plain_img': plain_img
                }

        return Response(response, status=status.HTTP_200_OK)


class watermarkView(APIView):
    parser_classes = (MultiPartParser,)

    @handle_exceptions
    def post(self, request, *args, **kwargs):
        watermarkSerializer = WatermarkSerializer(data=request.data)

        if watermarkSerializer.is_valid():
            original_img = request.data['original_img']
            watermark_img = request.data['watermark_img']
            method = request.data.get('method')

            print(method)

            if method == 'insert':
                watermarked_img = add_watermark_w(original_img, watermark_img)

                response = {
                    'watermarked_img': watermarked_img,
                    'message': 'ok'
                }

            if method == 'extract':
                watermarked_img = extract_watermark_w(watermark_img)

                response = {
                    'ext_watermark_img': watermarked_img,
                    'message': 'ok'
                }

        return Response(response, status=status.HTTP_200_OK)
