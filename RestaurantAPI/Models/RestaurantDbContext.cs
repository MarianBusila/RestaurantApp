using Microsoft.EntityFrameworkCore;

namespace RestaurantAPI.Models
{
    public class RestaurantDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<OrderMaster> OrderMasters { get; set; }

        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options): base(options)
        {
            
        }
    }
}
