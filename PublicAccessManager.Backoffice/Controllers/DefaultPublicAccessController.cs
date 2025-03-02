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
    public async Task<IResult> GetDefaultPages(CancellationToken token)
    {
        var result = await _accessService.GetDefaultPages(token);
        return result.Match(Results.Ok, CustomResults.Problem);
    }

    [HttpPost("defaultPages")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    public async Task<IResult> CreateDefaultPages(SetDefaultPagesRequest request, CancellationToken token)
    {
        var result = await _accessService.CreateDefaultPages(request, token);
        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpPut("defaultPages")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    public async Task<IResult> UpdateDefaultPages(SetDefaultPagesRequest request, CancellationToken token)
    {
        var result = await _accessService.UpdateDefaultPages(request, token);
        return result.Match(Results.NoContent, CustomResults.Problem);
    }

    [HttpDelete("{id:guid}/defaultPages")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    public async Task<IResult> DeleteDefaultPages(Guid id, CancellationToken token)
    {
        var result = await _accessService.DeleteDefaultPages(id, token);
        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}