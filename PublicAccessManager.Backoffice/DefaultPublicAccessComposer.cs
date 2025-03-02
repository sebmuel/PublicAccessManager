using PublicAccessManager.Backoffice.Context;
using PublicAccessManager.Backoffice.NotificationHandler;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace PublicAccessManager.Backoffice;

public class DefaultPublicAccessComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddUmbracoDbContext<DefaultPublicAccessContext>((provider, optionsBuilder) =>
        {
            optionsBuilder.UseUmbracoDatabaseProvider(provider);
        });

        builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, MigrateTable>();
    }
}