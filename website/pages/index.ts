import { send } from "clientUtilities";
import { get } from "componentUtilities";
import { User } from "scripts/types";
import { createBar } from "scripts/funcs"

var token = localStorage.getItem("token");
var user = await send<User | null>("getUser", token);

document.body.prepend(createBar(user));

var borrowButton1 = get("button", "borrowButton1");
var borrowButton2 = get("button", "borrowButton2");
var borrowButton3 = get("button", "borrowButton3");

borrowButton1.onclick = borrowBook;
borrowButton2.onclick = borrowBook;
borrowButton3.onclick = borrowBook;

function borrowBook() {
    console.log(user)
    if (user == null) {
        location.href = "login.html";
        return;
    }

    location.href = "borrow.html";
}
