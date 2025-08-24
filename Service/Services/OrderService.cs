using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices;
using Domain.Models;
using Domain.Dto;
using Repository.IRepository;
using Microsoft.EntityFrameworkCore;


namespace Service.Services
{
    public class OrderService : IOrderService<OrderModel>
    {
        private readonly IOrderRepository<OrderModel> _orderRepository;

        public OrderService(IOrderRepository<OrderModel> orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public IEnumerable<OrderModel> GetAll()
        {
            return _orderRepository.GetAll();
        }

        public IEnumerable<OrderModel> Search(OrderSearchDto input)
        {
            return _orderRepository.Search(input);
        }

        public int Insert(OrderModel order)
        {
            return _orderRepository.Insert(order).Result;
        }

        public bool Update(OrderModel order)
        {
            try
            {
                return _orderRepository.Update(order).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _orderRepository.Delete(id).Result;//*********
        }

        public string GetOrderNumber(int id)
        {
            return _orderRepository.GetOrderNumber(id);
        }

        public int GetNumberOfOrders(SearchDeliveryDateDto deliveryDate)
        {
            return _orderRepository.GetNumberOfOrders(deliveryDate);
        }

        public IEnumerable<OrderModel> MyOrders(string userId)
        {
            return _orderRepository.MyOrders(userId);
        }

        public bool Cancellation(int orderId)
        {
            return _orderRepository.Cancellation(orderId).Result;
        }

        public string EmailPreparation(OrderDto order, string orderNumber)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            path = string.Concat(path, @"\ClientApp\build\");

            StringBuilder messageBuilder = new StringBuilder();
            byte[] imageArray;
            string base64ImageRepresentation;

            messageBuilder.Append($"<html><head><style>.padding_details" + "{" + "padding-left:5%;" + "}");
            messageBuilder.Append($" .hr_color" + "{" + "border-color:red;" + "}");
            messageBuilder.Append($" .align_item" + "{" + "display:flex;align-items:center;padding-top:2%;" + "}");
            messageBuilder.Append($"</style></head><body><div>");

            messageBuilder.Append($"<h3>Dear {order.ClientName}</h3>");
            messageBuilder.Append($"<p>We hope you have a pleasant shopping experience.</p>");
            messageBuilder.Append($"<p><h3>Your purchase receipt for the order {orderNumber}</h3>");
            messageBuilder.Append($"Order data: {order.OrderDate} - Delivery date:{order.DeliveryDate} - ");
            messageBuilder.Append($"Delivery time:{order.DeliveryTime}</p><hr>");
            messageBuilder.Append($"<p>Receiver addres: {order.ReceiverAddress} {order.CityName} {order.CountryName}<br>");
            messageBuilder.Append($"Postal code: {order.PostalCode}</p>");

            messageBuilder.Append($"<div class='padding_details'>");
            messageBuilder.Append($"<h3>Order details</h3>");
            messageBuilder.Append($"<hr class='hr_color'><br>");

            foreach (var item in order.OrderDetails)
            {
                imageArray = System.IO.File.ReadAllBytes(string.Concat(path, item.ProductImagePath));
                base64ImageRepresentation = Convert.ToBase64String(imageArray);
                messageBuilder.Append($"<img src=data:image/jpeg;base64,{base64ImageRepresentation} width='100' height='100'>");
                messageBuilder.Append($"<p><h3>{item.ProductTitle}</h3>");
                messageBuilder.Append($"Quantity: {item.Number}<br>");

                if (!string.IsNullOrEmpty(item.Size.Size))
                {
                    messageBuilder.Append($"Size: {item.Size.Size}<br>");
                }

                messageBuilder.Append($"<div class='align_item'>Color: <label style='background-color:{item.Color.Color}; width:6px; height:6px; padding:5px 6px;border-radius:100px;font-size:8px;text-align:center;display: inline-block;margin: 0 0 0 0.5em;cursor: pointer;'/></div><br>");
                messageBuilder.Append($"$ {item.Price}<br></p><hr>");
            }

            messageBuilder.Append($"</div><br>");
            messageBuilder.Append($"<h3>Amount Of Orders: $ {order.AmountOfOrders}</h3>");
            messageBuilder.Append($"<h3>Shipping Cost: $ {order.ShippingCost}</h3>");
            messageBuilder.Append($"<h3>Total: $ {order.TotalAmount}</h3>");
            messageBuilder.Append($"</div></body></html>");

            return messageBuilder.ToString();
        }
    }
}
