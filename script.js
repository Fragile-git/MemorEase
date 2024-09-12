// Toggle password visibility
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", () => {
    // Toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");

});

// Transition between login and sign up
const toggleOption = document.getElementById("changemode");
const text = document.getElementById("modetext");
const mode = document.querySelector(".mode");
const field = document.querySelector(".fields");
const hidden = document.querySelector(".name");
const details = document.querySelector(".details");
const checkbox = document.querySelector(".checkbox");
const submit = document.getElementById("submit");

toggleOption.addEventListener("click", () => {
    // Toggle classes for transition
    toggleOption.classList.toggle("active");
    text.classList.toggle("active");
    mode.classList.toggle("active");
    field.classList.toggle("active");
    hidden.classList.toggle("active");
    // details.classList.toggle("active");
    checkbox.classList.toggle("active");

    // Clear text content
    toggleOption.textContent = "";
    text.textContent = "";
    submit.textContent = "";
    // Update text content after transition
    setTimeout(() => {
        toggleOption.textContent = toggleOption.classList.contains("active") ? "Login" : "Sign Up";
        text.textContent = text.classList.contains("active") ? "Sign Up" : "Login";
        submit.textContent = toggleOption.classList.contains("active") ? "Sign Up" : "Log In";
    }, 450);
});


