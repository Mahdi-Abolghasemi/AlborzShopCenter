using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.Advertising;
using Repository.IRepository.Advertising;
using Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repository.Advertising
{
    public class AdverCategoriesAndFeaturesDetailsRepository<T> : IAdverCategoriesAndFeaturesDetailsRepository<T> where T : AdverCategoriesAndFeaturesDetailsModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public AdverCategoriesAndFeaturesDetailsRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        /*public IEnumerable<T> GetAll()
        {
            var adverCategoriesAndFeaturesDetails = from ad in entities.Include(g => g.Group)
                                                    where ad.Deleted == false
                                                    select ad;

            return adverCategoriesAndFeaturesDetails;
        }*/

        public async Task<bool> Insert(IEnumerable<T> entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach (var item in entity)
                {
                    item.Id = 0;
                    entities.Add(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Update(IEnumerable<T> entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach (var item in entity)
                {
                    entities.Update(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int adverCategoriesAndFeaturesDetailsId)
        {
            var adverCategoriesAndFeaturesDetails = from ad in entities
                                                    where ad.Id == adverCategoriesAndFeaturesDetailsId
                                                    select ad;

            if (adverCategoriesAndFeaturesDetails == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                foreach (var item in adverCategoriesAndFeaturesDetails)
                {
                    item.Deleted = true;
                    entities.Update(item);
                }
                await _applicationDbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
