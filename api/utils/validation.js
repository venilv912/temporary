import validator from 'validator';

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    return validator.isEmail(email);
};

/**
 *
 * @param {string} password
 * @returns {string|null}
 */
export const validatePassword = (password) => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long!";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must include at least one uppercase letter!";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must include at least one lowercase letter!";
    }
    if (!/\d/.test(password)) {
        return "Password must include at least one digit!";
    }
    if (!/[^A-Za-z\d]/.test(password)) {
        return "Password must include at least one special character (e.g., @$!%*?&)";
    }
    return null;
};