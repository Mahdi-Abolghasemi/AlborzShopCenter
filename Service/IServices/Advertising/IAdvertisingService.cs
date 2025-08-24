using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Advertising;

namespace Service.IServices.Advertising
{
    public interface IAdvertisingService<T> where T : class
    {
        IEnumerable<T> GetAll();
        bool Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
        bool UploadFile(AdvertisingFileUploadDto data);
    }
}
