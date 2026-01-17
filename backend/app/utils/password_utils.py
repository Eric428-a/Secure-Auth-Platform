# app/utils/password_utils.py

from passlib.context import CryptContext
import re

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def validate_password_strength(password: str):
    """
    Validate password strength:
    - At least 8 characters
    - Contains at least one uppercase letter
    - Contains at least one number
    - Contains at least one special character (simple set)
    """
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")

    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")

    if not re.search(r"[0-9]", password):
        raise ValueError("Password must contain at least one number")

    if not re.search(r"[!@#$%^&*]", password):
        raise ValueError("Password must contain at least one special character from !@#$%^&*")
