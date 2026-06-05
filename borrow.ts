interface Book {
    title: string;
    author: string;
    description: string;
    rating: number;
    image: string;
}

const books: Record<string, Book> = {
    "1": {
        title: "Harry Potter",
        author: "J.K Rowling",
        description: "A young wizard discovers his magical destiny.",
        rating: 4.9,
        image: "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_.jpg"
    },
    "2": {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        description: "Bilbo Baggins goes on an unexpected adventure.",
        rating: 4.8,
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg"
    },
    "3": {
        title: "1984",
        author: "George Orwell",
        description: "A dystopian novel about surveillance and control.",
        rating: 4.7,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-lsizGS00oXHUujdAeZ_m2kyVVmBRr846rwcFXzANfjwEyo9XVtNKgRlhsvxz5xvN5Ve6pr5KyngOcOyVa1NUT2010dpXwdIG1RcNrg&s=10"
    }
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id && books[id]) {
    const book = books[id];

    (document.getElementById("book-title") as HTMLElement).textContent = book.title;
    (document.getElementById("book-author") as HTMLElement).textContent = `By ${book.author}`;
    (document.getElementById("book-description") as HTMLElement).textContent = book.description;
    (document.getElementById("book-rating") as HTMLElement).textContent = book.rating.toString();

    (document.getElementById("book-image") as HTMLImageElement).src = book.image;
}