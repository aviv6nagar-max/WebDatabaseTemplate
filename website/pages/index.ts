const borrow = document.querySelector<HTMLDivElement>("#borrow")!;
const borrowBookBtn =document.querySelector<HTMLButtonElement>("#borrowBook")!;

borrowBookBtn.addEventListener("click", borrowBook);

function borrowBook(): void {
  borrow.innerHTML = `
    <div class="borrow-form">
      <h3>Borrow Book</h3>

      <input
        type="text"
        id="borrowerName"
        placeholder="Enter your name"
      >

      <br><br>

      <label>Borrow Date:</label>
      <input
        type="date"
        id="borrowDate"
      >

      <br><br>

      <label>Return Date:</label>
      <input
        type="date"
        id="returnDate"
      >

      <br><br>

      <button id="saveBorrowBtn">
        Save
      </button>
    </div>
  `;

  const saveBorrowBtn =
    document.querySelector<HTMLButtonElement>("#saveBorrowBtn")!;

  saveBorrowBtn.addEventListener("click", saveBorrow);
}

function saveBorrow(): void {
  const borrowerName =
    (document.querySelector("#borrowerName") as HTMLInputElement).value;

  const borrowDate =
    (document.querySelector("#borrowDate") as HTMLInputElement).value;

  const returnDate =
    (document.querySelector("#returnDate") as HTMLInputElement).value;

  if (!borrowerName || !borrowDate || !returnDate) {
    alert("Please fill all fields");
    return;
  }

  alert(
    `Book borrowed successfully!
    
Name: ${borrowerName}
Borrow Date: ${borrowDate}
Return Date: ${returnDate}`
  );

  console.log({
    borrowerName,
    borrowDate,
    returnDate,
  });
}