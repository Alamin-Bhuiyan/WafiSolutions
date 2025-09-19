using Backend.Contracts;
using Backend.Features.TaskTrackerCommandHandler;
using Mapster;
using MediatR;

namespace Backend.Features.TaskTrackerEndpoints;

public class CreateTaskMutation(IMediator mediator)
{
    public async Task<TaskResponse> CreateTask(TaskRequest request)
    {
        // Map request to command
        var command = request.Adapt<CreateTaskCommand>();

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