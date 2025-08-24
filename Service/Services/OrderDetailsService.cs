using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices;
using Domain.Models;
using Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Service.Services
{
    public class OrderDetailsService : IOrderDetailsService<OrderDetailsModel>
    {
        private readonly IOrderDetailsRepository<OrderDetailsModel> _orderDetailsRepository;

        public OrderDetailsService(IOrderDetailsRepository<OrderDetailsModel> orderDetailsRepository)
        {
            _orderDetailsRepository = orderDetailsRepository;
        }

        public bool Insert(IEnumerable<OrderDetailsModel> orderDetails)
        {
            return _orderDetailsRepository.Insert(orderDetails).Result;
        }

        public bool Update(IEnumerable<OrderDetailsModel> orderDetails)
        {
            return _orderDetailsRepository.Update(orderDetails).Result;
        }

        public bool Delete(int orderId)
        {
            return _orderDetailsRepository.Delete(orderId).Result;//*********
        }
    }
}
