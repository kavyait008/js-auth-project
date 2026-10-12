
const getValue = (id) =>
    document.getElementById(id).value.trim();

const saveUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    return true;
};

const getUser = () => {
    const data = localStorage.getItem("authUser");
    return data ? JSON.parse(data) : null;
};

const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showMessage = (id, message, success) => {
    const element = document.getElementById(id);
    element.textContent = message;
    element.style.color = success ? "green" : "red";
    return success;
};

// Registration
const registerUser = (name, email, password) => {
    if (!name || !email || !password) {
        return "Please fill in all fields.";
    }

    if (!validateEmail(email)) {
        return "Enter a valid email address.";
    }

    if (password.length < 6) {
        return "Password must contain at least 6 characters.";
    }

    const existingUser = getUser();

    if (existingUser && existingUser.email === email) {
        return "This email is already registered.";
    }

    saveUser({
        name: name,
        email: email,
        password: password
    });

    return "Registration successful! You can now log in.";
};

// Login
const loginUser = (email, password) => {
    if (!email || !password) {
        return "Please fill in all fields.";
    }

    if (!validateEmail(email)) {
        return "Enter a valid email address.";
    }

    const user = getUser();

    if (user && user.email === email &&
        user.password === password) {
        return "Login successful! Welcome, " + user.name + ".";
    }

    return "Invalid email or password.";
};

// Connect registration form
document.getElementById("registerForm")?.addEventListener(
    "submit", (event) => {
        event.preventDefault();

        const name = getValue("name");
        const email = getValue("email").toLowerCase();
        const password = document.getElementById("password").value;

        const result = registerUser(name, email, password);

        showMessage(
            "registerMessage",
            result,
            result.startsWith("Registration successful")
        );
    }
);

// Connect login form
document.getElementById("loginForm")?.addEventListener(
    "submit", (event) => {
        event.preventDefault();

        const email = getValue("loginEmail").toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const result = loginUser(email, password);

        showMessage(
            "loginMessage",
            result,
            result.startsWith("Login successful")
        );
    }
);