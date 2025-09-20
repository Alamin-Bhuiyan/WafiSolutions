using Backend;
using Backend.BuildingBlocks.Behaviors;
using Backend.BuildingBlocks.Exceptions.Handler;
using Backend.Infrastructure;
using Backend.Models;
using Backend.Models.Enums;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services
    .AddInfrastructureServices(builder.Configuration)
    .AddApplicationServices();

builder.Services.AddTransient(
    typeof(IPipelineBehavior<,>),
    typeof(LoggingBehavior<,>)
);

builder.Services.AddTransient(
    typeof(IPipelineBehavior<,>),
    typeof(ValidationBehavior<,>)
);
builder.Services.AddSingleton<IExceptionHandler, CustomExceptionHandler>();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // Automatically create the database and tables if they don't exist
    db.Database.EnsureCreated();

}

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        var handler = context.RequestServices.GetRequiredService<IExceptionHandler>();
        await handler.TryHandleAsync(context, ex, CancellationToken.None);
    }
});

// Middleware
app.UseCors("task-tracker");

app.UseRouting();

// Map GraphQL
app.MapGraphQL("/graphql");

// Minimal root endpoint for testing
app.MapGet("/", () => "Task Tracker GraphQL API running!");

app.Run();