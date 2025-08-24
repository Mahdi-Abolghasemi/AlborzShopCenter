using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;

namespace Repository.IRepository
{
    public interface IOrderRepository<T> where T : OrderModel
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Search(OrderSearchDto conditions);
        Task<int> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(int id);
        string GetOrderNumber(int id);
        int GetNumberOfOrders(SearchDeliveryDateDto deliveryDate);
        IEnumerable<T> MyOrders(string userId);
        Task<bool> Cancellation(int orderId);
    }
}
