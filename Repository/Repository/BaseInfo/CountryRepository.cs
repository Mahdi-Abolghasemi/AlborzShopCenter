using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Data;
using Domain.Dto.BaseInfo;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repository.BaseInfo
{
    public class CountryRepository<T> : ICountryRepository<T> where T : CountryModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public CountryRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var countries = from c in entities
                            where c.Deleted == false
                            select c;

            return countries;
        }

        public IEnumerable<T> Search(SearchCountryDto conditions)
        {
            var data = entities.Where(item => item.Deleted == false);

            if (conditions.UseOrder > -1)
            {
                data = data.Where(item => item.UseOrder == Convert.ToBoolean(conditions.UseOrder));
            }

            if (!string.IsNullOrEmpty(conditions.Name))
            {
                data = data.Where(item => item.Name.ToLower().Contains(conditions.Name.ToLower()));
            }

            if (!string.IsNullOrEmpty(conditions.RegionCode))
            {
                data = data.Where(item => item.RegionCode.Contains(conditions.RegionCode));
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
            var country = entities.Find(id);
            if (country == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                country.Deleted = true;
                entities.Update(country);
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
