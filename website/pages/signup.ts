import { send } from "clientUtilities";
import { get } from "componentUtilities";
import { User } from "../scripts/types";

var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var confirmPasswordInput = get("input", "confirmInput");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");

var token = localStorage.getItem("token");
var user = await send< User | null>("getUser", token);
if (user != null)
{
  window.location.href = "/website/pages/index.html";
}

submitButton.onclick = async function () {
  if (passwordInput.value != confirmPasswordInput.value) {
    errorDiv.innerText = "Passwords do not match.";
    return;
  }

  var token = await send<string | null>("signUp", usernameInput.value, passwordInput.value);
  if (token == null) {
    errorDiv.innerText = "A user with this username already exists.";
    return;
  }

  localStorage.setItem("token", token);

  window.location.href = "index.html";
};
