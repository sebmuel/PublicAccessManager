namespace DefaultPublicAccessManager.Models.Requests;

public class SetDefaultPagesRequest
{
    public Guid ErrorPageId { get; init; }
    public Guid LoginPageId { get; init; }
}