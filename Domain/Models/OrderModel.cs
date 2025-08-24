using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.BaseInfo;

namespace Domain.Models
{
    [Table("Orders")]
    public class OrderModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey(nameof(Domain.Models.ApplicationUser))]
        public string? ClientId { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public decimal AmountOfOrders { get; set; }
        [Required]
        public string ReceiverAddress { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [ForeignKey(nameof(CityModel))]
        public int? CityId { get; set; }
        [Required]
        public DateTime DeliveryDate { get; set; }
        [ForeignKey(nameof(TimeSendingModel))]
        public int? TimeSendingId { get; set; }
        [Required]
        public decimal ShippingCost { get; set; }
        [Required]
        public decimal TotalAmount { get; set; }
        [Required]
        public string OrderNumber { get; set; }
        public string PaymentDetails { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual CityModel City { get; set; }
        public virtual IEnumerable<OrderDetailsModel> OrderDetails { get; set; }
        public virtual TimeSendingModel TimeSending { get; set; }
    }
}
