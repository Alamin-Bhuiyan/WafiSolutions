using DotNetEnv;

namespace Backend.BuildingBlocks;

public class ConnectionManager
{
    public static string GetPostgresConnectionString()
    {
        Env.Load(); // Load environment variables

        var host = Environment.GetEnvironmentVariable("DB_HOST");
        var database = Environment.GetEnvironmentVariable("DB_DATABASE");
        var username = Environment.GetEnvironmentVariable("DB_USERNAME");
        var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
        var port = Environment.GetEnvironmentVariable("DB_PORT");
        
        var connectionString = $"Host={host};Port={port};Database={database};Username={username};Password={password};Pooling=true;";

        return connectionString;
    }   
}