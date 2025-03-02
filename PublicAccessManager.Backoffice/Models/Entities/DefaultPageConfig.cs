using Shared;

namespace PublicAccessManager.Backoffice.Models.Entities;

public class DefaultPageConfig : Entity
{
    public Guid ErrorPageId { get; private set; }
    public Guid LoginPageId { get; private set; }
    public DateTime UpdatedAtUtc { get; private set; }
    public DateTime CreatedAtUtc { get; private set; }

    private DefaultPageConfig(Guid errorPageId, Guid loginPageId, DateTime updatedAtUtc, DateTime createdAtUtc)
        : base(Guid.NewGuid())
    {
        ErrorPageId = errorPageId;
        LoginPageId = loginPageId;
        UpdatedAtUtc = updatedAtUtc;
        CreatedAtUtc = createdAtUtc;
    }

    private DefaultPageConfig()
    {
    }

    public Result Update(Guid errorPageId, Guid loginPageId)
    {
        ErrorPageId = errorPageId;
        LoginPageId = loginPageId;
        UpdatedAtUtc = DateTime.UtcNow;
        return Result.Success();
    }

    public static DefaultPageConfig Create(
        Guid errorPageId,
        Guid loginPageId
    ) => new(errorPageId, loginPageId, DateTime.UtcNow, DateTime.UtcNow);
}