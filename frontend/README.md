# Secure Auth Frontend

![Project Banner](https://placehold.co/1200x300/004422/ffffff?text=Secure+Auth+Frontend&font=roboto)

## Overview

Secure Auth Frontend is a **modern React application** that provides a **secure, responsive, and visually appealing interface** for user authentication. It works seamlessly with a FastAPI backend to manage login, registration, email verification, and password management workflows.

This frontend emphasizes:

* **Security:** Supports JWT-based authentication and Google reCAPTCHA v3 integration.
* **Reusability:** Modular components like Input, Button, Toast, and Navbar.
* **Responsive Design:** Adaptive styling with themes and animations.
* **Developer-Friendliness:** Clear folder structure, utils, services, and configuration.

---

## Folder Structure

```plaintext
frontend/
│
├── public/
│   └── index.html               # Root HTML file
│
├── src/
│   ├── index.jsx                # React entry point
│   ├── App.jsx                  # Main app wrapper with Router
│   │
│   ├── pages/                   # App pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── VerifyEmail.jsx
│   │   ├── ResetPasswordRequest.jsx
│   │   ├── ResetPassword.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Input.jsx
│   │   ├── Button.jsx
│   │   ├── Toast.jsx
│   │   └── Navbar.jsx
│   │
│   ├── services/                # API service calls
│   │   └── authService.js
│   │
│   ├── utils/                   # Helper utilities
│   │   └── validators.js
│   │
│   ├── theme.js                 # Theme constants
│   └── styles.css               # Global styles
│
├── package.json                 # NPM dependencies & scripts
├── webpack.config.js            # Webpack configuration
└── .babelrc                      # Babel configuration
```

---

## Features

### Pages

* **Login:** User login with email/password and reCAPTCHA protection.
* **Register:** New user registration with input validation and reCAPTCHA.
* **Verify Email:** Handles email verification token from backend.
* **Reset Password Request:** Sends password reset link to email.
* **Reset Password:** Allows updating password with secure token.
* **Dashboard:** Protected area visible only after authentication.

### Components

* **Input:** Reusable text/password input.
* **Button:** Reusable button with hover effects.
* **Toast:** Global toast notifications for success and error messages.
* **Navbar:** Navigation with login, register, dashboard links, and logout.

### Services

* **authService.js:** Handles all API interactions including login, registration, email verification, password reset requests, and password updates.

### Utilities

* **validators.js:** Email format validation, password strength & match checking, and full name validation.

### Styling & Theme

* **theme.js:** Centralized color and spacing constants.
* **styles.css:** Global styles, responsive layout, form styling, animated cards, star background, and toast notifications.

### Security

* JWT token handling in frontend.
* Google reCAPTCHA v3 integration on forms.
* Client-side validation for password strength and email.

---

## Installation

1. **Clone the repository:**

```bash
git clone <repo-url>
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment:**

* Ensure your backend API is running and update `authService.js` `API_BASE` URL if needed.
* Replace `RECAPTCHA_SITE_KEY` with your production Google reCAPTCHA key in pages using it.

---

## Running the App

### Development Mode

```bash
npm start
```

* Launches the app at `http://localhost:3000`.
* Hot reload enabled.
* Uses webpack dev server.

### Production Build

```bash
npm run build
```

* Generates optimized bundle in `dist/` directory.
* Deployable to any static host.

---

## Contribution

* Clone the repo and follow the standard **fork & pull request** workflow.
* Ensure **code quality** and **component reusability**.
* Keep the **theme & styling consistent**.

---

## Author

**Eric Mwaniki**

---

## License

This project is licensed under the **MIT License**.
