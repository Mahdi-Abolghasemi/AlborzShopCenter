using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repository.BaseInfo
{
    public class SettingsRepository<T> : ISettingsRepository<T> where T : SettingsModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public SettingsRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public T GetAll()
        {
            var setting = from c in entities
                          select c;

            return setting.FirstOrDefault();
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
    }
}
