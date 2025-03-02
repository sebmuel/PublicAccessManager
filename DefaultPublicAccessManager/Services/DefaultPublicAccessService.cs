using DefaultPublicAccessManager.Common;
using DefaultPublicAccessManager.Errors;
using DefaultPublicAccessManager.Interfaces;
using DefaultPublicAccessManager.Models;
using DefaultPublicAccessManager.Models.Responses;
using Microsoft.Extensions.Options;

namespace DefaultPublicAccessManager.Services;

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