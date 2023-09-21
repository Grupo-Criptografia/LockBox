"""
Shift cipher
`key` must be an integer from Z_26.
"""
from .util import char2int, int2char


def encryptShift(plain_text: str, k: int) -> str:
    plain_text = plain_text.replace(" ", "").lower()
    return "".join([int2char[(char2int[i] + k) % 26] for i in plain_text]).upper()


def decryptShift(cipher_text: str, k: int) -> str:
    cipher_text = cipher_text.replace(" ", "").lower()
    return "".join([int2char[(char2int[i] - k) % 26] for i in cipher_text])


def attackShift(chipher_text: str):
    """Returns a dictionary of all 26 possible (decryption, key) pairs"""
    return [decryptShift(chipher_text, k) for k in range(26)]
