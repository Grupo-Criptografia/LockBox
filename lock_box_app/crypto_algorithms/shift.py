# """
# Shift cipher
# `key` must be an integer from Z_26.
# """
# from .util import char2int, int2char


# def encryptShift(plain_text: str, k: int) -> str:
#     plain_text = plain_text.replace(" ", "").lower()
#     return "".join([int2char[(char2int[i] + k) % 26] for i in plain_text]).upper()


# def decryptShift(cipher_text: str, k: int) -> str:
#     cipher_text = cipher_text.replace(" ", "").lower()
#     return "".join([int2char[(char2int[i] - k) % 26] for i in cipher_text])


# def attackShift(chipher_text: str):
#     """Returns a dictionary of all 26 possible (decryption, key) pairs"""
#     return [decryptShift(chipher_text, k) for k in range(26)]


#HACK
def encryptShift(text, key):
    plain_text = ""
    for character in text:
        # Verificar si el caracter es imprimible (en el rango ASCII 32 a 126)
        if 32 <= ord(character) <= 126:
            # Obtener el código ASCII del caracter y aplicar el desplazamiento
            ascii_code = ord(character) + key
            # Asegurarse de que el resultado esté en el rango ASCII imprimible
            ascii_code = (ascii_code - 32) % (126 - 32 + 1) + 32
            # Convertir el código de vuelta a un caracter y agregarlo al resultado
            plain_text += chr(ascii_code)
        else:
            # Mantener los caracteres no imprimibles sin cambios
            plain_text += character
    return plain_text

def decryptShift(text, key):
    # La descifrado es simplemente cifrar con una clave negativa
    cipher_text = encryptShift(text, -key)
    return cipher_text

def attackShift(chipher_text: str):
    """Returns a dictionary of all 26 possible (decryption, key) pairs"""
    return [decryptShift(chipher_text, k) for k in range(94)]