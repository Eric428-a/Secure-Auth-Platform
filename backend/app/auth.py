# app/auth.py

from fastapi import APIRouter
from datetime import datetime

from app.config import settings
from app.models import (
    RegisterRequest,
    LoginRequest,
    PasswordResetRequest,
    PasswordUpdateRequest,
    MessageResponse,
    TokenResponse,
)
from app.utils import password_utils, token_utils, email_utils, recaptcha
from app.collections import *
from app.exceptions import *

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ----- REGISTER -----
@router.post("/register", response_model=MessageResponse)
async def register(request: RegisterRequest):
    # reCAPTCHA check (bypassed locally with test token)
    await recaptcha.verify_recaptcha(request.recaptcha_token)

    if request.password != request.confirm_password:
        raise PasswordMismatch()

    password_utils.validate_password_strength(request.password)

    existing_user = await get_user_by_email(request.email)
    if existing_user:
        raise UserAlreadyExists()

    hashed_password = password_utils.hash_password(request.password)

    user_data = {
        "first_name": request.first_name,
        "last_name": request.last_name,
        "surname": request.surname,
        "email": request.email,
        "date_of_birth": str(request.date_of_birth),
        "country": request.country,
        "address": request.address,
        "password": hashed_password,
        "is_verified": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    await create_user(user_data)

    # Generate email verification token
    token = token_utils.generate_token()
    await save_email_token(request.email, token)

    verification_link = f"{settings.FRONTEND_DOMAIN}/verify?token={token}"

    await email_utils.send_email(
        request.email,
        "Verify your email",
        f"Click <a href='{verification_link}'>here</a> to verify your email",
    )

    return {"message": "Registration successful. Please verify your email."}


# ----- VERIFY EMAIL -----
@router.get("/verify-email", response_model=MessageResponse)
async def verify_email(token: str):
    record = await get_email_token(token)

    if not record or record["expires_at"] < datetime.utcnow():
        raise TokenExpired()

    await verify_user_email(record["email"])
    await delete_email_token(token)

    return {"message": "Email verified successfully."}


# ----- LOGIN -----
@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    await recaptcha.verify_recaptcha(request.recaptcha_token)

    user = await get_user_by_email(request.email)
    if not user:
        raise InvalidCredentials()

    if not user.get("is_verified"):
        raise EmailNotVerified()

    if not password_utils.verify_password(request.password, user["password"]):
        raise InvalidCredentials()

    token = token_utils.create_jwt(user["email"])
    return {"access_token": token}


# ----- PASSWORD RESET REQUEST -----
@router.post("/password-reset-request", response_model=MessageResponse)
async def password_reset_request(request: PasswordResetRequest):
    await recaptcha.verify_recaptcha(request.recaptcha_token)

    user = await get_user_by_email(request.email)
    if not user:
        raise UserNotFound()

    token = token_utils.generate_token()
    await save_password_reset_token(request.email, token)

    reset_link = f"{settings.FRONTEND_DOMAIN}/reset-password?token={token}"

    await email_utils.send_email(
        request.email,
        "Password Reset",
        f"Click <a href='{reset_link}'>here</a> to reset your password",
    )

    return {"message": "Password reset email sent."}


# ----- PASSWORD UPDATE -----
@router.post("/password-reset", response_model=MessageResponse)
async def password_reset(request: PasswordUpdateRequest):
    if request.new_password != request.confirm_password:
        raise PasswordMismatch()

    password_utils.validate_password_strength(request.new_password)

    record = await get_password_reset_token(request.token)
    if not record or record["expires_at"] < datetime.utcnow():
        raise TokenExpired()

    hashed_password = password_utils.hash_password(request.new_password)
    await update_password(record["email"], hashed_password)
    await delete_password_reset_token(request.token)

    return {"message": "Password updated successfully."}
