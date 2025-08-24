using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.BaseInfo;

namespace Service.IServices.BaseInfo
{
    public interface IGroupService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Search(GroupDto input);
        bool Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
    }
}
