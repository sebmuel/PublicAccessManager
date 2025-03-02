namespace DefaultPublicAccessManager.Models;

public class DefaultPublicAccessPageSettings
{
    public const string Key = "DefaultPublicAccess";
    public Guid? LoginPageKey { get; init; }
    public Guid? ErrorPageKey { get; init; }
}