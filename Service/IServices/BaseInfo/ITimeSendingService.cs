using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.BaseInfo;

namespace Service.IServices.BaseInfo
{
    public interface ITimeSendingService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Search(TimeSendingSearchDto input);
        bool Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
    }
}
