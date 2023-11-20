import rsa.pkcs1
from sympy.ntheory.factor_ import totient
import base64
def getKeyPair():
    (publicKey, privateKey) = rsa.newkeys(512)
    return publicKey, privateKey

def RSAencrypt(plain_text: str, str_key: str) -> str:
    try:
        key_array = [int(x) for x in str_key.replace('(', '').replace(')', '').replace(' ', '').split(",")]
        key = rsa.PublicKey(key_array[0], key_array[1])
        plain_text = plain_text.encode('ascii')
        en2 = []
        en = ""
        keyLength = rsa.common.byte_size(key.n)
        chunks = [plain_text[i:i+keyLength] for i in range(0, len(plain_text), keyLength)]
        for ch in chunks:
            payload = rsa.transform.bytes2int(ch)
            encrypted = rsa.core.encrypt_int(payload, key.e, key.n)
            block = rsa.transform.int2bytes(encrypted, keyLength)
            en += base64.b64encode(block).decode('ascii')
            en2.append(base64.b64encode(block).decode('ascii'))
        return en
    except: 
        return False
def RSAdecrypt(cipher_text: str, str_key: str) -> str:
    try:
        plain = ""
        key_array = [int(x) for x in str_key.replace('(', '').replace(')', '').replace(' ', '').split(",")]
        key = rsa.PrivateKey(key_array[0], key_array[1], key_array[2], key_array[3], key_array[4])
        keyLength = rsa.common.byte_size(key.n)
        lenBytes = len(RSAencrypt("a", key))
        bytesEnc = [base64.b64decode(cipher_text[i:i+lenBytes].encode('ascii')) for i in range(0, len(cipher_text), lenBytes)]
        for by in bytesEnc:
            blocksize = keyLength
            encrypted = rsa.transform.bytes2int(by)
            decrypted = rsa.core.decrypt_int(encrypted,key.d, key.n)
            plain += rsa.transform.int2bytes(decrypted, blocksize).replace(b'\00', b'').decode('ascii')
        return plain
    except:
        return False


