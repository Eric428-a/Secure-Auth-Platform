# app/models.py

from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional

# ----- REQUEST SCHEMAS -----
class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    surname: Optional[str] = None
    email: EmailStr
    date_of_birth: date
    country: str
    address: str

    # Password fields with minimum length validation
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)

    # Google reCAPTCHA token
    recaptcha_token: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    recaptcha_token: str


class PasswordResetRequest(BaseModel):
    email: EmailStr
    recaptcha_token: str


class PasswordUpdateRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)


# ----- RESPONSE SCHEMAS -----
class MessageResponse(BaseModel):
    message: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
