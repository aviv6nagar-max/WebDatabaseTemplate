function borrow(bookId: string): void {
  console.log("Borrow book:", bookId);
}
function goToBook(book: HTMLElement): void {
    const bookId = book.getAttribute("data-id");
    const bookName = book.getAttribute("data-name");

    if (!bookId || !bookName) return;

    window.location.href = `book.html?bookId=${bookId}&bookName=${encodeURIComponent(bookName)}`;
}


(window as any).goToBook = goToBook;