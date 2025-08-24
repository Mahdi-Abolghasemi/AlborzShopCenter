using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;

namespace Repository.IRepository.BaseInfo
{
    public interface ISettingsRepository<T> where T : SettingsModel
    {
        T GetAll();
        Task<bool> Insert(T entity);
        Task<bool> Update(T entity);
    }
}
