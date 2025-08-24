using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Newtonsoft.Json;

namespace Domain.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string? ClientId { get; set; }
        public string ClientName { get; set; }
        public string OrderDate { get; set; }
        public int Deleted { get; set; }
        public int Status { get; set; }
        public string StatusTitle { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal AmountOfOrders { get; set; }
        public decimal TotalAmount { get; set; }
        public string ReceiverAddress { get; set; }
        public string PostalCode { get; set; }
        public int? CityId { get; set; }
        public string CityName { get; set; }
        public string CountryName { get; set; }
        public string DeliveryDate { get; set; }
        public int? TimeSendingId { get; set; }
        public string DeliveryTime { get; set; }
        public string OrderNumber { get; set; }
        public PaymentDetailsDto PaymentDetails { get; set; }
        public virtual IEnumerable<OrderDetailsDto> OrderDetails { get; set; }
    }

    public class OrderSearchDto
    {
        public string OrderNumber { get; set; }
        public int Status { get; set; }
        public string OrderDate { get; set; }
        public string DeliveryDate { get; set; }
        public int TimeSendingId { get; set; }
    }

    public class SearchDeliveryDateDto
    {
        public int Status { get; set; }
        public string DeliveryDateOf { get; set; }
        public string DeliveryDateTo { get; set; }
        public int DaysForSelect { get; set; }
    }

    public class PaymentDetailsDto
    {
        public string TransactionId { get; set; }
        public string Intent { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CountryCode { get; set; }
        public string CreateTime { get; set; }
    }
}
