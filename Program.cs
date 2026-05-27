using System;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.ServerUtilities;

class Program
{
    static void Main()
    {
        var server = new Server(5000);
        var database = new Database();
        database.SaveChanges();
    }

    class Database() : DatabaseCore("database")
    {
        public DbSet<Book> Books { get; set; } = default!;
        public DbSet<Borrow> Borrows { get; set; } = default!;    
        public DbSet<User> Users { get; set; } = default!;  
    }   

    class Book(int Id, string Author, string Name,string Description)
    {
        public int Id { get; set; } = Id;
        public string Author { get; set; } = Author;
        public string Name { get; set; } = Name;
        public string Description { get; set; } = Description;
    }
    class Borrow(int Id, int UserId, int BookId, DateTime BorrowDate, DateTime? ReturnDate)
    {
        public int Id { get; set; } = Id;
        public int UserId { get; set; } = UserId;
        public int BookId { get; set; } = BookId;
        public DateTime BorrowDate { get; set; } = BorrowDate;
        public DateTime? ReturnDate { get; set; } = ReturnDate;
    }
    class User(int Id, string Name, string Email, string Password, int PhoneNumber, string Address)
    {
        public int Id { get; set; } = Id;
        public string Name { get; set; } = Name;
        public string Email { get; set; } = Email;
        public string Password { get; set; } = Password;
        public int PhoneNumber { get; set; } = PhoneNumber;
        public string Address { get; set; } = Address;
    }
}
