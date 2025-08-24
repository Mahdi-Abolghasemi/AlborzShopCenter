using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.BaseInfo;
using Domain.Dto;
using Service.IServices;
using Service.Services;
using Service.IServices.BaseInfo;
using Domain.Mapping;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService<OrderModel> _orderService;
        private readonly IOrderDetailsService<OrderDetailsModel> _orderDetailsService;
        private readonly ITimeSendingService<TimeSendingModel> _timeSendingService;
        private readonly IProductService<ProductModel> _productService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IApplicationUserService<ApplicationUser> _applicationUserService;

        public OrderController(IOrderService<OrderModel> orderService, IOrderDetailsService<OrderDetailsModel> orderDetailsService, ITimeSendingService<TimeSendingModel> timeSendingService, IProductService<ProductModel> productServic, IEmailSenderService emailSenderService, IApplicationUserService<ApplicationUser> applicationUserService)
        {
            _orderService = orderService;
            _orderDetailsService = orderDetailsService;
            _timeSendingService = timeSendingService;
            _productService = productServic;
            _emailSenderService = emailSenderService;
            _applicationUserService = applicationUserService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<OrderDto> GetOrders()
        {
            return OrderMapper.ToDto(_orderService.GetAll()).ToList();
        }

        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<OrderDto> Search(OrderSearchDto order)
        {
            var result = _orderService.Search(order);
            return OrderMapper.ToDto(result).ToList();
        }

        [Authorize(Roles = "Admin , User , Client")]
        [HttpPost]
        [ActionName("Post")]
        public async Task<string> PostOrder(OrderDto order)
        {
            int orderId = _orderService.Insert(OrderMapper.ToModel(order));
            if (orderId != 0)
            {
                _orderDetailsService.Insert(OrderMapper.ToModel(order.OrderDetails, orderId));
                string orderNumber = _orderService.GetOrderNumber(orderId);

                foreach (var item in order.OrderDetails)
                {
                    _productService.MinusNumber(Convert.ToInt32(item.ProductId), item.Number, item.Color.Id, item.Size.Id);
                }

                var _user = _applicationUserService.Get(order.ClientId);
                order.ClientName = _user.UserName;
                var message = new Message(new string[] { _user.Email }, $"Order information {orderNumber}", _orderService.EmailPreparation(order, orderNumber));
                await _emailSenderService.SendEmailAsync(message);

                return orderNumber;
            }
            else
            {
                return "Sorry, there was an error in placing your order. Please repeat your purchase process again.";
            }
        }

        [Authorize(Roles = "Admin , User")]
        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutOrder(OrderDto order)
        {
            bool result = _orderService.Update(OrderMapper.ToModel(order));
            if (result == true)
            {
                return _orderDetailsService.Update(OrderMapper.ToModel(order.OrderDetails, order.Id));
            }
            else
            {
                return false;
            }
        }

        [Authorize(Roles = "Admin , User")]
        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteOrder(int id)
        {
            bool result = _orderService.Delete(id);
            if (result == true)
            {
                return _orderDetailsService.Delete(id);
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        [ActionName("CheckDeliveryDate")]
        public ActionResult<bool> CheckDeliveryDate(SearchDeliveryDateDto deliveryDate)
        {
            var timeSending = _timeSendingService.GetAll();
            int numberOfOrders = _orderService.GetNumberOfOrders(deliveryDate);
            int sumMaximumNumberOfOrders = 0;
            foreach (var time in timeSending)
            {
                sumMaximumNumberOfOrders += time.MaximumNumberOfOrders;
            }

            if (numberOfOrders > (sumMaximumNumberOfOrders * deliveryDate.DaysForSelect) / 2)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [Authorize(Roles = "Admin , User , Client")]
        [HttpPost]
        [ActionName("MyOrders")]
        public IEnumerable<OrderDto> MyOrders([FromForm] string userId)
        {
            var result = _orderService.MyOrders(userId);
            return OrderMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Cancellation")]
        public ActionResult<bool> CancellationOrder([FromForm] int orderId)
        {
            return _orderService.Cancellation(orderId);
        }

        [Authorize(Roles = "Admin , User , Client")]
        [HttpPost]
        [ActionName("CheckClientSystemDate")]
        public ActionResult<bool> CheckClientSystemDate([FromForm] string clientSystemDate)
        {
            if (DateTime.Today == DateTime.Parse(clientSystemDate))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
