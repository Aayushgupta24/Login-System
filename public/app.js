// API base URL
const API_URL = '/api';

// Utility function to show error messages
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
        setTimeout(() => {
            errorEl.classList.remove('show');
        }, 5000);
    }
}

// Utility function to show success messages
function showSuccess(elementId, message) {
    const successEl = document.getElementById(elementId);
    if (successEl) {
        successEl.textContent = message;
        successEl.classList.add('show');
        setTimeout(() => {
            successEl.classList.remove('show');
        }, 5000);
    }
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const errorEl = document.getElementById('errorMessage');
        const successEl = document.getElementById('successMessage');
        if (errorEl) errorEl.classList.remove('show');
        if (successEl) successEl.classList.remove('show');

        const formData = {
            username: document.getElementById('username').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important for cookies
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showSuccess('successMessage', 'Registration successful! Redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                let errorMsg = data.message || 'Registration failed';
                if (data.errors && data.errors.length > 0) {
                    errorMsg = data.errors.map(err => err.msg).join(', ');
                }
                showError('errorMessage', errorMsg);
            }
        } catch (error) {
            showError('errorMessage', 'Network error. Please try again.');
            console.error('Registration error:', error);
        }
    });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const errorEl = document.getElementById('errorMessage');
        const successEl = document.getElementById('successMessage');
        if (errorEl) errorEl.classList.remove('show');
        if (successEl) successEl.classList.remove('show');

        const formData = {
            login: document.getElementById('login').value.trim(),
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important for cookies
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showSuccess('successMessage', 'Login successful! Redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showError('errorMessage', data.message || 'Invalid credentials');
            }
        } catch (error) {
            showError('errorMessage', 'Network error. Please try again.');
            console.error('Login error:', error);
        }
    });
}

// Dashboard - Load user data
if (window.location.pathname.includes('dashboard.html')) {
    async function loadUserData() {
        const loadingEl = document.getElementById('loadingMessage');
        const userInfoEl = document.getElementById('userInfo');
        const errorEl = document.getElementById('errorMessage');

        try {
            const response = await fetch(`${API_URL}/protected/dashboard`, {
                method: 'GET',
                credentials: 'include', // Important for cookies
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (loadingEl) loadingEl.style.display = 'none';
                if (userInfoEl) {
                    document.getElementById('username').textContent = data.data.user.username;
                    document.getElementById('userId').textContent = data.data.user.id;
                    document.getElementById('userEmail').textContent = data.data.user.email;
                    userInfoEl.style.display = 'block';
                }
            } else {
                if (loadingEl) loadingEl.style.display = 'none';
                showError('errorMessage', data.message || 'Not authenticated. Please login.');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        } catch (error) {
            if (loadingEl) loadingEl.style.display = 'none';
            showError('errorMessage', 'Error loading user data. Please try again.');
            console.error('Dashboard error:', error);
        }
    }

    loadUserData();
}

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok && data.success) {
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Redirect anyway
            window.location.href = 'index.html';
        }
    });
}

