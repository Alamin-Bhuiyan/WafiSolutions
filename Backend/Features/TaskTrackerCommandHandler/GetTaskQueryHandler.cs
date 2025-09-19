using Backend.Infrastructure.Repositories;
using Backend.Models;
using ErrorOr;
using FluentValidation;
using MediatR;

namespace Backend.Features.TaskTrackerCommandHandler;

public record GetTaskQuery() : IRequest<ErrorOr<List<TaskEntity>>>;

public class GetTaskQueryValidator : AbstractValidator<GetTaskQuery>
{
    public GetTaskQueryValidator()
    {
    }
}

public class GetTaskQueryHandler(ITaskRepository taskRepository)
    : IRequestHandler<GetTaskQuery, ErrorOr<List<TaskEntity>>>
{
    public async Task<ErrorOr<List<TaskEntity>>> Handle(GetTaskQuery request, CancellationToken cancellationToken)
    {
        return await taskRepository.GetAllAsync(cancellationToken);
    }
}