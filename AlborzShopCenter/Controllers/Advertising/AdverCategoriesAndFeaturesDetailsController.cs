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
    public class AdverCategoriesAndFeaturesDetailsController : ControllerBase
    {
        private readonly IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel> _adverCategoriesAndFeaturesDetailsService;

        public AdverCategoriesAndFeaturesDetailsController(IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetailsService)
        {
            _adverCategoriesAndFeaturesDetailsService = adverCategoriesAndFeaturesDetailsService;
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutAdverCategoriesAndFeaturesDetails(AdverCategoriesAndFeaturesDto adverCategoriesAndFeatures)
        {
            return _adverCategoriesAndFeaturesDetailsService.Update(AdverCategoriesAndFeaturesMapper.ToModel(adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails, adverCategoriesAndFeatures.Id));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteAdverCategoriesAndFeaturesDetails(int id)
        {
            return _adverCategoriesAndFeaturesDetailsService.Delete(id);
        }

        [HttpPost]
        [ActionName("UploadFile")]
        public ActionResult<Guid> UploadFile([FromForm] FeaturesDetailsFileUploadDto data)
        {
            return _adverCategoriesAndFeaturesDetailsService.UploadFile(data);
        }

        [HttpPost]
        [ActionName("RemoveUploadFile")]
        public ActionResult<bool> RemoveUploadFile([FromForm] string path)
        {
            return _adverCategoriesAndFeaturesDetailsService.RemoveUploadFile(path);
        }
    }
}
