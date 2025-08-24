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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService<SettingsModel> _settingsService;

        public SettingsController(ISettingsService<SettingsModel> settingsService)
        {
            _settingsService = settingsService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public SettingsDto GetSettings()
        {
            return SettingsMapper.ToDto(_settingsService.GetAll());
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutSetting(SettingsDto setting)
        {
            return _settingsService.Update(SettingsMapper.ToModel(setting));
        }
    }
}
