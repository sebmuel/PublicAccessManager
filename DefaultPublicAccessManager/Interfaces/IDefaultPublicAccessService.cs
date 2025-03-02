using DefaultPublicAccessManager.Models.Responses;
using Shared;

namespace DefaultPublicAccessManager.Interfaces;

public interface IDefaultPublicAccessService
{
    Result<GetDefaultPagesResponse> GetDefaultPages();
}