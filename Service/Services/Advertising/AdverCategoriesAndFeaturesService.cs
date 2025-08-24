using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.Advertising;
using Domain.Models.Advertising;
using Repository.IRepository.Advertising;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.Advertising
{
    public class AdverCategoriesAndFeaturesService : IAdverCategoriesAndFeaturesService<AdverCategoriesAndFeaturesModel>
    {
        private readonly IAdverCategoriesAndFeaturesRepository<AdverCategoriesAndFeaturesModel> _adverCategoriesAndFeaturesRepository;

        public AdverCategoriesAndFeaturesService(IAdverCategoriesAndFeaturesRepository<AdverCategoriesAndFeaturesModel> adverCategoriesAndFeaturesRepository)
        {
            _adverCategoriesAndFeaturesRepository = adverCategoriesAndFeaturesRepository;
        }

        public IEnumerable<AdverCategoriesAndFeaturesModel> GetAll()
        {
            return _adverCategoriesAndFeaturesRepository.GetAll();
        }

        public IEnumerable<AdverCategoriesAndFeaturesModel> Get(int id)
        {
            return _adverCategoriesAndFeaturesRepository.Get(id);
        }

        public int Insert(AdverCategoriesAndFeaturesModel adverCategoriesAndFeatures)
        {
            return _adverCategoriesAndFeaturesRepository.Insert(adverCategoriesAndFeatures).Result;
        }

        public bool Update(AdverCategoriesAndFeaturesModel adverCategoriesAndFeatures)
        {
            try
            {
                return _adverCategoriesAndFeaturesRepository.Update(adverCategoriesAndFeatures).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _adverCategoriesAndFeaturesRepository.Delete(id).Result;//*********
        }
    }
}
