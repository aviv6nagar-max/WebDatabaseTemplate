function borrowBook(id: number) {
  fetch("http://localhost:5000/borrow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ bookId: id })
  })
  .then(res => res.text())
  .then(data => alert(data));
}

function buyBook(id: number) {
  fetch("http://localhost:5000/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ bookId: id })
  })
  .then(res => res.text())
  .then(data => alert(data));
}