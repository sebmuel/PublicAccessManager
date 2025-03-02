using Shared;

namespace PublicAccessManager.Backoffice.Errors;

public class DefaultPageConfigErrors
{
    public static Error NotFound => Error.NotFound("DefaultPageConfig.NotFound", "Default page config not found.");
}