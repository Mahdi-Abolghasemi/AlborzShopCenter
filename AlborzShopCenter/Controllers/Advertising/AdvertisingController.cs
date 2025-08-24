using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models.Advertising;
using Domain.Dto.Advertising;
using Service.IServices.Advertising;
using Domain.Mapping.Advertising;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers.Advertising
{
    [Authorize(Roles = "Admin , User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdvertisingController : ControllerBase
    {
        private readonly IAdvertisingService<AdvertisingModel> _advertisingService;

        public AdvertisingController(IAdvertisingService<AdvertisingModel> advertisingService)//, IWebHostEnvironment env)
        {
            _advertisingService = advertisingService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<AdvertisingDto> GetAdvertising()
        {
            return AdvertisingMapper.ToDto(_advertisingService.GetAll()).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutAdvertising(AdvertisingDto advertising)
        {
            return _advertisingService.Update(AdvertisingMapper.ToModel(advertising));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostAdvertising(AdvertisingDto advertising)
        {
            return _advertisingService.Insert(AdvertisingMapper.ToModel(advertising));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteAdvertising(int id)
        {
            return _advertisingService.Delete(id);
        }

        [HttpPost]
        [ActionName("UploadFile")]
        public ActionResult<bool> UploadFile([FromForm] AdvertisingFileUploadDto data)
        {
            return _advertisingService.UploadFile(data);
        }
    }
}
