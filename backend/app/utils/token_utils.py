# app/utils/token_utils.py

from datetime import datetime, timedelta
from jose import jwt, JWTError
import secrets
from app.config import settings

# ----- JWT functions -----
def create_jwt(email: str) -> str:
    """
    Create a JWT token for a given email
    """
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_EXP_MINUTES)
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

def verify_jwt(token: str) -> str | None:
    """
    Verify JWT token and return the email (sub) if valid.
    Returns None if token is invalid or expired.
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

# ----- Random token for email verification / password reset -----
def generate_token(length: int = 32) -> str:
    """
    Generate a URL-safe random token
    """
    return secrets.token_urlsafe(length)
