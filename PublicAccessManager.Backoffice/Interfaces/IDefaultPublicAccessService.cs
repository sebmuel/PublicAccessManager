using PublicAccessManager.Backoffice.Models.Requests;
using PublicAccessManager.Backoffice.Models.Responses;
using Shared;

namespace PublicAccessManager.Backoffice.Interfaces;

public interface IDefaultPublicAccessService
{
    Task<Result<GetDefaultPagesResponse>> GetDefaultPages(CancellationToken token);
    Task<Result> CreateDefaultPages(SetDefaultPagesRequest request, CancellationToken token);
    Task<Result> UpdateDefaultPages(SetDefaultPagesRequest request, CancellationToken token);
    Task<Result> DeleteDefaultPages(Guid id, CancellationToken token);
}