using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Repository.IRepository
{
    public interface IUserAccessRepository<T> where T : UserAccessModel
    {
        List<int> Get(string userId);
        Task<bool> Insert(Guid userId, IEnumerable<T> entity);
    }
}
