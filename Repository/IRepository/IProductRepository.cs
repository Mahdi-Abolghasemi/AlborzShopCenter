using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;

namespace Repository.IRepository
{
    public interface IProductRepository<T> where T : ProductModel
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(int productId);
        IEnumerable<T> Search(string input);
        IEnumerable<T> Search(ProductSearchDto conditions);
        Task<bool> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(int id);
        void MinusNumber(int productId, int number, string colorId, string sizeId);
    }
}
