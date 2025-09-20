using System.Reflection;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskEntity> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
        builder.Entity<TaskEntity>(entity =>
        {
            // Map to custom table
            entity.ToTable("task_tracker_tasks")
                .HasComment("Stores all tasks in the task tracker application");

            // Primary Key
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnType("uuid") 
                .HasComment("Unique identifier for the task");

            entity.Property(e => e.Title)
                .HasColumnType("varchar(50)")
                .IsRequired()
                .HasComment("Short title of the task (max 50 characters)");

            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasComment("Detailed description of the task (optional)");

            entity.Property(e => e.Status)
                .HasConversion<int>() 
                .HasComment("Current status of the task (enum: 1=Pending, 2=Completed)");

            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp")
                .HasComment("Date and time when the task was created");

            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp")
                .HasComment("Date and time when the task was last updated");
        });

    }
}