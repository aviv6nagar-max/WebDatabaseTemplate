using System;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
    static void Main()
    {
        int port = 5000;

        var server = new Server(port);
        var database = new Database();

        Console.WriteLine("The server is running");
        Console.WriteLine($"Local:   http://localhost:{port}/website/pages/index.html");
        Console.WriteLine($"Network: http://{Network.GetLocalNetworkIPAddress()}:{port}/website/pages/index.html");

        if (database.IsNewlyCreated)
        {
            AddDefaultBooks(database);
        }

        while (true)
        {
            var request = server.WaitForRequest();

            Console.WriteLine($"Received request: {request.Name}");

            try
            {
              
                if (request.Name == "signUp")
                {
                    var (name, email, password, phone, address)
                        = request.GetParams<(string, string, string, int, string)>();

                    if (database.Users.Any(u => u.Email == email))
                    {
                        request.Respond<string?>("Email already exists");
                        continue;
                    }

                    var user = new User(

                        name,
                        email,
                        password,
                        phone,
                        address
                    );

                    database.Users.Add(user);
                    database.SaveChanges();

                    request.Respond("User created");
                }

               
                else if (request.Name == "logIn")
                {
                    var (email, password)
                        = request.GetParams<(string, string)>();

                    var user = database.Users.FirstOrDefault(u =>
                        u.Email == email &&
                        u.Password == password);

                    request.Respond(user);
                }

               
                else if (request.Name == "getAllBooks")
                {
                    request.Respond(database.Books);
                }

              
                else if (request.Name == "getBook")
                {
                    var id = request.GetParams<int>();

                    var book = database.Books
                        .FirstOrDefault(b => b.Id == id);

                    request.Respond(book);
                }

                
                else if (request.Name == "addBook")
                {
                    var (author, name, description)
                        = request.GetParams<(string, string, string)>();

                    var book = new Book(
                    
                        author,
                        name,
                        description
                    );

                    database.Books.Add(book);
                    database.SaveChanges();

                    request.Respond("Book added");
                }

               
                else if (request.Name == "borrowBook")
                {
                    var (userId, bookId)
                        = request.GetParams<(int, int)>();

                    var Borrow = new Borrow(
                       
                        userId,
                        bookId,
                        DateTime.Now,
                        null
                    );

                    database.Borrows.Add(Borrow);
                    database.SaveChanges();

                    request.Respond("Book borrowed");
                }

               
                else if (request.Name == "returnBook")
                {
                    var borrowId = request.GetParams<int>();

                    var borrow = database.Borrows
                        .FirstOrDefault(b => b.Id == borrowId);

                    if (borrow != null)
                    {
                        borrow.ReturnDate = DateTime.Now;
                        database.SaveChanges();
                    }

                    request.Respond("Book returned");
                }

             
                else if (request.Name == "getUserBorrows")
                {
                    var userId = request.GetParams<int>();

                    var borrows = database.Borrows
                        .Where(b => b.UserId == userId)
                        .ToList();

                    request.Respond(borrows);
                }

                else
                {
                    request.SetStatusCode(400);
                }
            }
            catch (Exception exception)
            {
                request.SetStatusCode(500);
                Log.WriteException(exception);
            }
        }
    }

    static void AddDefaultBooks(Database database)
    {
        database.Books.Add(new Book(
            
            "J.R.R Tolkien",
            "The Hobbit",
            "Fantasy adventure book"
        ));

        database.Books.Add(new Book(

            "George Orwell",
            "1984",
            "Dystopian novel"
        ));

        database.Books.Add(new Book(

            "Harry Potter",
            "by J.K Rowling",
            "Fantasy novel "
        ));
        

        database.SaveChanges();
    }

    class Database() : DatabaseCore("database")
    {
        public DbSet<Book> Books { get; set; } = default!;
        public DbSet<Borrow> Borrows { get; set; } = default!;
        public DbSet<User> Users { get; set; } = default!;
    }

    class Book(string Author, string Name, string Description)
    {
        public int Id { get; set; } = default!;
        public string Author { get; set; } = Author;
        public string Name { get; set; } = Name;
        public string Description { get; set; } = Description;
    }

    class Borrow(
        
        int userId,
        int BookId,
        DateTime borrowDate,
        DateTime? returnDate)
    {
        public int Id { get; set; } = default!;

        public int UserId { get; set; } = userId;
        public int BookId { get; set; } = BookId;

        public DateTime BorrowDate { get; set; } = borrowDate;
        public DateTime? ReturnDate { get; set; } = returnDate;
    }

    class User(
        
        string Name,
        string Email,
        string Password,
        int PhoneNumber,
        string Address)
    {
        public int Id { get; set; } = default!;

        public string Name { get; set; } = Name;
        public string Email { get; set; } = Email;

        [JsonIgnore]
        public string Password { get; set; } = Password;

        public int PhoneNumber { get; set; } = PhoneNumber;
        public string Address { get; set; } = Address;
    }
    
  
}