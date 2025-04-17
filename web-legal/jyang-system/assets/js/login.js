// Add some interactivity to the login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const loginButton = document.querySelector('.login-btn');
    const inputs = document.querySelectorAll('input');
    
    // Add animation to inputs on focus
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add loading state to button when form is submitted
    loginForm.addEventListener('submit', function(e) {
        loginButton.innerHTML = 'Cargando... <span class="spinner"></span>';
        loginButton.disabled = true;
        // Form will submit normally as defined in the PHP
    });
    
    // Create an ear wiggle animation when hovering over the logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseenter', function() {
        this.classList.add('wiggle');
        setTimeout(() => {
            this.classList.remove('wiggle');
        }, 500);
    });
});
