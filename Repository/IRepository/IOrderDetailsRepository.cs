using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Repository.IRepository
{
    public interface IOrderDetailsRepository<T> where T : OrderDetailsModel
    {
        Task<bool> Insert(IEnumerable<T> entity);
        Task<bool> Update(IEnumerable<T> entity);
        Task<bool> Delete(int orderId);
    }
}
