// Contact page JS validation 

// Field elements
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendBtn      = document.getElementById('send-btn');
const successMsg   = document.getElementById('success-msg');
 
// Error elements
const nameError    = document.getElementById('name-error');
const emailError   = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Regex patterns
const namePattern    = /^[a-zA-Z\s]{2,}$/;
const emailPattern   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messagePattern = /^[\s\S]{10,}$/;

// Validates a single field against a regex pattern.
// Will show or hide the error message accordingly.
function validateField(input, pattern, errorEl) {
    const isValid = pattern.test(input.value.trim());
    if (isValid) {
        errorEl.classList.add('hidden');
    } else {
        errorEl.classList.remove('hidden');
    }
    return isValid;
}

// Checks all fields and enables or disables the send button.
function updateSendButton() {
    const allValid =
        namePattern.test(nameInput.value.trim()) &&
        emailPattern.test(emailInput.value.trim()) &&
        messagePattern.test(messageInput.value.trim());
 
    if (allValid) {
        sendBtn.disabled = false;
        sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        sendBtn.classList.add('opacity-100', 'cursor-pointer');
    } else {
        sendBtn.disabled = true;
        sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
        sendBtn.classList.remove('opacity-100', 'cursor-pointer');
    }
}

// Validate each field on input and update the button state
nameInput.addEventListener('input', function () {
    validateField(nameInput, namePattern, nameError);
    updateSendButton();
});
 
emailInput.addEventListener('input', function () {
    validateField(emailInput, emailPattern, emailError);
    updateSendButton();
});
 
messageInput.addEventListener('input', function () {
    validateField(messageInput, messagePattern, messageError);
    updateSendButton();
});
 
// Handle send button click
sendBtn.addEventListener('click', function () {
    const nameValid    = validateField(nameInput, namePattern, nameError);
    const emailValid   = validateField(emailInput, emailPattern, emailError);
    const messageValid = validateField(messageInput, messagePattern, messageError);
 
    if (nameValid && emailValid && messageValid) {
        const mailto = `mailto:20147180@tafe.wa.edu.au?subject=Portfolio Contact Form&body=Name: ${nameInput.value}%0AEmail: ${emailInput.value}%0A%0AMessage: ${messageInput.value}`;
        window.location.href = mailto;

        successMsg.classList.remove('hidden');
        nameInput.value    = '';
        emailInput.value   = '';
        messageInput.value = '';
        sendBtn.disabled   = true;
        sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
});


function copyDiscord() {
    navigator.clipboard.writeText("j_man_da_gawd_19784");
    }
const copyBtn = document.querySelector('[onclick="copyDiscord()"]');
copyBtn.removeAttribute('onclick');
copyBtn.addEventListener('click', copyDiscord);