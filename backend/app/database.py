# app/database.py

from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# ----- MongoDB Client -----
# Connect to MongoDB using the URI from settings
client = AsyncIOMotorClient(settings.MONGO_URI)

# Get the default database from the URI (or specify one)
db = client.get_default_database()

# ----- Collections -----
# Users collection
users_collection = db["users"] 

# Email verification tokens
email_tokens_collection = db["email_verification_tokens"]

# Password reset tokens
password_reset_collection = db["password_reset_tokens"]

# Optional: login attempt tracking for brute-force protection
login_attempts_collection = db["login_attempts"]

