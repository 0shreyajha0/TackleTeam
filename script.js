// Get the form elements
const loginForm = document.getElementById("loginForm");
const forgetPasswordForm = document.getElementById("forgetPasswordForm");

// ...existing code...

// Get the signup form element
const signupForm = document.getElementById("signupForm");

// Handle signup form submission
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the email and password values
  const email = signupForm.elements.email.value;
  const password = signupForm.elements.password.value;

  // Perform signup API request
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle signup response
      console.log(data); // Replace with your desired logic

      // Reset the signup form
      signupForm.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// ...existing code...
