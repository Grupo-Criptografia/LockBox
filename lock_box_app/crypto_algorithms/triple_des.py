from util import pad_image_arr, unpad_image_arr, convert_img_arr, convert_arr_img
from Crypto.Cipher import DES3
import numpy as np
from PIL import Image


def encrypt_image_tdes(plain_img_arr, *args, **kwargs):
    modes = {
        "ECB": DES3.MODE_ECB,
        "CBC": DES3.MODE_CBC,
        "OFB": DES3.MODE_OFB,
        "CFB": DES3.MODE_CFB,
        "CTR": DES3.MODE_CTR,
    }

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


def decrypt_image_tdes(cipher_img_arr, *args, **kwargs):
    modes = {
        "ECB": DES3.MODE_ECB,
        "CBC": DES3.MODE_CBC,
        "OFB": DES3.MODE_OFB,
        "CFB": DES3.MODE_CFB,
        "CTR": DES3.MODE_CTR,
    }

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


if __name__ == "__main__":
    key = b"holamellamodavid"
    print("K: ", key)
    plain_img_arr = convert_img_arr(Image.open("./img/block/clear/bw.png"))
    encrypt = encrypt_image_tdes(plain_img_arr, key, "CBC", iv=b"initvect")
    print("Encrypt: ", encrypt)
    image_enc = convert_arr_img(encrypt)
    image_enc.show()
    cipher_img_arr = convert_img_arr(image_enc)
    decrypt = decrypt_image_tdes(cipher_img_arr, key, "CBC", iv=b"initvect")
    image_dec = convert_arr_img(decrypt)
    image_dec.show()
