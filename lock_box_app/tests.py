from django.test import TestCase


# Create your tests here.

class dataShiftTest:
    def __init__(self, plain_text: str, cipher_text: str, k: int, list_plain_text):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k
        self.list_plain_text = list_plain_text


class dataSubstitutionTest:
    def __init__(self, plain_text: str, cipher_text: str, k: str, list_attack: dict):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k
        self.list_attack = list_attack


class dataAffineTest:
    def __init__(self, plain_text: str, cipher_text: str, k: list):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k


class dataVigenereTest:
    def __init__(self, plain_text: str, cipher_text: str, k: str, list_attack: dict):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k
        self.list_attack = list_attack


class dataSDESTest:
    def __init__(self, plain_text: str, cipher_text: str, k: int):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k


class dataRabinTest:
    def __init__(self, plain_text: str, cipher_text: str, n: int, p: int, q: int):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.n = n
        self.p = p
        self.q = q
        
class dataRSATest:
    def __init__(self, plain_text: str, cipher_text: str, public_key: str, private_key: str):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.public_key = public_key
        self.private_key = private_key


class dataHillTextTest:
    def __init__(self, plain_text: str, cipher_text: str, k: list[list], plain_img: list[list], cipher_img: list[list]):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k

class dataElGamalTest:
    def __init__(self, plain_text:str, cipher_text, public_key: tuple, private_key: tuple):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.public_key = public_key
        self.private_key = private_key
        