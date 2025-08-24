using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class ShopsController : ControllerBase
    {
        private readonly IShopService<ShopModel> _shopService;

        public ShopsController(IShopService<ShopModel> shopService)
        {
            _shopService = shopService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<ShopDto> GetShops()
        {
            return ShopMapper.ToDto(_shopService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<ShopDto> Search(SearchShopDto input)
        {
            var result = _shopService.Search(input);
            return ShopMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutShop(ShopDto shop)
        {
            return _shopService.Update(ShopMapper.ToModel(shop));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostShop(ShopDto shop)
        {
            return _shopService.Insert(ShopMapper.ToModel(shop));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteShop(int id)
        {
            return _shopService.Delete(id);
        }
    }
}
