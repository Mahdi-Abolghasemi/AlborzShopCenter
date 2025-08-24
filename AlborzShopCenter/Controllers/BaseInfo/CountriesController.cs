using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Dto.BaseInfo;
using Domain.Mapping.BaseInfo;
using Domain.Models.BaseInfo;
using Microsoft.AspNetCore.Authorization;
using Service.IServices.BaseInfo;

namespace AlborzShopCenter.Controllers.BaseInfo
{
    [Authorize(Roles = "Admin , User")]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService<CountryModel> _countrieService;

        public CountriesController(ICountryService<CountryModel> countrieService)
        {
            _countrieService = countrieService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<CountryDto> GetCountries()
        {
            return CountryMapper.ToDto(_countrieService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<CountryDto> Search(SearchCountryDto searchcountryDto)
        {
            var result = _countrieService.Search(searchcountryDto);
            return CountryMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutCountry(CountryDto country)
        {
            return _countrieService.Update(CountryMapper.ToModel(country));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostCountry(CountryDto country)
        {
            return _countrieService.Insert(CountryMapper.ToModel(country));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteCountry(int id)
        {
            return _countrieService.Delete(id);
        }
    }
}
