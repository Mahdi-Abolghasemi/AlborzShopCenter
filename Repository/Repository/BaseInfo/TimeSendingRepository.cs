using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Domain.Data;
using Microsoft.EntityFrameworkCore;
using Repository.IRepository.BaseInfo;

namespace Repository.Repository.BaseInfo
{
    public class TimeSendingRepository<T> : ITimeSendingRepository<T> where T : TimeSendingModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public TimeSendingRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var timeSendings = from c in entities
                        where c.Deleted == false
                        select c;

            return timeSendings;
        }

        public IEnumerable<T> Search(TimeSendingSearchDto conditions)
        {
            var data = entities.Where(item => item.Deleted == false);


            if (!string.IsNullOrEmpty(conditions.Of))
            {
                data = data.Where(item => item.Of >= DateTime.Parse(conditions.Of).TimeOfDay);
            }

            if (!string.IsNullOrEmpty(conditions.To))
            {
                data = data.Where(item => item.To <= DateTime.Parse(conditions.To).TimeOfDay);
            }

            if (conditions.Active > -1)
            {
                data = data.Where(item => item.Active == Convert.ToBoolean(conditions.Active));
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
