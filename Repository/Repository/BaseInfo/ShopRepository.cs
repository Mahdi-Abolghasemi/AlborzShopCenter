using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Microsoft.EntityFrameworkCore;
using Domain.Data;

namespace Repository.Repository.BaseInfo
{
    public class ShopRepository<T> : IShopRepository<T> where T : ShopModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public ShopRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var data = entities.Include(c => c.City).Include(c => c.City.Country);
            var brands = from c in data
                         where c.Deleted == false
                         select c;

            return brands;
        }

        public IEnumerable<T> Search(SearchShopDto conditions)
        {
            var data = entities.Include(c => c.City).Include(c => c.City.Country).Where(item => item.Deleted == false);

            if (conditions.Active > -1)
            {
                data = data.Where(item => item.Active == Convert.ToBoolean(conditions.Active));
            }

            if (!string.IsNullOrEmpty(conditions.Name))
            {
                data = data.Where(item => item.Name.ToLower().Contains(conditions.Name.ToLower()));
            }

            if (conditions.CityId > -1)
            {
                data = data.Where(item => item.CityId == conditions.CityId);
            }

            if (conditions.CountryId > -1)
            {
                data = data.Where(item => item.City.CountryId == conditions.CountryId);
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
            catch
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
            var brand = entities.Find(id);
            if (brand == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                brand.Deleted = true;
                entities.Update(brand);
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
