using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [Table("OrderDetails")]
    public class OrderDetailsModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey(nameof(OrderModel))]
        public int? OrderId { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public int Status { get; set; }
        [ForeignKey(nameof(ProductModel))]
        public int? ProductId { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public virtual OrderModel Order { get; set; }
        public virtual ProductModel Product { get; set; }
    }
}
