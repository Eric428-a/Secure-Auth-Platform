# app/collections.py

from app.database import users_collection, email_tokens_collection, password_reset_collection, login_attempts_collection
from datetime import datetime, timedelta
from typing import Optional

# ----- USERS COLLECTION -----
async def create_user(user_data: dict):
    """Insert a new user into the users collection"""
    await users_collection.insert_one(user_data)

async def get_user_by_email(email: str) -> Optional[dict]:
    """Retrieve a user by email"""
    return await users_collection.find_one({"email": email})

async def verify_user_email(email: str):
    """Mark a user's email as verified"""
    await users_collection.update_one(
        {"email": email},
        {"$set": {"is_verified": True}}
    )

async def update_password(email: str, hashed_password: str):
    """Update a user's password"""
    await users_collection.update_one(
        {"email": email},
        {"$set": {"password": hashed_password}}
    )

# ----- EMAIL VERIFICATION TOKENS -----
async def save_email_token(email: str, token: str, expires_in_minutes: int = 60):
    """Save an email verification token with expiry"""
    await email_tokens_collection.insert_one({
        "email": email,
        "token": token,
        "expires_at": datetime.utcnow() + timedelta(minutes=expires_in_minutes)
    })

async def get_email_token(token: str) -> Optional[dict]:
    """Retrieve an email verification token"""
    return await email_tokens_collection.find_one({"token": token})

async def delete_email_token(token: str):
    """Delete an email verification token"""
    await email_tokens_collection.delete_one({"token": token})

# ----- PASSWORD RESET TOKENS -----
async def save_password_reset_token(email: str, token: str, expires_in_minutes: int = 30):
    """Save a password reset token with expiry"""
    await password_reset_collection.insert_one({
        "email": email,
        "token": token,
        "expires_at": datetime.utcnow() + timedelta(minutes=expires_in_minutes)
    })

async def get_password_reset_token(token: str) -> Optional[dict]:
    """Retrieve a password reset token"""
    return await password_reset_collection.find_one({"token": token})

async def delete_password_reset_token(token: str):
    """Delete a password reset token"""
    await password_reset_collection.delete_one({"token": token})
