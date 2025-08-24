using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.Advertising;

namespace Repository.IRepository.Advertising
{
    public interface IAdverCategoriesAndFeaturesRepository<T> where T : AdverCategoriesAndFeaturesModel
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(int id);
        Task<int> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(int id);
    }
}
