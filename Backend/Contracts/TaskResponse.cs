
namespace Backend.Contracts;

public record TaskResponse(
    Guid Id,
    string Title,
    string? Description,
    string? Status);