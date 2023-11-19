from .util import pad_image_arr, unpad_image_arr
from Crypto.Cipher import AES
import numpy as np
from PIL import Image


def encrypt_image_aes(plain_img_file, *args, **kwargs):
    modes = {
        "ECB": AES.MODE_ECB,
        "CBC": AES.MODE_CBC,
        "OFB": AES.MODE_OFB,
        "CFB": AES.MODE_CFB,
        "CTR": AES.MODE_CTR,
    }

    plain_image = Image.open(plain_img_file)
    plain_img_arr = np.asarray(plain_image)

    args = (args[0], modes[args[1]])

    if args[1] == AES.MODE_CTR:
        kwargs["nonce"] = b""

    plain_img_arr = pad_image_arr(plain_img_arr, 16)
    aes = AES.new(*args, **kwargs)

    shape = plain_img_arr.shape
    plain_img_arr_bytes = plain_img_arr.tobytes()
    encrypted_img_bytes = aes.encrypt(plain_img_arr_bytes)
    cipher_img_arr = np.frombuffer(encrypted_img_bytes, dtype=np.uint8).reshape(shape)

    return cipher_img_arr


def decrypt_image_aes(cipher_image_file, *args, **kwargs):
    modes = {
        "ECB": AES.MODE_ECB,
        "CBC": AES.MODE_CBC,
        "OFB": AES.MODE_OFB,
        "CFB": AES.MODE_CFB,
        "CTR": AES.MODE_CTR,
    }

    cipher_image = Image.open(cipher_image_file)
    cipher_img_arr = np.asarray(cipher_image)

    args = (args[0], modes[args[1]])

    if args[1] == AES.MODE_CTR:
        kwargs["nonce"] = b""

    aes = AES.new(*args, **kwargs)

    shape = cipher_img_arr.shape
    cipher_img_arr_bytes = cipher_img_arr.tobytes()
    decrypted_img_bytes = aes.decrypt(cipher_img_arr_bytes)
    plain_img_arr = np.frombuffer(decrypted_img_bytes, dtype=np.uint8).reshape(shape)

    plain_img_arr = unpad_image_arr(plain_img_arr)

    return plain_img_arr
