using Microsoft.EntityFrameworkCore;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models.Entities;

namespace PublicAccessManager.Backoffice.Context;

internal class DefaultPublicAccessContext : DbContext, IUnitOfWork
{
    public DbSet<DefaultPageConfig> DefaultPageConfigs { get; init; }

    public DefaultPublicAccessContext(DbContextOptions<DefaultPublicAccessContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DefaultPublicAccessContext).Assembly);
    }
}