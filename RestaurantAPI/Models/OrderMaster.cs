using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantAPI.Models
{
    public class OrderMaster
    {
        [Key]
        public long OrderMasterId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string OrderNumber { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PaymentMethod { get; set; }

        public decimal Total { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }

        [NotMapped]
        public string DeletedOrderItemIds { get; set; }

    }
}
