using Backend.Models.Enums;

namespace Backend.Contracts;

public record TaskResponse(
    Guid Id,
    string Title,
    string? Description,
    Status Status,
    DateTime CreatedAt,
    DateTime? UpdatedAt);