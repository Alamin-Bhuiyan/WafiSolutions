using Backend.Contracts;
using Backend.Features.TaskTrackerCommandHandler;
using Mapster;
using MediatR;

public class GetTasksQuery
{
    public async Task<List<TaskResponse>> GetTaskList([Service] IMediator mediator)
    {
        var query = new GetTaskQuery();
        var result = await mediator.Send(query);

        if (result.IsError)
        {
            throw new GraphQLException(
                result.Errors.Select(e => new Error(e.Description))
            );
        }

        return result.Value
            .Select(src => new TaskResponse(
                src.Id, src.Title, src.Description, Enum.GetName(src.Status)))
            .ToList();
    }
}
