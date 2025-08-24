using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Service.IServices.Footer;
using Domain.Dto.Footer;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers.Footer
{
    [Authorize(Roles = "Admin , User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HelpController : ControllerBase
    {
        private readonly IHelpService _helpService;

        public HelpController(IHelpService helpService)
        {
            _helpService = helpService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<HelpDto> ReadAll()
        {
            return _helpService.Read();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> WriteAll(HelpDto input)
        {
            return _helpService.Write(input);
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> Delete(Guid id)
        {
            return _helpService.Delete(id);
        }
    }
}
