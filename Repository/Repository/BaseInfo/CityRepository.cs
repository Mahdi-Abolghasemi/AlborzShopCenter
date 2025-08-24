using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Dto.BaseInfo;

namespace Repository.Repository.BaseInfo
{
    public class CityRepository<T> : ICityRepository<T> where T : CityModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public CityRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var data = entities.Include(c => c.Country);
            var citys = from c in data
                        where c.Deleted == false
                        select c;

            return citys;
        }

        public IEnumerable<T> Search(SearchCityDto conditions)
        {
            var data = entities.Include(c => c.Country).Where(item => item.Deleted == false);

            if (conditions.CountryId > 0)
            {
                data = data.Where(item => item.CountryId == conditions.CountryId);
            }

            if(conditions.UseOrder>-1)
            {
                data = data.Where(item => item.UseOrder == Convert.ToBoolean(conditions.UseOrder));
            }

            if(!string.IsNullOrEmpty(conditions.Name))
            {
                data = data.Where(item => item.Name.ToLower().Contains(conditions.Name.ToLower()));
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
            var city = entities.Find(id);
            if (city == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                city.Deleted = true;
                entities.Update(city);
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
