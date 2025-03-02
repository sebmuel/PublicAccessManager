using DefaultPublicAccessManager.Common;
using DefaultPublicAccessManager.Models.Responses;

namespace DefaultPublicAccessManager.Interfaces;

public interface IDefaultPublicAccessService
{
    Result<GetDefaultPagesResponse> GetDefaultPages();
}