// src/utils/validateEmail.js

/**
 * Validates whether a given email is in correct format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
