﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PublicAccessManager.Backoffice.Context;

#nullable disable

namespace PublicAccessManager.Backoffice.Migrations
{
    [DbContext(typeof(DefaultPublicAccessContext))]
    partial class DefaultPublicAccessContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("PublicAccessManager.Backoffice.Models.Entities.DefaultPageConfig", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAtUtc")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ErrorPageId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("LoginPageId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("UpdatedAtUtc")
                        .HasColumnType("TEXT");

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("defaultPublicAccessPages", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
