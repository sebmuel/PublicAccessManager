using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PublicAccessManager.Backoffice.Context;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace PublicAccessManager.Backoffice.NotificationHandler;

public class MigrateTable : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
{
    private readonly DefaultPublicAccessContext _context;
    private readonly ILogger<MigrateTable> _logger;

    public MigrateTable(DefaultPublicAccessContext context, ILogger<MigrateTable> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task HandleAsync(UmbracoApplicationStartedNotification notification,
        CancellationToken cancellationToken)
    {
        var migrations = await _context.Database.GetPendingMigrationsAsync(cancellationToken);

        if (migrations.Any())
        {
            _logger.LogInformation("Apply migrations to database for PublicAccessManager.Backoffice");
            await _context.Database.MigrateAsync(cancellationToken);
        }
    }
}