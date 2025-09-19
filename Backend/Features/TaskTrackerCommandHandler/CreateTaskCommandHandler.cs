using Backend.Infrastructure.Repositories;
using Backend.Models;
using Backend.Models.Enums;
using ErrorOr;
using FluentValidation;
using MediatR;

namespace Backend.Features.TaskTrackerCommandHandler;

public record CreateTaskCommand(string Title, string? Description) : IRequest<ErrorOr<TaskEntity>>;

public class CreateTaskCommandValidator : AbstractValidator<CreateTaskCommand>
{
    public CreateTaskCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(100).WithMessage("Title cannot exceed 100 characters.");

        RuleFor(x => x.Description)
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters.");
    }
}

public class CreateTaskCommandHandler(ITaskRepository taskRepository) : IRequestHandler<CreateTaskCommand, ErrorOr<TaskEntity>>
{
    public async Task<ErrorOr<TaskEntity>> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new TaskEntity
        {
            Title = request.Title,
            Description = request.Description,
            Status = Status.Pending,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
        };

        await taskRepository.AddAsync(task, cancellationToken);
        return task;
    }
}