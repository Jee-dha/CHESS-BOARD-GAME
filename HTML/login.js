// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Example: simple static credentials
    if (username === "admin" && password === "1234") {
        alert("Login successful!");
        // Store username in sessionStorage to show on home page
        sessionStorage.setItem("username", username);
        window.location.href = "index.html"; // Redirect to home page
    } else {
        alert("Invalid username or password!");
    }
});

// Handle Play as Guest
document.querySelector(".links a[href='guest.html']").addEventListener("click", function(e){
    e.preventDefault();
    alert("Playing as Guest!");
    sessionStorage.setItem("username", "Guest"); // store guest name
    window.location.href = "index.html"; // redirect guest to home
});

// Handle Sign Up redirect
document.querySelector(".links a[href='signup.html']").addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = "signup.html"; // redirect to signup page
});
