using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.BaseInfo
{
    public class BrandService : IBrandService<BrandModel>
    {
        private readonly IBrandRepository<BrandModel> _brandRepository;

        public BrandService(IBrandRepository<BrandModel> brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public IEnumerable<BrandModel> GetAll()
        {
            return _brandRepository.GetAll();
        }

        public IEnumerable<BrandModel> Search(SearchBrandDto input)
        {
            return _brandRepository.Search(input);
        }

        public bool Insert(BrandModel brand)
        {
            return _brandRepository.Insert(brand).Result;
        }

        public bool Update(BrandModel brand)
        {
            try
            {
                return _brandRepository.Update(brand).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _brandRepository.Delete(id).Result;//*********
        }
    }
}
