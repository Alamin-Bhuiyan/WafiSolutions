using Backend.Models.Enums;

namespace Backend.Models;

public class TaskEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public Status Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}