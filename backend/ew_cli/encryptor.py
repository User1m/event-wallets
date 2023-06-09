from cryptography.fernet import Fernet
import os
from dotenv import load_dotenv

load_dotenv()

# secret_key = os.environ["SECRET"]
# print(secret_key)

class TokenEncryptor:
    # def __init__(self, secret_key):
    #     self.cipher_suite = Fernet(secret_key)

    @staticmethod
    def encrypt(value_to_encrypt, secret_key):
        cipher_suite = Fernet(secret_key)

        token_bytes = value_to_encrypt.encode()
        encrypted_token = cipher_suite.encrypt(token_bytes)
        return encrypted_token.decode()

    @staticmethod
    def decrypt(value_to_decrypt, secret_key):
        cipher_suite = Fernet(secret_key)

        encrypted_bytes = value_to_decrypt.encode()
        decrypted_token = cipher_suite.decrypt(encrypted_bytes)
        return decrypted_token.decode()

def generate_secret_key():
    return Fernet.generate_key().decode()

#print(generate_secret_key())


#token_encryptor = TokenEncryptor() #os.environ["SECRET"])

