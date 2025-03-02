using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PublicAccessManager.Backoffice.Extensions;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models.Requests;
using PublicAccessManager.Backoffice.Models.Responses;
using PublicAccessManager.Backoffice.Validation;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;

namespace PublicAccessManager.Backoffice.Controllers;

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