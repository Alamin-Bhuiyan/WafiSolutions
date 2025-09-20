using Backend.BuildingBlocks.Exceptions;
using Backend.Infrastructure.Repositories;
using Backend.Models;
using Backend.Models.Enums;
using ErrorOr;
using FluentValidation;
using MediatR;

namespace Backend.Features.TaskTrackerCommandHandler;

public record UpdateTaskCommand(Guid Id, Status Status) : IRequest<ErrorOr<TaskEntity>>;

public class UpdateTaskCommandValidator : AbstractValidator<UpdateTaskCommand>
{
    public UpdateTaskCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Id is required.");

        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("Status must be valid");
    }
}

public class UpdateTaskCommandHandler(ITaskRepository taskRepository) : IRequestHandler<UpdateTaskCommand, ErrorOr<TaskEntity>>
{
    public async Task<ErrorOr<TaskEntity>> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
    {
        var taskEntity = await taskRepository.GetByIdAsync(request.Id, cancellationToken);
        if (taskEntity == null)
            throw new NotFoundException(nameof(TaskEntity), request.Id);

        
        taskEntity.Status = request.Status;
        taskEntity.UpdatedAt = DateTime.Now;
        
        await taskRepository.UpdateAsync(taskEntity, cancellationToken);
        return taskEntity;
    }
}