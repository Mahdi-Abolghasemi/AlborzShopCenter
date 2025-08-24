using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;
using Service.IServices;
using Domain.Mapping;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicationUserController : Controller
    {
        private readonly IApplicationUserService<ApplicationUser> _applicationUserService;

        public ApplicationUserController(IApplicationUserService<ApplicationUser> applicationUserService)
        {
            _applicationUserService = applicationUserService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<ApplicationUserDto> GetApplicationUsers()
        {
            return ApplicationUserMapper.ToDto(_applicationUserService.GetAll()).ToList();
        }

        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<ApplicationUserDto> Search(ApplicationUserSearchDto applicationUser)
        {
            var result = _applicationUserService.Search(applicationUser);
            return ApplicationUserMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutApplicationUser(ApplicationUserDto applicationUser)
        {
            return _applicationUserService.Update(ApplicationUserMapper.ToModel(applicationUser));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostApplicationUser(ApplicationUserDto applicationUser)
        {
            return _applicationUserService.Insert(ApplicationUserMapper.ToModel(applicationUser), applicationUser.RoleType, applicationUser.Password);
        }

        [HttpPost]
        [ActionName("ChangePassword")]
        public ActionResult<bool> ChangePassword(ApplicationUserDto applicationUser)
        {
            return _applicationUserService.ChangePassword(ApplicationUserMapper.ToModel(applicationUser), applicationUser.Password);
        }
    }
}
