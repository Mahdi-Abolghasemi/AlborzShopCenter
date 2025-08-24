using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Domain.Enumeration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Service.IServices.BaseInfo;
using Repository.IRepository.BaseInfo;

namespace Service.Services.BaseInfo
{
    public class CountryService : ICountryService<CountryModel>
    {
        private readonly ICountryRepository<CountryModel> _countryRepository;

        public CountryService(ICountryRepository<CountryModel> countryRepository)
        {
            _countryRepository = countryRepository;
        }

        public IEnumerable<CountryModel> GetAll()
        {

            return _countryRepository.GetAll();
        }

        public IEnumerable<CountryModel> Search(SearchCountryDto input)
        {
            return _countryRepository.Search(input);
        }

        public bool Insert(CountryModel country)
        {
            return _countryRepository.Insert(country).Result;
        }

        public bool Update(CountryModel country)
        {
            try
            {
                return _countryRepository.Update(country).Result;
            }
            catch (DbUpdateConcurrencyException)
            {

                return false;
            }
        }

        public bool Delete(int id)
        {
            return _countryRepository.Delete(id).Result;
        }
    }
}
