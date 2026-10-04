import { send } from "clientUtilities";
import { get, create } from "componentUtilities";
import { Book, User } from "scripts/types";
import { createBar } from "scripts/funcs";

const token = localStorage.getItem("token");
const user = await send<User | null>("getUser", token);

document.body.prepend(createBar(user));

const booksContainer = get("main", "booksContainer");
const loading = get("p", "booksLoading");

try {
  const books = await send<Book[]>("getAllBooks");

  loading.remove();

  if (!books || books.length === 0) {
    booksContainer.append(
      create("p", { innerText: "No books found in the database." })
    );
  } else {
    for (const book of books) {
      booksContainer.append(createBookCard(book));
    }
  }
} catch (error) {
  console.error("Failed to load books:", error);
  loading.innerText = "Could not load books from the database.";
}

function createBookCard(book: Book): HTMLDivElement {
  const card = create("div", { className: "book" });

  card.id = `book-${book.id}`;

  card.append(
    create("h2", { innerText: book.name }),
    create("p", { innerText: `by ${book.author}` }),
    create("img", {
            src: book.imageUrl ?? "",
            alt: book.name,
        }),
    create("p", { innerText: book.description }),
  );

  const borrowButton = create("button", {
    innerText: "Borrow",
    onclick: () => borrowBook(book.id),
  });

  card.append(borrowButton);
  return card;
}

function borrowBook(bookId: number) {
  if (user == null) {
    location.href = "login.html";
    return;
  }

  location.href = `borrow.html?bookId=${bookId}`;
}
