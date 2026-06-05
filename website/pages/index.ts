const borrowBookBtn =
  document.querySelector<HTMLButtonElement>("#borrowBook")!;

borrowBookBtn.addEventListener("click", borrowBook);

function borrowBook(): void {
  window.location.href = "borrow.html";
}