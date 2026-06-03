import { send } from "clientUtilities";
import { get } from "componentUtilities";


var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var confirmInput = get("input", "confirmInput");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");

var token = localStorage.getItem("token");
var user = await send< | null>("getUser", token);



submitButton.onclick = async function () {
  if (passwordInput.value != confirmInput.value) {
    errorDiv.innerText = "Passwords do not match.";
    return;
  }

  var token = await send<string | null>("signUp", usernameInput.value, passwordInput.value);
  if (token == null) {
    errorDiv.innerText = "A user with this username already exists.";
    return;
  }

  localStorage.setItem("token", token);

  location.href = "index.html";
};
