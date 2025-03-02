using PublicAccessManager.Backoffice.Models.Entities;

namespace PublicAccessManager.Backoffice.Interfaces;

public interface IDefaultPageConfigRepository
{
    Task<DefaultPageConfig?> GetDefaultPageConfigAsync(CancellationToken token = default);
    Task CreateDefaultPageConfig(DefaultPageConfig defaultPageConfig, CancellationToken token = default);
    void DeleteDefaultPageConfig(DefaultPageConfig defaultPageConfig);
}