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
    public class FAQController : ControllerBase
    {
        private readonly IFAQService _fAQService;

        public FAQController(IFAQService fAQService)
        {
            _fAQService = fAQService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<FAQDto> ReadAll()
        {
            return _fAQService.Read();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> WriteAll(FAQDto input)
        {
            return _fAQService.Write(input);
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> Delete(Guid id)
        {
            return _fAQService.Delete(id);
        }
    }
}
