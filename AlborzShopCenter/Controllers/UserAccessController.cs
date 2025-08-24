using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dto;
using Domain.Models;
using Service.IServices;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserAccessController : ControllerBase
    {
        private readonly IUserAccessService<UserAccessModel> _userAccessService;
        public UserAccessController(IUserAccessService<UserAccessModel> userAccessService)
        {
            _userAccessService = userAccessService;
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("GetAccessForMenu")]
        public List<int> GetAccess([FromBody] string userId)
        {
            var result = _userAccessService.Get(userId);
            return result;
        }

        [HttpPost]
        [ActionName("Get")]
        public List<int> Get([FromForm] string userId)
        {
            var result = _userAccessService.Get(userId);
            return result;
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostUserAccess(UserAccessDto input)
        {
            return _userAccessService.Insert(input);
        }
    }
}
