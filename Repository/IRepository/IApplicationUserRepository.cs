using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;

namespace Repository.IRepository
{
    public interface IApplicationUserRepository<T> where T : ApplicationUser
    {
        IEnumerable<T> GetAll();
        T Get(string userId);
        IEnumerable<T> Search(ApplicationUserSearchDto conditions);
        Task<bool> Insert(T entity, int role, string password);
        Task<bool> Update(T entity);
        Task<bool> ChangePassword(T entity, string newPassword);
    }
}
