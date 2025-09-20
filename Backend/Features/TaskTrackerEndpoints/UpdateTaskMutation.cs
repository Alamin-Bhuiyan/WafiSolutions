using Backend.Contracts;
using Backend.Features.TaskTrackerCommandHandler;
using Backend.Models.Enums;
using MediatR;

namespace Backend.Features.TaskTrackerEndpoints;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class UpdateTaskMutation
{
    public async Task<TaskResponse> UpdateTask(Guid id, Status status,[Service] IMediator mediator)
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
        var response = new TaskResponse(result.Value.Id, result.Value.Title, result.Value.Description,
            Enum.GetName(result.Value.Status));


        return response;
    }
}