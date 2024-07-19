const email = document.getElementById('email');
const password = document.getElementById('password');
const repeat = document.getElementById('repeat');
const form = document.getElementById('form');

const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');
const repeat_error = document.getElementById('repeat_error');

form.addEventListener('submit', (e) => {
    let valid = true; // Flag to check if the form is valid

    const email_checker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(email_checker)) {
        email_error.innerHTML = "A valid email is required";
        valid = false;
    } else {
        email_error.innerHTML = "";
    }

    const digit_checker = /^\d{8,}$/;
    if (!password.value.match(digit_checker)) {
        password_error.innerHTML = "Password must be at least 8 digits long";
        valid = false;
    } else {
        password_error.innerHTML = "";
    }

    if (password.value !== repeat.value) {
        repeat_error.innerHTML = "Passwords do not match.";
        valid = false;
    } else {
        repeat_error.innerHTML = "";
    }

    if (!valid) {
        e.preventDefault(); // Prevent form submission if not valid
    }
});
