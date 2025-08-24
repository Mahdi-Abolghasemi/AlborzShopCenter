using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.Advertising;

namespace Repository.IRepository.Advertising
{
    public interface IAdverCategoriesAndFeaturesDetailsRepository<T> where T : AdverCategoriesAndFeaturesDetailsModel
    {
        //IEnumerable<T> GetAll();
        Task<bool> Insert(IEnumerable<T> entity);
        Task<bool> Update(IEnumerable<T> entity);
        Task<bool> Delete(int id);
    }
}
