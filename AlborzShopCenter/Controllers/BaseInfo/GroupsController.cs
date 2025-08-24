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
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService<GroupModel> _groupService;

        public GroupsController(IGroupService<GroupModel> groupService)
        {
            _groupService = groupService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<GroupDto> GetGroups()
        {
            return GroupMapper.ToDto(_groupService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<GroupDto> Search(GroupDto group)
        {
            var result = _groupService.Search(group);
            return GroupMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutGroup(GroupDto group)
        {
            return _groupService.Update(GroupMapper.ToModel(group));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostGroup(GroupDto group)
        {
            return _groupService.Insert(GroupMapper.ToModel(group));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteGroup(int id)
        {
            return _groupService.Delete(id);
        }
    }
}
