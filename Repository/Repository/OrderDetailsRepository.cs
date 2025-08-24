using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Domain.Data;

namespace Repository.Repository
{
    public class OrderDetailsRepository<T> : IOrderDetailsRepository<T> where T : OrderDetailsModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public OrderDetailsRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        /*public IEnumerable<T> Get(int orderId)
        {
            var data = entities.Include(o => o.Order);//.Include(p => p.Product);
            var orderDetails = from c in data
                               where c.Deleted == false && c.OrderId == orderId
                               select c;

            return orderDetails;
        }*/

        public async Task<bool> Insert(IEnumerable<T> entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach(var item in entity)
                {
                    entities.Add(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Update(IEnumerable<T> entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach(var item in entity)
                {
                    entities.Update(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int orderId)
        {
            var orderDetails = from od in entities
                               where od.Deleted == false && od.OrderId == orderId
                               select od;

            if (orderDetails == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach(var item in orderDetails)
                {
                    item.Deleted = true;
                    entities.Update(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
