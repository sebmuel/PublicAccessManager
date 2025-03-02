using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PublicAccessManager.Backoffice.Context;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.NotificationHandler;
using PublicAccessManager.Backoffice.Repository;
using PublicAccessManager.Backoffice.Services;
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


        builder.Services.AddValidatorsFromAssembly(typeof(DefaultPublicAccessComposer).Assembly,
            includeInternalTypes: true);

        builder.Services.AddTransient<IDefaultPublicAccessService, DefaultPublicAccessService>();
        builder.Services.AddTransient<IDefaultPageConfigRepository, DefaultPageConfigRepository>();
        builder.Services.AddTransient<IUnitOfWork>(sp => sp.GetRequiredService<DefaultPublicAccessContext>());
    }
}