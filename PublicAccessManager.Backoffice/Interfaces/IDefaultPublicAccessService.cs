using PublicAccessManager.Backoffice.Models.Requests;
using PublicAccessManager.Backoffice.Models.Responses;
using Shared;

namespace PublicAccessManager.Backoffice.Interfaces;

public interface IDefaultPublicAccessService
{
    Task<Result<GetDefaultPagesResponse>> GetDefaultPages();
    Task<Result> UpdateDefaultPages(SetDefaultPagesRequest request);
}