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


class dataHillTextTest:
    def __init__(self, plain_text: str, cipher_text: str, k: list[list]):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k
