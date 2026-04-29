using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
    static void Main()
    {
        var server = new Server(5000);
        var database = new Database();

        Console.WriteLine("📚 Book Library Server Running");

        while (true)
        {
            var request = server.WaitForRequest();

            try
            {
               
                if (request.Name == "getBooks")
                {
                    request.Respond(database.Books.ToList());
                }

                
                else if (request.Name == "borrowBook")
                {
                    int id = request.GetParams<int>();

                    var book = database.Books.FirstOrDefault(b => b.Id == id);

                    if (book == null || book.stock <= 0)
                    {
                        request.Respond("Not available");
                        continue;
                    }

                    book.stock--;
                    database.SaveChanges();

                    request.Respond("Borrowed");
                }

                
                else if (request.Name == "buyBook")
                {
                    int id = request.GetParams<int>();

                    var book = database.Books.FirstOrDefault(b => b.Id == id);

                    if (book == null || book.stock <= 0)
                    {
                        request.Respond("Not available");
                        continue;
                    }

                    book.stock--;
                    database.SaveChanges();

                    request.Respond("Bought");
                }
            }
            catch (Exception ex)
            {
                request.SetStatusCode(500);
                Log.WriteException(ex);
            }
        }
    }
}

class Database() : DatabaseCore("database")
{
    public DbSet<Book> Books { get; set; } = default!;
}

class Book(string Title, int Author, int stock)
{
    public int Id { get; set; } = default!;
    public string Title { get; set; } = Title;
    public int Author { get; set; } = Author;
    public int stock { get; set; } = stock;
}