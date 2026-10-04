import { send } from "clientUtilities";
import { get } from "componentUtilities";
import { User } from "scripts/types";

var form = get("form", "loginForm");
var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");

var token = localStorage.getItem("token");
var user = await send<User | null>("getUser", token);

// If the user is already logged in, don't show the login page again.
if (user != null) {
  window.location.href = "index.html";
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  errorDiv.innerText = "";
  submitButton.disabled = true;

  try {
    var token = await send<string | null>(
      "logIn",
      usernameInput.value.trim(),
      passwordInput.value,
    );

    if (token == null) {
      errorDiv.innerText = "Invalid username or password.";
      return;
    }

    localStorage.setItem("token", token);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login failed:", error);
    errorDiv.innerText = "Unable to connect to the server.";
  } finally {
    submitButton.disabled = false;
  }
});
