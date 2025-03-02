using Microsoft.Extensions.Options;
using PublicAccessManager.Backoffice.Errors;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models;
using PublicAccessManager.Backoffice.Models.Responses;
using Shared;

namespace PublicAccessManager.Backoffice.Services;

public class DefaultPublicAccessService : IDefaultPublicAccessService
{
    private readonly IOptions<DefaultPublicAccessPageSettings> _options;

    public DefaultPublicAccessService(IOptions<DefaultPublicAccessPageSettings> options)
    {
        _options = options;
    }

    public Result<GetDefaultPagesResponse> GetDefaultPages()
    {
        var setting = _options.Value;

        if (!setting.ErrorPageKey.HasValue || !setting.LoginPageKey.HasValue)
        {
            return Result<GetDefaultPagesResponse>.ValidationFailure(DefaultPageConfigErrors.NotFound);
        }

        return new GetDefaultPagesResponse(setting.ErrorPageKey.Value, setting.LoginPageKey.Value);
    }
}