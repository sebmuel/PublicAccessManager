using DefaultPublicAccessManager.Interfaces;
using DefaultPublicAccessManager.Models;
using DefaultPublicAccessManager.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace DefaultPublicAccessManager;

public class DefaultPublicAccessComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddTransient<IDefaultPublicAccessService, DefaultPublicAccessService>();
        builder.Services.AddOptions<DefaultPublicAccessPageSettings>()
            .BindConfiguration(DefaultPublicAccessPageSettings.Key);
    }
}