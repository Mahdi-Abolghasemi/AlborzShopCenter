using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Service.IServices.BaseInfo;
using Domain.Mapping.BaseInfo;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers.BaseInfo
{

    [Authorize(Roles = "Admin , User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService<BrandModel> _brandService;

        public BrandsController(IBrandService<BrandModel> brandService)
        {
            _brandService = brandService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<BrandDto> GetBrands()
        {
            return BrandMapper.ToDto(_brandService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<BrandDto> Search(SearchBrandDto brand)
        {
            var result = _brandService.Search(brand);
            return BrandMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutBrand(BrandDto brand)
        {
            return _brandService.Update(BrandMapper.ToModel(brand));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostBrand(BrandDto brand)
        {
            return _brandService.Insert(BrandMapper.ToModel(brand));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteBrand(int id)
        {
            return _brandService.Delete(id);
        }
    }
}
