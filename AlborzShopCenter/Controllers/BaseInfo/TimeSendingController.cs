using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class TimeSendingController : ControllerBase
    {
        private readonly ITimeSendingService<TimeSendingModel> _timeSendingService;

        public TimeSendingController(ITimeSendingService<TimeSendingModel> timeSendingService)
        {
            _timeSendingService = timeSendingService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<TimeSendingDto> GetTimeSendings()
        {
            return TimeSendingMapper.ToDto(_timeSendingService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<TimeSendingDto> Search(TimeSendingSearchDto timeSendingSearch)
        {
            var result = _timeSendingService.Search(timeSendingSearch);
            return TimeSendingMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutTimeSending(TimeSendingDto timeSending)
        {
            return _timeSendingService.Update(TimeSendingMapper.ToModel(timeSending));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostTimeSending(TimeSendingDto timeSending)
        {
            return _timeSendingService.Insert(TimeSendingMapper.ToModel(timeSending));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteTimeSending(int id)
        {
            return _timeSendingService.Delete(id);
        }
    }
}
