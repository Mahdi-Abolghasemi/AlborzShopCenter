using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;
using Domain.Models;
using Domain.Enumeration;

namespace Domain.Mapping
{
    public static class OrderMapper
    {
        public static OrderDto ToDto(this OrderModel order)
        {
            return new OrderDto
            {
                Id = order.Id,
                ClientId = order.ClientId,
                ClientName = order.ApplicationUser.UserName,
                OrderDate = order.OrderDate.ToString(),
                Deleted = Convert.ToInt32(order.Deleted),
                Status = order.Status,
                StatusTitle = Enum.GetName(typeof(StatusOrderEnum), order.Status),
                ShippingCost = order.ShippingCost,
                AmountOfOrders = order.AmountOfOrders,
                TotalAmount = order.TotalAmount,
                ReceiverAddress = order.ReceiverAddress,
                PostalCode = order.PostalCode,
                CityId = order.CityId,
                CityName = order.City.Name,
                CountryName = order.City.Country.Name,
                DeliveryDate = order.DeliveryDate.ToString(),
                TimeSendingId = order.TimeSendingId,
                DeliveryTime = order.TimeSending.Of.ToString().Substring(0, 5) + " - " + order.TimeSending.To.ToString().Substring(0, 5),
                OrderNumber = order.OrderNumber,
                PaymentDetails = OrderPaymentDetailsMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<PaymentDetailsDto>(order.PaymentDetails)),
                OrderDetails = order.OrderDetails.Contains(null) ? new List<OrderDetailsDto>() : order.OrderDetails.ToDto()
            };
        }

        public static IEnumerable<OrderDto> ToDto(this IEnumerable<OrderModel> orders)
        {
            return orders.Select(x => x.ToDto());
        }

        public static OrderDetailsDto ToDto(this OrderDetailsModel orderDetails)
        {
            if(orderDetails!=null)
            {
                return new OrderDetailsDto
                {
                    Id = orderDetails.Id,
                    OrderId = orderDetails.OrderId,
                    Deleted = Convert.ToInt32(orderDetails.Deleted),
                    Status = orderDetails.Status,
                    StatusTitle = Enum.GetName(typeof(StatusOrderDetailsEnum), orderDetails.Status),
                    ProductId = orderDetails.ProductId,
                    ProductTitle = orderDetails.Product.Name + " " + orderDetails.Product.Model,
                    ProductImagePath = "Images\\Products\\" + orderDetails.Product.FolderName + "\\" + orderDetails.Product.Images.Split(',')[0],
                    Number = orderDetails.Number,
                    Price = orderDetails.Price,
                    Color = OrderColorMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<OrderColorDto>(orderDetails.Color)),
                    Size = orderDetails.Size == null ? new OrderSizeDto() : OrderSizeMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<OrderSizeDto>(orderDetails.Size))
                };
            }
            else
            {
                return new OrderDetailsDto();
            }
        }

        public static IEnumerable<OrderDetailsDto> ToDto(this IEnumerable<OrderDetailsModel> orderDetails)
        {
            return orderDetails.Select(x => x.ToDto());
        }

        public static OrderModel ToModel(this OrderDto order)
        {
            return new OrderModel
            {
                Id = order.Id,
                ClientId = order.ClientId,
                OrderDate = Convert.ToDateTime(order.OrderDate),
                Deleted = Convert.ToBoolean(order.Deleted),
                Status = order.Status,
                AmountOfOrders = order.AmountOfOrders,
                TotalAmount = order.TotalAmount,
                ReceiverAddress = order.ReceiverAddress,
                PostalCode = order.PostalCode,
                CityId = order.CityId,
                DeliveryDate = Convert.ToDateTime(order.DeliveryDate),
                TimeSendingId = order.TimeSendingId,
                ShippingCost = order.ShippingCost,
                OrderNumber = order.OrderNumber,
                PaymentDetails = Newtonsoft.Json.JsonConvert.SerializeObject(order.PaymentDetails)
            };
        }

        public static IEnumerable<OrderDetailsModel> ToModel(this IEnumerable<OrderDetailsDto> orderDetails, int orderId)
        {
            return orderDetails.Select(x => x.ToModel(orderId));
        }

        public static OrderDetailsModel ToModel(this OrderDetailsDto orderDetails, int orderId)
        {
            return new OrderDetailsModel
            {
                Id = orderDetails.Id,
                OrderId = orderId,
                Deleted = Convert.ToBoolean(orderDetails.Deleted),
                Status = orderDetails.Status,
                ProductId = orderDetails.ProductId,
                Number = orderDetails.Number,
                Price = orderDetails.Price,
                Color = Newtonsoft.Json.JsonConvert.SerializeObject(orderDetails.Color),
                Size = Newtonsoft.Json.JsonConvert.SerializeObject(orderDetails.Size)
            };
        }
    }

    public static class OrderColorMapper
    {
        public static OrderColorDto ToDto(this OrderColorDto color)
        {
            return new OrderColorDto
            {
                Id = color.Id,
                Color = color.Color,
            };
        }
    }

    public static class OrderSizeMapper
    {
        public static OrderSizeDto ToDto(this OrderSizeDto size)
        {
            return new OrderSizeDto
            {
                Id = size.Id,
                Size = size.Size,
            };
        }
    }

    public static class OrderPaymentDetailsMapper
    {
        public static PaymentDetailsDto ToDto(this PaymentDetailsDto paymentDetails)
        {
            if (paymentDetails != null)
            {
                return new PaymentDetailsDto
                {
                    TransactionId = paymentDetails.TransactionId,
                    Intent = paymentDetails.Intent,
                    Status = paymentDetails.Status,
                    Name = paymentDetails.Name,
                    Email = paymentDetails.Email,
                    CountryCode = paymentDetails.CountryCode,
                    CreateTime = paymentDetails.CreateTime
                };
            }
            else
            {
                return new PaymentDetailsDto();
            }
        }
    }
}
