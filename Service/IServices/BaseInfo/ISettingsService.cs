using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IServices.BaseInfo
{
    public interface ISettingsService<T> where T : class
    {
        T GetAll();
        bool Insert(T entity);
        bool Update(T entity);
    }
}
