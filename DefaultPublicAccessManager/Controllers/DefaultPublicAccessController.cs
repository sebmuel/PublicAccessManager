using DefaultPublicAccessManager.Extensions;
using DefaultPublicAccessManager.Interfaces;
using DefaultPublicAccessManager.Models.Responses;
using DefaultPublicAccessManager.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;

namespace DefaultPublicAccessManager.Controllers;

[VersionedApiBackOfficeRoute("document/public-access")]
[ApiExplorerSettings(GroupName = "Document")]
public class DefaultPublicAccessController : ManagementApiControllerBase
{
    private readonly IDefaultPublicAccessService _accessService;

    public DefaultPublicAccessController(IDefaultPublicAccessService accessService)
    {
        _accessService = accessService;
    }

    [HttpGet("defaultPages")]
    [ProducesResponseType(typeof(GetDefaultPagesResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    public IResult GetDefaultPages()
    {
        var result = _accessService.GetDefaultPages();
        return result.Match(Results.Ok, CustomResults.Problem);
    }
}