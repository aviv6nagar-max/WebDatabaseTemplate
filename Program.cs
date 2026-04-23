using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
    static int secretNumber;

    static void Main()
    {
        int port = 5000;

        var server = new Server(port);
        var database = new Database();

        secretNumber = new Random().Next(1, 101);

        Console.WriteLine("🎮 Guess Game Server Running");
        Console.WriteLine($"http://localhost:{port}/website/pages/index.html");

        while (true)
        {
            var request = server.WaitForRequest();

            try
            {
                // ▶ התחלת משחק
                if (request.Name == "startGame")
                {
                    secretNumber = new Random().Next(1, 101);
                    request.Respond("Game started");
                }

                // ▶ ניחוש מספר
                else if (request.Name == "guess")
                {
                    int guess = request.GetParams<int>();

                    if (guess > secretNumber)
                        request.Respond("Too high");
                    else if (guess < secretNumber)
                        request.Respond("Too low");
                    else
                        request.Respond("Correct");
                }

                // ▶ שמירת ניקוד
                else if (request.Name == "saveScore")
                {
                    var (name, attempts) = request.GetParams<(string, int)>();

                    var score = new Score
                    {
                        Name = name,
                        Attempts = attempts
                    };

                    database.Scores.Add(score);
                    database.SaveChanges();

                    request.Respond("Saved");
                }

                // ▶ קבלת ניקוד
                else if (request.Name == "getScores")
                {
                    var scores = database.Scores
                        .OrderBy(s => s.Attempts)
                        .ToList();

                    request.Respond(scores);
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

#region Database + Model

class Database() : DatabaseCore("database")
{
    public DbSet<Score> Scores { get; set; } = default!;
}

class Score
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Attempts { get; set; }
}

#endregion