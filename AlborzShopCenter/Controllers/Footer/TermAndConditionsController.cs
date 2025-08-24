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
    public class TermAndConditionsController : ControllerBase
    {
        private readonly ITermAndConditionsService _termAndConditionsService;

        public TermAndConditionsController(ITermAndConditionsService termAndConditionsService)
        {
            _termAndConditionsService = termAndConditionsService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<TermAndConditionsDto> ReadAll()
        {
            return _termAndConditionsService.Read();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> WriteAll(TermAndConditionsDto input)
        {
            return _termAndConditionsService.Write(input);
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> Delete(Guid id)
        {
            return _termAndConditionsService.Delete(id);
        }
    }
}
