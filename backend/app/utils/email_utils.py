# app/utils/email_utils.py

import smtplib
import asyncio
from email.mime.text import MIMEText
from app.config import settings

def _send_email_sync(to_email: str, subject: str, body: str):
    """
    Synchronous helper to send an HTML email via Gmail SMTP.
    """
    msg = MIMEText(body, "html")
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_EMAIL
    msg["To"] = to_email

    # Connect to Gmail SMTP server securely
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_EMAIL, to_email, msg.as_string())

async def send_email(to_email: str, subject: str, body: str):
    """
    Async wrapper for sending email without blocking the event loop.
    """
    await asyncio.to_thread(_send_email_sync, to_email, subject, body)
