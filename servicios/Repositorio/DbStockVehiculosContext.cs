using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace servicios.Repositorio
{
    public partial class DbStockVehiculosContext : DbContext
    {
        // public DbStockVehiculosContext()
        // {
        // }

        public DbStockVehiculosContext(DbContextOptions<DbStockVehiculosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Anio> Anio { get; set; }
        public virtual DbSet<Marca> Marca { get; set; }
        public virtual DbSet<Modelo> Modelo { get; set; }
        public virtual DbSet<VehiculosStock> VehiculosStock { get; set; }
        public virtual DbSet<Version> Version { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Anio>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("smallint(6)");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<Modelo>(entity =>
            {
                entity.HasIndex(e => e.IdAnio)
                    .HasName("Modelo_FK_1");

                entity.HasIndex(e => e.IdMarca)
                    .HasName("Modelo_FK");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdAnio)
                    .HasColumnName("idAnio")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdMarca)
                    .HasColumnName("idMarca")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.IdAnioNavigation)
                    .WithMany(p => p.Modelo)
                    .HasForeignKey(d => d.IdAnio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Modelo_FK_1");

                entity.HasOne(d => d.IdMarcaNavigation)
                    .WithMany(p => p.Modelo)
                    .HasForeignKey(d => d.IdMarca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Modelo_FK");
            });

            modelBuilder.Entity<VehiculosStock>(entity =>
            {
                entity.HasIndex(e => e.IdVersion)
                    .HasName("VehiculosStock_FK");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Comentarios)
                    .HasColumnName("comentarios")
                    .HasColumnType("varchar(8000)");

                entity.Property(e => e.IdVersion)
                    .HasColumnName("idVersion")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdVersionNavigation)
                    .WithMany(p => p.VehiculosStock)
                    .HasForeignKey(d => d.IdVersion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("VehiculosStock_FK");
            });

            modelBuilder.Entity<Version>(entity =>
            {
                entity.HasIndex(e => e.IdModelo)
                    .HasName("Version_FK");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdModelo)
                    .HasColumnName("idModelo")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.IdModeloNavigation)
                    .WithMany(p => p.Version)
                    .HasForeignKey(d => d.IdModelo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Version_FK");
            });
        }
    }
}
