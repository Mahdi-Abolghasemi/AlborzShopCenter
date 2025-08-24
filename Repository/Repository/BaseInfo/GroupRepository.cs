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
    public class GroupRepository<T> : IGroupRepository<T> where T : GroupModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public GroupRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var groups = from c in entities.Include(c => c.Category)
                        where c.Deleted == false
                        select c;

            return groups;
        }

        public IEnumerable<T> Search(GroupDto conditions)
        {
            var data = entities.Include(c => c.Category).Where(item => item.Deleted == false);

            if (conditions.CategoryId > 0)
            {
                data = data.Where(item => item.CategoryId == conditions.CategoryId);
            }

            if (conditions.Active > -1)
            {
                data = data.Where(item => item.Active == Convert.ToBoolean(conditions.Active));
            }

            if (!string.IsNullOrEmpty(conditions.Name))
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
            var group = entities.Find(id);
            if (group == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                group.Deleted = true;
                entities.Update(group);
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
