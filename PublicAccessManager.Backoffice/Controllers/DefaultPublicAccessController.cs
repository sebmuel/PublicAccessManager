using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;

namespace PublicAccessManager.Backoffice.Controllers;

[VersionedApiBackOfficeRoute("document")]
[ApiExplorerSettings(GroupName = "Document")]
public class DefaultPublicAccessController : ManagementApiControllerBase
{
    [HttpGet("public-access/defaultPages")]
    public async Task<IResult> GetDefaultPages()
    {
        return Results.Ok();
    }
}