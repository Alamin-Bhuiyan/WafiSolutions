using Backend.BuildingBlocks;
using Backend.Features.TaskTrackerEndpoints;
using Backend.Infrastructure;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Backend;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var conn = ConnectionManager.GetPostgresConnectionString();
        Console.WriteLine(">>> Using connection string: " + conn);

        // DbContext with PostgreSQL
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(ConnectionManager.GetPostgresConnectionString()));

        // Repositories
        services.AddScoped<ITaskRepository, TaskRepository>();

        return services;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // MediatR
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));

        services
            .AddGraphQLServer()
            .AddQueryType<GetTasksQuery>()
            .AddMutationType(d => d.Name("Mutation")) // define root Mutation
            .AddTypeExtension<CreateTaskMutation>()   // extend root Mutation
            .AddTypeExtension<UpdateTaskMutation>()   // extend root Mutation
            .AddProjections()
            .AddFiltering()
            .AddSorting();

        // CORS
        services.AddCors(options =>
        {
            options.AddPolicy("task-tracker", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithExposedHeaders("*");
            });
        });

        return services;
    }
}