using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;

namespace Repository.IRepository.BaseInfo
{
    public interface ICityRepository<T> where T : CityModel
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Search(SearchCityDto conditions);
        Task<bool> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(int id);
    }
}
