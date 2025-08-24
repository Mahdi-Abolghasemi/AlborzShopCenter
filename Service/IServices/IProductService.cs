using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;

namespace Service.IServices
{
    public interface IProductService<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(int productId);
        IEnumerable<T> Search(string input);
        IEnumerable<T> Search(ProductSearchDto input);
        bool Insert(T entity);
        bool Update(T entity);
        bool Delete(int id);
        Guid UploadFile(ProductFileUploadDto data);
        void RemoveUploadFile(ProductFileUploadDto data);
        void MinusNumber(int productId, int number, string colorId, string sizeId);
    }
}
