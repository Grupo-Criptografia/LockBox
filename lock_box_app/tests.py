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


class dataHillTest:
    def __init__(self, plain_text: str, cipher_text: str, k: list[list]):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k


class dataTDESTest:
    def __init__(self, plain_img: str, cipher_img: str, k: str, mode: str):
        self.plain_img = plain_img
        self.cipher_img = cipher_img
        self.k = k
        self.mode = mode
