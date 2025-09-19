using Backend;
using Backend.BuildingBlocks.Behaviors;
using Backend.BuildingBlocks.Exceptions.Handler;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;

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
app.MapGraphQL();

// Minimal root endpoint for testing
app.MapGet("/", () => "Task Tracker GraphQL API running!");

app.Run();