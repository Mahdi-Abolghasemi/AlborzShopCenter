using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.Advertising;

namespace Repository.IRepository.Advertising
{
    public interface IAdvertisingRepository<T> where T : AdvertisingModel
    {
        IEnumerable<T> GetAll();
        Task<bool> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(int id);
    }
}
