from django.test import TestCase

# Create your tests here.

class dataShiftTest():
    def __init__(self, plain_text: str, cipher_text: str, k: int, list_plain_text):
        self.plain_text = plain_text
        self.cipher_text = cipher_text
        self.k = k
        self.list_plain_text = list_plain_text