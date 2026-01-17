# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import router as auth_router
from app.config import settings  # import the environment-based frontend URL

# Create FastAPI instance
app = FastAPI(title="Secure User Authentication Backend")

# ==========================
# CORS Middleware
# ==========================
# Use FRONTEND_DOMAIN from env
frontend_origin = settings.FRONTEND_DOMAIN or "http://localhost:3000"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],  # dynamic frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Include Routers
# ==========================
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# ==========================
# Root endpoint for health check
# ==========================
@app.get("/")
async def root():
    return {"message": "Secure Auth Backend Running"}
