using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;

namespace Service.IServices
{
    public interface IUserAccessService<T> where T : class
    {
        List<int> Get(string userId);
        bool Insert(UserAccessDto input);
    }
}
