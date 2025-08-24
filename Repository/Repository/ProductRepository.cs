using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository;
using Domain.Models;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Domain.Data;

namespace Repository.Repository
{
    public class ProductRepository<T> : IProductRepository<T> where T : ProductModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public ProductRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var data = entities.Include(c => c.Brand).Include(c => c.Shop).Include(g => g.Group);
            var products = from p in data
                         where p.Deleted == false
                         select p;

            return products;
        }

        public IEnumerable<T> Get(int productId)
        {
            var data = entities.Include(c => c.Brand).Include(c => c.Shop).Include(g => g.Group).Where(item => item.Deleted == false);
            var product = from p in data
                          where p.Id == productId
                          select p;

            return product;
        }

        public IEnumerable<T> Search(string input)
        {
            var data = entities.Include(c => c.Brand).Include(c => c.Shop).Include(g => g.Group).Where(item => item.Deleted == false);
            var products = from p in data
                           where (p.Name.ToLower() + " " + p.Model.ToLower()).Contains(input.ToLower())
                           select p;

            return products;
        }

        public IEnumerable<T> Search(ProductSearchDto conditions)
        {
            var data = entities.Include(c => c.Brand).Include(c => c.Shop).Include(g => g.Group).Where(item => item.Deleted == false);

            if (!string.IsNullOrEmpty(conditions.Name))
            {
                data = data.Where(item => item.Name.ToLower().Contains(conditions.Name.ToLower()));
            }

            if (!string.IsNullOrEmpty(conditions.Model))
            {
                data = data.Where(item => item.Model.ToLower().Contains(conditions.Model.ToLower()));
            }

            if (conditions.Active > -1)
            {
                data = data.Where(item => item.Active == Convert.ToBoolean(conditions.Active));
            }

            if (conditions.BrandId > -1)
            {
                data = data.Where(item => item.BrandId == conditions.BrandId);
            }

            if (conditions.ShopId > -1)
            {
                data = data.Where(item => item.ShopId == conditions.ShopId);
            }

            if (conditions.GroupId > -1)
            {
                data = data.Where(item => item.GroupId == conditions.GroupId);
            }

            return data.ToList();
        }

        public async Task<bool> Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                entities.Add(entity);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                entities.Update(entity);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var product = entities.Find(id);
            if (product == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                product.Deleted = true;
                entities.Update(product);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void MinusNumber(int productId, int number, string colorId, string sizeId)
        {
            var product = entities.Find(productId);
            if (product != null)
            {
                List<ProductColorDto> colors = null;
                System.IO.MemoryStream msColor = new System.IO.MemoryStream(Encoding.UTF8.GetBytes(product.Colors));
                System.Runtime.Serialization.Json.DataContractJsonSerializer serColor = new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(List<ProductColorDto>));
                colors = serColor.ReadObject(msColor) as List<ProductColorDto>;
                msColor.Close();

                if(product.HasSize)
                {
                    List<ProductSizeDto> sizes = null;
                    System.IO.MemoryStream msSize = new System.IO.MemoryStream(Encoding.UTF8.GetBytes(product.Sizes));
                    System.Runtime.Serialization.Json.DataContractJsonSerializer serSize = new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(List<ProductSizeDto>));
                    sizes = serSize.ReadObject(msSize) as List<ProductSizeDto>;
                    msSize.Close();

                    foreach (var item in sizes)
                    {
                        if (item.Id == sizeId)
                        {
                            item.Inventory = item.Inventory - number;
                            product.Sizes = Newtonsoft.Json.JsonConvert.SerializeObject(sizes);
                        }
                    }
                }

                foreach(var item in colors)
                {
                    if (item.Id == colorId)
                    {
                        item.Inventory = item.Inventory - number;
                        product.Colors = Newtonsoft.Json.JsonConvert.SerializeObject(colors);
                    }
                }

                product.TotalInventory = product.TotalInventory - number; 
                entities.Update(product);
                _applicationDbContext.SaveChanges();
            }
        }
    }
}
