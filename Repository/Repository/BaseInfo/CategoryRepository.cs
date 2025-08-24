using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;
using Domain.Data;

namespace Repository.Repository.BaseInfo
{
    public class CategoryRepository<T> : ICategoryRepository<T> where T : CategoryModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public CategoryRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var Category = from c in entities
                        where c.Deleted == false
                        select c;

            return Category;
        }

        public IEnumerable<T> Search(SearchCategoryDto conditions)
        {
            var data = entities.Where(item => item.Deleted == false);

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
            var category = entities.Find(id);
            if (category == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                category.Deleted = true;
                entities.Update(category);
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
