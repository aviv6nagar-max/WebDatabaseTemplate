import { send } from "clientUtilities";

async function logIn() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const user = await send("logIn",
        email,
        password
    );

    if (!user) {
        alert("Invalid login");
        return;
    }


    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "home.html";
}