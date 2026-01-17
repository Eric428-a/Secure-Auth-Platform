![Project Banner](https://placehold.co/1200x300/4b0082/ffffff?text=Secure+Auth+Frontend\&font=roboto\&bold)

# Secure User Authentication Backend (FastAPI + MongoDB) – Developer-Focused Documentation

## 1. Introduction

This repository implements a **production-grade, security-focused user authentication backend** using **FastAPI** and **MongoDB**. The project demonstrates real-world concepts in **backend engineering, AI/ML, and cybersecurity**, combining robust authentication workflows with modular, maintainable architecture.

This documentation is designed to serve as a **primary developer reference**, enabling anyone to set up, run, test, and integrate the backend with frontend applications. It also explains the **AI/ML and security design decisions** integrated into the system.

### Key Concepts

* **Authentication & Identity Management:** Registration, login, JWT-based sessions, email verification, password resets.
* **Cybersecurity Principles:** Defense-in-depth, hashed credentials, JWT cryptography, token expiration, reCAPTCHA bot protection.
* **AI/ML Integration Concepts:** Optional AI-powered anomaly detection or bot detection logic can be integrated, e.g., predicting suspicious login attempts using ML models.
* **Modular Architecture:** Separates API, database, utilities, and configuration layers for maintainability and scalability.

---

## 2. Core Features

* Secure **user registration** with validation and strength checks
* **Email verification** workflow to prevent fake or bot accounts
* **Login** with **JWT-based stateless authentication**
* **Password reset** flow with secure, time-limited tokens
* **reCAPTCHA integration** for bot protection
* **SMTP email delivery** for transactional emails
* **Clean architecture** separating concerns (API, utils, database, config)
* Designed to allow **AI/ML anomaly detection integration**

---

## 3. Security Design & AI/ML Considerations

**Password Security:**

* All passwords are hashed using bcrypt (passlib).
* Password strength is validated using configurable rules.

**Token Security:**

* JWTs are signed and include expiration times.
* Email verification and password reset tokens are cryptographically random, single-use, and time-limited.

**Bot and Abuse Protection:**

* reCAPTCHA v2/v3 validated server-side.
* Optional AI/ML integration: model could predict abnormal signup/login patterns.

**AI/ML Cybersecurity Use Cases:**

* Detect suspicious login patterns (IP, behavior, device fingerprint) using ML models.
* Detect automated signup attempts or spam accounts using anomaly detection.
* Integrate with AI-based risk scoring to trigger additional verification flows.

**Defense-in-Depth Principles:**

* Input validation at multiple layers.
* Error messages do not leak sensitive data.
* Secrets are stored in environment variables and never hard-coded.
* Logs avoid sensitive information.

---

## 4. Technology Stack

### Core Backend

* Python 3.10+
* FastAPI (async API framework)
* Uvicorn (ASGI server)

### Database Layer

* MongoDB (NoSQL document store)
* Motor (async MongoDB driver)

### Authentication & Security

* passlib[bcrypt] for password hashing
* python-jose for JWT handling
* Google reCAPTCHA v2/v3 for bot mitigation

### Utilities & Validation

* Pydantic for request/response schemas
* python-dotenv for environment variables
* httpx for outbound HTTP requests
* email-validator for validating email addresses

### Optional Tools & AI/ML Integration

* scikit-learn, TensorFlow, PyTorch (for ML-based anomaly detection or bot detection)
* MongoDB Compass for database inspection
* Postman / Insomnia for API testing
* VS Code with Python extensions

---

## 5. Project Folder Structure

```
website_backend/
│
├── app/
│   ├── main.py
│   │   # Application entry: initializes FastAPI, registers routers, health check.
│   │
│   ├── config.py
│   │   # Loads environment variables, config constants.
│   │
│   ├── database.py
│   │   # MongoDB connection and client setup using Motor.
│   │
│   ├── collections.py
│   │   # Database access layer with CRUD functions.
│   │
│   ├── models.py
│   │   # Pydantic request/response schemas with validation.
│   │
│   ├── auth.py
│   │   # Authentication routes: register, login, verify email, password reset.
│   │
│   ├── exceptions.py
│   │   # Custom exceptions with security-aware error responses.
│   │
│   └── utils/
│       ├── email_utils.py
│       │   # SMTP configuration and functions for sending verification/reset emails.
│       │
│       ├── token_utils.py
│       │   # JWT creation, validation, and random token generation.
│       │
│       ├── password_utils.py
│       │   # Password hashing, verification, and strength checks.
│       │
│       └── recaptcha.py
│           # Server-side reCAPTCHA validation.
│
├── requirements.txt
│   # Python dependencies with pinned versions.
│
├── .env.example
│   # Example environment variables.
│
├── .env
│   # Actual environment secrets (never committed).
│
└── README.md
    # Developer documentation.
```

---

## 6. Example Environment Variables

`.env` file structure:

```env
MONGO_URI=mongodb://localhost:27017/secure_auth

JWT_SECRET=replace_with_long_random_secret_value
JWT_ALGORITHM=HS256
JWT_EXP_MINUTES=60

SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

RECAPTCHA_SECRET=your_recaptcha_secret_key
FRONTEND_DOMAIN=http://localhost:3000
```

**Notes:**

* Do not commit `.env` to GitHub.
* JWT_SECRET should be cryptographically random.
* Use Gmail App Password for SMTP.

---

## 7. Dependencies & Installation

### requirements.txt

```
fastapi>=0.110
uvicorn>=0.27
motor>=3.3
pymongo>=4.6
python-jose>=3.3
passlib[bcrypt]>=1.7
pydantic>=2.6
python-dotenv>=1.0
httpx>=0.26
email-validator>=2.1
scikit-learn>=1.2  # optional for ML features
```

Install all dependencies:

```
pip install -r requirements.txt
```

---

## 8. Step-by-Step Setup Guide

1. Install Python 3.10+
2. Install MongoDB or configure hosted instance
3. Clone repository:

```
git clone <repo-url>
cd website_backend
```

4. Create virtual environment:

```
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

5. Install dependencies:

```
pip install -r requirements.txt
```

6. Create `.env` file with variables.
7. Ensure MongoDB is running:

```
# Windows
net start MongoDB
# macOS/Linux
mongod
```

8. Run server:

```
uvicorn app.main:app --reload
```

Server URL: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 9. API Endpoints

### Health Check

```
GET /
```

Response:

```json
{
  "message": "Secure Auth Backend Running"
}
```

### Register User

```
POST /auth/register
```

Request Example:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "date_of_birth": "1990-01-01",
  "country": "USA",
  "address": "123 Main Street",
  "password": "SecurePass1!",
  "confirm_password": "SecurePass1!",
  "recaptcha_token": "token_from_frontend"
}
```

### Verify Email

```
GET /auth/verify-email?token=VERIFICATION_TOKEN
```

### Login

```
POST /auth/login
```

Response:

```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer"
}
```

### Password Reset Request

```
POST /auth/password-reset-request
```

### Password Reset

```
POST /auth/password-reset
```

---

## 10. Frontend Integration

Authorization header for protected endpoints:

```
Authorization: Bearer <JWT_TOKEN>
```

Flow:

1. User registers
2. Email verification sent
3. User verifies email
4. User logs in
5. JWT stored securely
6. JWT sent with subsequent API requests

reCAPTCHA:

* Frontend implements v2/v3
* Token sent with registration/login
* Backend validates server-side

---

## 11. Example Client Usage

```python
import httpx

data = {
    "email": "john@example.com",
    "password": "SecurePass1!",
    "recaptcha_token": "token_from_frontend"
}

response = httpx.post("http://127.0.0.1:8000/auth/login", json=data)
print(response.json())
```

---

## 12. AI/ML & Security Developer Notes

* **Optional AI Integration:** Build ML models using login behavior, IP, or device info to detect anomalies.
* **Cybersecurity Focus:** Always validate tokens, hash passwords, avoid logging secrets.
* **Logging:** Avoid sensitive info; include IP and timestamps for monitoring.
* **Monitoring:** Consider integrating with Prometheus/Grafana or cloud monitoring for metrics.

**Example JSON for ML Anomaly Detection Input:**

```json
{
  "user_id": "123456",
  "login_ip": "192.168.1.1",
  "device_info": "Mozilla/5.0 ...",
  "timestamp": "2026-01-15T22:00:00Z",
  "failed_attempts_last_hour": 3
}
```

Model could output risk score for suspicious login detection.

---

## 13. Best Practices

* Never store JWTs in localStorage without understanding XSS risks.
* Validate JWTs on every request.
* Enforce HTTPS in production.
* Use refresh tokens for long-lived sessions.
* Store secrets in secure vaults.

---

## 14. Common Mistakes & Troubleshooting

* MongoDB not running or incorrect URI.
* Incorrect SMTP credentials.
* reCAPTCHA fails due to expired token.
* JWT issues due to secret changes or clock skew.
* Always check server logs for errors.

---

## 15. License

MIT License. Free to use, modify, and deploy.

---

This documentation serves as a **complete developer guide**, providing setup, usage, integration, AI/ML considerations, and cybersecurity best practices, all in a single, professional, GitHub-ready reference.

