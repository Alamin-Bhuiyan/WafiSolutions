using Backend.Contracts;
using Backend.Features.TaskTrackerCommandHandler;
using Mapster;
using MediatR;

public class GetTasksQuery(IMediator mediator)
{
    public async Task<List<TaskResponse>> GetTaskList()
    {
        var query = new GetTaskQuery();

        var result = await mediator.Send(query);
        
        if (result.IsError)
        {
            // Throw GraphQL-friendly error
            throw new GraphQLException(result.Errors.Select(e => new Error(e.Description)));
        }
        
        var response = result.Value.Adapt<List<TaskResponse>>();
        
        return response;
    }
}