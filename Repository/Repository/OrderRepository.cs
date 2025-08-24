using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository;
using Domain.Models;
using Domain.Data;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Domain.Enumeration;

namespace Repository.Repository
{
    public class OrderRepository<T> : IOrderRepository<T> where T : OrderModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public OrderRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var data = entities.Include(a => a.ApplicationUser).Include(c => c.City).ThenInclude(c => c.Country).Include(o => o.OrderDetails).ThenInclude(p => p.Product).Include(t => t.TimeSending);
            var orders = from c in data
                         where c.Deleted == false
                         select c;

            return orders;
        }

        public IEnumerable<T> Search(OrderSearchDto conditions)
        {
            var data = entities.Include(a => a.ApplicationUser).Include(c => c.City).ThenInclude(c => c.Country).Include(o => o.OrderDetails).ThenInclude(p => p.Product).Include(t => t.TimeSending).Where(item => item.Deleted == false);

            if (!string.IsNullOrEmpty(conditions.OrderNumber))
            {
                data = data.Where(item => item.OrderNumber == conditions.OrderNumber);
            }

            if (conditions.Status > -1)
            {
                data = data.Where(item => item.Status == conditions.Status);
            }

            if (!string.IsNullOrEmpty(conditions.OrderDate))
            {
                data = data.Where(item => item.OrderDate == Convert.ToDateTime(conditions.OrderDate));
            }

            if (!string.IsNullOrEmpty(conditions.DeliveryDate))
            {
                data = data.Where(item => item.DeliveryDate == Convert.ToDateTime(conditions.DeliveryDate));
            }

            if (conditions.TimeSendingId > -1)
            {
                data = data.Where(item => item.TimeSendingId == conditions.TimeSendingId);
            }

            return data.ToList();
        }

        public async Task<int> Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                entity.OrderNumber = DateTime.Today.Month + new Random().Next(10 * 10 * 10, 100 * 100 * 100).ToString() + DateTime.Today.Day;

                entities.Add(entity);
                await _applicationDbContext.SaveChangesAsync();
                return entities.OrderByDescending(o => o.Id).FirstOrDefault().Id;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public async Task<bool> Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                entities.Update(entity);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var order = entities.Find(id);
            if (order == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                order.Deleted = true;
                entities.Update(order);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public string GetOrderNumber(int id)
        {
            var orderNumber = from c in entities
                                 where c.Deleted == false && c.Id == id
                                 select c.OrderNumber;

            return orderNumber.FirstOrDefault().ToString();
        }

        public int GetNumberOfOrders(SearchDeliveryDateDto deliveryDate)
        {
            var order = from c in entities
                              where c.Deleted == false && c.Status == deliveryDate.Status && 
                              c.DeliveryDate >= Convert.ToDateTime(deliveryDate.DeliveryDateOf) && 
                              c.DeliveryDate <= Convert.ToDateTime(deliveryDate.DeliveryDateTo)
                              select c;

            return order.Count();
        }

        public IEnumerable<T> MyOrders(string userId)
        {
            var data = entities.Include(a => a.ApplicationUser).Include(c => c.City).ThenInclude(c => c.Country).Include(o => o.OrderDetails).ThenInclude(p => p.Product).Include(t => t.TimeSending).Where(item => item.Deleted == false);
            var orders = from order in data
                         where order.ClientId.Contains(userId)
                         select order;

             return orders.ToList();
        }

        public async Task<bool> Cancellation(int orderId)
        {
            var order = entities.Find(orderId);
            if (order == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                order.Status = Convert.ToInt32(StatusOrderEnum.Cancellation);
                entities.Update(order);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
