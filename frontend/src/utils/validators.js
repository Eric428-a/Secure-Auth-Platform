// frontend/src/utils/validators.js

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean} - true if valid, false otherwise
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== "string") return false;
    // Simple regex for standard email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };
  
  /**
   * Check if two passwords match
   * @param {string} password
   * @param {string} confirmPassword
   * @returns {boolean} - true if they match, false otherwise
   */
  export const validatePasswordMatch = (password, confirmPassword) => {
    if (!password || !confirmPassword) return false;
    return password === confirmPassword;
  };
  
  /**
   * Validate password strength
   * Requirements:
   *  - Minimum 8 characters
   *  - At least one uppercase letter
   *  - At least one lowercase letter
   *  - At least one digit
   * @param {string} password
   * @returns {boolean} - true if strong enough
   */
  export const validatePasswordStrength = (password) => {
    if (!password || typeof password !== "string") return false;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };
  
  /**
   * Optional: Validate full name fields (first, last, surname)
   * - Only letters and spaces
   * - Minimum 2 characters
   * @param {string} name
   * @returns {boolean}
   */
  export const validateName = (name) => {
    if (!name || typeof name !== "string") return false;
    const regex = /^[A-Za-z\s]{2,}$/;
    return regex.test(name.trim());
  };
  