using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PublicAccessManager.Backoffice.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "PublicAccessManager.Backoffice")]
    public class PublicAccessManagerBackofficeApiController : PublicAccessManagerBackofficeApiControllerBase
    {
        [HttpGet("ping")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string Ping() => "Pong";
    }
}