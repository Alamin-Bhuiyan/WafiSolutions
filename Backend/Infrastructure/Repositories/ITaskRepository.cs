using Backend.Models;

namespace Backend.Infrastructure.Repositories;

public interface ITaskRepository
{
    Task<TaskEntity>AddAsync(TaskEntity taskEntity, CancellationToken cancellationToken);
    Task<List<TaskEntity>> GetAllAsync(CancellationToken cancellationToken);
    Task<TaskEntity> UpdateAsync(TaskEntity taskEntity, CancellationToken cancellationToken);
    Task<TaskEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}