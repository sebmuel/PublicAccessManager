using Microsoft.EntityFrameworkCore;
using PublicAccessManager.Backoffice.Context;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models.Entities;

namespace PublicAccessManager.Backoffice.Repository;

internal class DefaultPageConfigRepository : IDefaultPageConfigRepository
{
    private readonly DefaultPublicAccessContext _context;

    public DefaultPageConfigRepository(DefaultPublicAccessContext context)
    {
        _context = context;
    }

    public async Task<DefaultPageConfig?> GetDefaultPageConfigAsync(CancellationToken token)
    {
        return await _context.DefaultPageConfigs.FirstOrDefaultAsync(token);
    }

    public async Task CreateDefaultPageConfig(DefaultPageConfig defaultPageConfig, CancellationToken token)
    {
        await _context.DefaultPageConfigs.AddAsync(defaultPageConfig, token);
    }

    public void DeleteDefaultPageConfig(DefaultPageConfig defaultPageConfig)
    {
        _context.DefaultPageConfigs.Remove(defaultPageConfig);
    }
}