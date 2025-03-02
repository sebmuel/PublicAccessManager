using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PublicAccessManager.Backoffice.Models.Entities;

namespace PublicAccessManager.Backoffice.Context.Configurations;

public class DefaultPageConfigConfiguration : IEntityTypeConfiguration<DefaultPageConfig>
{
    public void Configure(EntityTypeBuilder<DefaultPageConfig> builder)
    {
        builder.ToTable("defaultPublicAccessPages");

        builder.HasKey(x => x.Id)
            .IsClustered(false);

        builder.Property(x => x.ErrorPageId)
            .IsRequired();

        builder.Property(x => x.LoginPageId)
            .IsRequired();

        builder.Property(x => x.UpdatedAtUtc)
            .IsRequired();

        builder.Property(x => x.CreatedAtUtc)
            .IsRequired();
    }
}