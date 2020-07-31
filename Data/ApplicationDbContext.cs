using Microsoft.EntityFrameworkCore;
using PhilipsCapstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhilipsCapstone.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<UserType> UserType { get; set; }

        public DbSet<Review> Review { get; set; }

        public DbSet<Comment> Comment { get; set; }

        public DbSet<FavoritePost> FavoritePost { get; set; }

        public DbSet<FavoriteMovie> FavoriteMovie { get; set; }
    }
}
    