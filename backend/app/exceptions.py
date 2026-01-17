# app/exceptions.py

from fastapi import HTTPException

# ----- USER ERRORS -----
class UserAlreadyExists(HTTPException):
    def __init__(self, detail="User with this email already exists"):
        super().__init__(status_code=400, detail=detail)

class UserNotFound(HTTPException):
    def __init__(self, detail="User not found"):
        super().__init__(status_code=404, detail=detail)

class InvalidCredentials(HTTPException):
    def __init__(self, detail="Invalid email or password"):
        super().__init__(status_code=401, detail=detail)

class EmailNotVerified(HTTPException):
    def __init__(self, detail="Email is not verified"):
        super().__init__(status_code=403, detail=detail)

# ----- TOKEN ERRORS -----
class TokenExpired(HTTPException):
    def __init__(self, detail="Token expired or invalid"):
        super().__init__(status_code=400, detail=detail)

# ----- PASSWORD ERRORS -----
class PasswordMismatch(HTTPException):
    def __init__(self, detail="Passwords do not match"):
        super().__init__(status_code=400, detail=detail)

# ----- RECAPTCHA -----
class RecaptchaFailed(HTTPException):
    def __init__(self, detail="reCAPTCHA validation failed"):
        super().__init__(status_code=400, detail=detail)
