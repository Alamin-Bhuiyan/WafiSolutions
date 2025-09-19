using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class TaskRepository(ApplicationDbContext dbContext) : ITaskRepository
{
    public async Task<TaskEntity> AddAsync(TaskEntity taskEntity, CancellationToken cancellationToken)
    {
        var result = await dbContext.Tasks.AddAsync(taskEntity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return result.Entity;
    }

    public async Task<List<TaskEntity>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Tasks.AsNoTracking().ToListAsync(cancellationToken);
    }

    public async Task<TaskEntity> UpdateAsync(TaskEntity taskEntity, CancellationToken cancellationToken)
    {
        dbContext.Tasks.Update(taskEntity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return taskEntity;
    }

    public async Task<TaskEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await dbContext.Tasks.FindAsync([id], cancellationToken: cancellationToken);
    }
}