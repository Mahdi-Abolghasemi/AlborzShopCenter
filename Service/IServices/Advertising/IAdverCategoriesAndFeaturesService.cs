using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IServices.Advertising
{
    public interface IAdverCategoriesAndFeaturesService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(int id);
        int Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
    }
}
