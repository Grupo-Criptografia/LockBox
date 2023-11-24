import binascii
from .util import pad_image_arr, unpad_image_arr
from Crypto.Cipher import DES3
import numpy as np
from PIL import Image
import secrets


def encrypt_image_tdes(plain_img_file, *args, **kwargs):
    modes = {
        "ECB": DES3.MODE_ECB,
        "CBC": DES3.MODE_CBC,
        "OFB": DES3.MODE_OFB,
        "CFB": DES3.MODE_CFB,
        "CTR": DES3.MODE_CTR,
    }

    plain_image = Image.open(plain_img_file)
    plain_img_arr = np.asarray(plain_image)

    args = (DES3.adjust_key_parity(args[0]), modes[args[1]])

    if args[1] == DES3.MODE_CTR:
        kwargs["nonce"] = b""

    plain_img_arr = pad_image_arr(plain_img_arr, 8)
    des3 = DES3.new(*args, **kwargs)

    shape = plain_img_arr.shape
    plain_img_arr_bytes = plain_img_arr.tobytes()
    encrypted_img_bytes = des3.encrypt(plain_img_arr_bytes)
    cipher_img_arr = np.frombuffer(encrypted_img_bytes, dtype=np.uint8).reshape(shape)

    return cipher_img_arr


def decrypt_image_tdes(cipher_image_file, *args, **kwargs):
    modes = {
        "ECB": DES3.MODE_ECB,
        "CBC": DES3.MODE_CBC,
        "OFB": DES3.MODE_OFB,
        "CFB": DES3.MODE_CFB,
        "CTR": DES3.MODE_CTR,
    }

    cipher_image = Image.open(cipher_image_file)
    cipher_img_arr = np.asarray(cipher_image)

    args = (args[0], modes[args[1]])

    if args[1] == DES3.MODE_CTR:
        kwargs["nonce"] = b""

    des3 = DES3.new(*args, **kwargs)

    shape = cipher_img_arr.shape
    cipher_img_arr_bytes = cipher_img_arr.tobytes()
    decrypted_img_bytes = des3.decrypt(cipher_img_arr_bytes)
    plain_img_arr = np.frombuffer(decrypted_img_bytes, dtype=np.uint8).reshape(shape)

    plain_img_arr = unpad_image_arr(plain_img_arr)

    return plain_img_arr


def generate_tdes_key():
    # Generate a 24-byte key for TDES
    key = secrets.token_bytes(8)
    key_hex = binascii.hexlify(key).decode('utf-8')

    return key_hex


if __name__ == "__main__":
    print(generate_tdes_key())
