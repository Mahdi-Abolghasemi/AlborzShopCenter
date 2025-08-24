using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IOrderDetailsService<T> where T : class
    {
        bool Insert(IEnumerable<T> entity);
        bool Update(IEnumerable<T> entity);
        bool Delete(int orderId);
    }
}
