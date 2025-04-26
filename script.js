document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const countrySelect = document.getElementById('country');
    const successMessage = document.getElementById('success-message');
    const passwordStrengthMeter = document.getElementById('password-strength-meter');

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;

        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        passwordStrengthMeter.className = 'password-strength-meter';
        
        if (password.length === 0) {
            passwordStrengthMeter.style.width = '0';
        } else if (strength < 2) {
            passwordStrengthMeter.classList.add('weak');
        } else if (strength < 4) {
            passwordStrengthMeter.classList.add('medium');
        } else {
            passwordStrengthMeter.classList.add('strong');
        }
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate fullname
        if (fullnameInput.value.trim() === '') {
            document.getElementById('fullname-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('fullname-error').style.display = 'none';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }

        // Validate password
        if (passwordInput.value.length < 8) {
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('password-error').style.display = 'none';
        }

        // Validate password confirmation
        if (passwordInput.value !== confirmPasswordInput.value) {
            document.getElementById('confirm-password-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('confirm-password-error').style.display = 'none';
        }

        // Validate country
        if (countrySelect.value === '') {
            document.getElementById('country-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('country-error').style.display = 'none';
        }

        // Form submission success
        if (isValid) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // You would typically send the form data to a server here
            console.log({
                fullname: fullnameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                country: countrySelect.value
            });
        }
    });
});