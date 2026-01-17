# app/utils/recaptcha.py

import httpx
from app.config import settings
from app.exceptions import RecaptchaFailed

# Token allowed ONLY for local testing
LOCAL_BYPASS_TOKEN = "test_recaptcha_token"

async def verify_recaptcha(token: str):
    """
    Server-side Google reCAPTCHA verification

    - Allows bypass when using LOCAL_BYPASS_TOKEN (local dev only)
    - Enforces real Google verification in all other cases
    """

    # ✅ Local development bypass
    if token == LOCAL_BYPASS_TOKEN:
        return

    # 🚨 Production verification
    url = "https://www.google.com/recaptcha/api/siteverify"
    data = {
        "secret": settings.RECAPTCHA_SECRET,
        "response": token,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, data=data, timeout=10)
        result = response.json()  # ❌ fixed: no await here

        # Optional: enforce v3 score > 0.5
        if not result.get("success") or result.get("score", 0) < 0.5:
            raise RecaptchaFailed()
