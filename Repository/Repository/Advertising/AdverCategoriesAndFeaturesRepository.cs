using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository.Advertising;
using Domain.Models.Advertising;
using Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repository.Advertising
{
    public class AdverCategoriesAndFeaturesRepository<T> : IAdverCategoriesAndFeaturesRepository<T> where T : AdverCategoriesAndFeaturesModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public AdverCategoriesAndFeaturesRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var adverCategoriesAndFeatures = from ad in entities.Include(a => a.AdverCategoriesAndFeaturesDetails.Where(aa => aa.Deleted == false)).ThenInclude(g => g.Group)
                                             where ad.Deleted == false
                                             select ad;

            return adverCategoriesAndFeatures;
        }

        public IEnumerable<T> Get(int id)
        {
            var adverCategoriesAndFeature = from ad in entities.Include(a => a.AdverCategoriesAndFeaturesDetails.Where(aa => aa.Deleted == false)).ThenInclude(g => g.Group)
                                            where ad.Deleted == false && ad.Id == id
                                            select ad;

            return adverCategoriesAndFeature;
        }

        public async Task<int> Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                entities.Add(entity);
                await _applicationDbContext.SaveChangesAsync();
                return entities.OrderByDescending(ad => ad.Id).FirstOrDefault().Id;
            }
            catch (Exception ex)
            {
                return 0;
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
            var adverCategoriesAndFeatures = entities.Find(id);
            if (adverCategoriesAndFeatures == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                adverCategoriesAndFeatures.Deleted = true;
                entities.Update(adverCategoriesAndFeatures);
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
