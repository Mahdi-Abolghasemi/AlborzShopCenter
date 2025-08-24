using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;

namespace Service.IServices
{
    public interface IApplicationUserService<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(string userId);
        IEnumerable<T> Search(ApplicationUserSearchDto input);
        bool Insert(T entity, int role, string password);
        bool Update(T entity);
        bool ChangePassword(T entity, string newPassword);
    }
}
