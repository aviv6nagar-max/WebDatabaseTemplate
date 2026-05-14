

type Borrow = {
    bookId: number;
    name: string;
    borrowDate: string;
    returnDate: string;
};



function login(username: string): void {
    if (!username) return;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    window.location.href = "index.html";
}



function checkLogin(): void {
    const status = document.querySelector("#status");

    if (localStorage.getItem("loggedIn") === "true") {
        if (status) {
            status.textContent = "Logged in";
        }
    }
}


checkLogin();



function borrowBook(bookId: number): void {

    if (localStorage.getItem("loggedIn") !== "true") {
        alert("You must be logged in!");
        return;
    }

    const name = prompt("Enter your name:");
    if (!name) return;

    const borrowDate = prompt("Enter borrow date (YYYY-MM-DD):");
    if (!borrowDate || borrowDate.length !== 10) {
        alert("Invalid borrow date");
        return;
    }

    const returnDate = prompt("Enter return date (YYYY-MM-DD):");
    if (!returnDate || returnDate.length !== 10) {
        alert("Invalid return date");
        return;
    }

    const borrow: Borrow = {
        bookId,
        name,
        borrowDate,
        returnDate
    };

    saveBorrow(borrow);

    alert("Borrow saved!");
}



function saveBorrow(borrow: Borrow): void {

    let borrows: Borrow[] = [];

    const data = localStorage.getItem("borrows");

    if (data) {
        borrows = JSON.parse(data);
    }

    borrows.push(borrow);

    localStorage.setItem("borrows", JSON.stringify(borrows));
}