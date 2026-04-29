using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// מאפשר קריאות מהאתר (חשוב מאוד)
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod()
);

// 📚 רשימת ספרים (זיכרון זמני)
var books = new List<string>
{
    "Harry Potter",
    "The Hobbit",
    "1984"
};

// 🏠 בדיקה שהשרת עובד
app.MapGet("/", () => "Library Server is running");

// 📖 קבלת כל הספרים
app.MapGet("/books", () =>
{
    return Results.Ok(books);
});

// 📥 השאלת ספר
app.MapPost("/borrow", (int bookId) =>
{
    if (bookId < 0 || bookId >= books.Count)
        return Results.BadRequest("Invalid book");

    return Results.Ok($"You borrowed: {books[bookId]}");
});

// 💰 קניית ספר
app.MapPost("/buy", (int bookId) =>
{
    if (bookId < 0 || bookId >= books.Count)
        return Results.BadRequest("Invalid book");

    return Results.Ok($"You bought: {books[bookId]}");
});

app.Run();git config --global user.name _