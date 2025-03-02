using Microsoft.Extensions.DependencyInjection;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models;
using PublicAccessManager.Backoffice.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace PublicAccessManager.Backoffice;

public class DefaultPublicAccessComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddTransient<IDefaultPublicAccessService, DefaultPublicAccessService>();
        builder.Services.AddOptions<DefaultPublicAccessPageSettings>()
            .BindConfiguration(DefaultPublicAccessPageSettings.Key);
    }
}