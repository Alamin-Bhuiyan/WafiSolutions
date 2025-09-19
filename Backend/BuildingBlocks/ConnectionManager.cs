using DotNetEnv;

namespace Backend.BuildingBlocks;

public class ConnectionManager
{
    public static string GetPostgresConnectionString()
    {
        Env.Load(); // Load environment variables

        var host = Env.GetString("DB_HOST");
        var database = Env.GetString("DB_DATABASE");
        var username = Env.GetString("DB_USERNAME");
        var password = Env.GetString("DB_PASSWORD");
        var port = Env.GetString("DB_PORT") ?? "5432"; // Default PostgreSQL port

        var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};Pooling=true;";

        return connectionString;
    }   
}