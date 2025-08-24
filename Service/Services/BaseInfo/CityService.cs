using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.BaseInfo;
using Domain.Models.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;
using Domain.Dto.BaseInfo;

namespace Service.Services.BaseInfo
{
    public class CityService : ICityService<CityModel>
    {
        private readonly ICityRepository<CityModel> _cityRepository;

        public CityService(ICityRepository<CityModel> cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public IEnumerable<CityModel> GetAll()
        {
            return _cityRepository.GetAll();
        }

        public IEnumerable<CityModel> Search(SearchCityDto input)
        {
            return _cityRepository.Search(input);
        }

        public bool Insert(CityModel city)
        {
            return _cityRepository.Insert(city).Result;
        }

        public bool Update(CityModel city)
        {
            try
            {
                return _cityRepository.Update(city).Result;
            }
            catch(DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            return _cityRepository.Delete(id).Result;
        }
    }
}
