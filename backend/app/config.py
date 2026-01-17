# app/config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    # MongoDB
    MONGO_URI: str = os.getenv("MONGO_URI")

    # JWT settings
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXP_MINUTES: int = int(os.getenv("JWT_EXP_MINUTES", 60))

    # SMTP settings
    SMTP_EMAIL: str = os.getenv("SMTP_EMAIL")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD")

    # Google reCAPTCHA secret
    RECAPTCHA_SECRET: str = os.getenv("RECAPTCHA_SECRET")

    # Frontend domain
    FRONTEND_DOMAIN: str = os.getenv("FRONTEND_DOMAIN")

# single shared settings object for the whole app
settings = Settings()
