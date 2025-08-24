using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Domain.Mapping.BaseInfo;
using Service.IServices.BaseInfo;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers.BaseInfo
{
    [Authorize(Roles = "Admin , User")]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService<CityModel> _cityService;

        public CitiesController(ICityService<CityModel> cityService)
        {
            _cityService = cityService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<CityDto> GetCities()
        {
            return CityMapper.ToDto(_cityService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<CityDto> Search(SearchCityDto input)
        {
            var result = _cityService.Search(input);
            return CityMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutCity(CityDto city)
        {
            return _cityService.Update(CityMapper.ToModel(city));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostCity(CityDto city)
        {
            return _cityService.Insert(CityMapper.ToModel(city));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteCity(int id)
        {
            return _cityService.Delete(id);
        }
    }
}
