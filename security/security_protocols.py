# security_protocols.py
import os
import base64
import hashlib
import hmac
import secrets
from cryptography.fernet import Fernet

def generate_key(length=32):
    """
    Generate a random encryption key.

    :param length: Length of the key in bytes
    :return: Encryption key
    """
    return secrets.token_bytes(length)

def encrypt_data(data, key):
    """
Encrypt data using the Fernet symmetric encryption algorithm.

    :param data: Data to be encrypted
    :param key: Encryption key
    :return: Encrypted data
    """
    f = Fernet(key)
    return f.encrypt(data.encode())

def decrypt_data(encrypted_data, key):
    """
    Decrypt data using the Fernet symmetric encryption algorithm.

    :param encrypted_data: Encrypted data
    :param key: Encryption key
    :return: Decrypted data
    """
    f = Fernet(key)
    return f.decrypt(encrypted_data).decode()

def generate_hash(data):
    """
    Generate a hash of the given data using the SHA-256 algorithm.

    :param data: Data to be hashed
    :return: Hash of the data
    """
    return hashlib.sha256(data.encode()).hexdigest()

def generate_hmac(data, key):
    """
    Generate a HMAC of the given data using the specified key.

    :param data: Data to be HMACed
    :param key: HMAC key
    :return: HMAC of the data
    """
    return hmac.new(key, data.encode(), hashlib.sha256).hexdigest()

def generate_salt(length=16):
    """
    Generate a random salt.

    :param length: Length of the salt in bytes
    :return: Salt
    """
    return secrets.token_bytes(length)

def generate_password_hash(password, salt):
    """
    Generate a hash of the given password using the specified salt.

    :param password: Password to be hashed
    :param salt: Salt
    :return: Hash of the password
    """
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000).hex()

def authenticate_password(password, hash):
    """
    Authenticate the given password using the specified hash.

    :param password: Password to be authenticated
    :param hash: Hash of the password
    :return: True if the password is correct, False otherwise
    """
    return hash == generate_password_hash(password, hash[:32])

def generate_token(length=64):
    """
    Generate a random token.

    :param length: Length of the token in bytes
    :return: Token
    """
    return secrets.token_hex(length)

def generate_base64_encoded_token(length=64):
    """
    Generate a random base64-encoded token.

    :param length: Length of the token in bytes
    :return: Base64-encoded token
    """
    return base64.b64encode(secrets.token_bytes(length)).decode()

def generate_nonce(length=16):
    """
    Generate a random nonce.

    :param length: Length of the nonce in bytes
    :return: Nonce
    """
    return secrets.token_bytes(length)

def generate_base64_encoded_nonce(length=16):
    """
    Generate a random base64-encoded nonce.

    :param length: Length of the nonce in bytes
    :return: Base64-encoded nonce
    """
    return base64.b64encode(secrets.token_bytes(length)).decode()

def generate_cookie(user_id, token, expires_in=3600):
    """
    Generate a cookie for the given user ID and token.

    :param user_id: User ID
    :param token: Token
    :param expires_in: Cookie expiration time in seconds
    :return: Cookie
    """
    return f"{user_id}:{token}:{int(time.time() + expires_in)}"

def parse_cookie(cookie):
    """
    Parse a cookie and return the user ID, token, and expiration time.

    :param cookie: Cookie
    :return: Tuple of user ID, token, and expiration time
    """
    parts = cookie.split(":")
return parts[0], parts[1], int(parts[2])

def generate_csrf_token():
    """
    Generate a CSRF token.

    :return: CSRF token
    """
    return secrets.token_hex(32)

def verify_csrf_token(csrf_token):
    """
    Verify a CSRF token.

    :param csrf_token: CSRF token
    :return: True if the token is valid, False otherwise
    """
    return csrf_token == generate_csrf_token()

def generate_signature(data, key):
    """
    Generate a signature of the given data using the specified key.

    :param data: Data to be signed
    :param key: Signing key
    :return: Signature of the data
    """
    return hmac.new(key, data.encode(), hashlib.sha256).hexdigest()

def verify_signature(data, signature, key):
    """
    Verify a signature of the given data using the specified key.

    :param data: Data to be verified
    :param signature: Signature of the data
    :param key: Verifying key
    :return: True if the signature is valid, False otherwise
    """
    return hmac.new(key, data.encode(), hashlib.sha256).hexdigest() == signature
