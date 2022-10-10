using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<User> options)
            : base(options)
        {
        }

        public DbSet<User> TodoItems { get; set; }
    }
}