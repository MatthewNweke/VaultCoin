// csrf.js

export function getCSRFToken() {
    // Retrieve the CSRF token from cookies
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrfToken') {
        return value; // Return the CSRF token
      }
    }
    return ''; 
  }
  