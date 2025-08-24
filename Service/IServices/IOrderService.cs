using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Service.IServices
{
    public interface IOrderService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Search(OrderSearchDto input);
        int Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
        string GetOrderNumber(int id);
        int GetNumberOfOrders(SearchDeliveryDateDto deliveryDate);
        IEnumerable<T> MyOrders(string userId);
        bool Cancellation(int orderId);
        string EmailPreparation(OrderDto order, string orderNumber);
    }
}
