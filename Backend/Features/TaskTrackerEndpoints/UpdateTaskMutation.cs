using Backend.Contracts;
using Backend.Features.TaskTrackerCommandHandler;
using Backend.Models.Enums;
using Mapster;
using MediatR;

namespace Backend.Features.TaskTrackerEndpoints;

public class UpdateTaskMutation(IMediator mediator)
{
    public async Task<TaskResponse> UpdateTask(Guid id, Status status)
    {
        // Map request to command
        var command = new UpdateTaskCommand(id, status);

        // Send command via MediatR
        var result = await mediator.Send(command);

        // Handle error
        if (result.IsError)
        {
            // Throw GraphQL-friendly error
            throw new GraphQLException(result.Errors.Select(e => new Error(e.Description)));
        }

        // Map TaskEntity to TaskResponse
        var response = result.Value.Adapt<TaskResponse>();

        return response;
    }
}