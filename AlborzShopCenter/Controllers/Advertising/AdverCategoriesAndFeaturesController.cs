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
    public class AdverCategoriesAndFeaturesController : ControllerBase
    {
        private readonly IAdverCategoriesAndFeaturesService<AdverCategoriesAndFeaturesModel> _adverCategoriesAndFeaturesService;
        private readonly IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel> _adverCategoriesAndFeaturesDetailsService;

        public AdverCategoriesAndFeaturesController(IAdverCategoriesAndFeaturesService<AdverCategoriesAndFeaturesModel> adverCategoriesAndFeaturesService, IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetailsService)
        {
            _adverCategoriesAndFeaturesService = adverCategoriesAndFeaturesService;
            _adverCategoriesAndFeaturesDetailsService = adverCategoriesAndFeaturesDetailsService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<AdverCategoriesAndFeaturesDto> GetAdverCategoriesAndFeatures()
        {
            return AdverCategoriesAndFeaturesMapper.ToDto(_adverCategoriesAndFeaturesService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Get")]
        public AdverCategoriesAndFeaturesDto Get([FromForm] int adverId)
        {
            var result = _adverCategoriesAndFeaturesService.Get(adverId);
            return AdverCategoriesAndFeaturesMapper.ToDto(result).FirstOrDefault();
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostAdverCategoriesAndFeatures(AdverCategoriesAndFeaturesDto adverCategoriesAndFeatures)
        {
            int adverCategoriesAndFeaturesId = _adverCategoriesAndFeaturesService.Insert(AdverCategoriesAndFeaturesMapper.ToModel(adverCategoriesAndFeatures));
            if (adverCategoriesAndFeaturesId != 0)
            {
                return _adverCategoriesAndFeaturesDetailsService.Insert(AdverCategoriesAndFeaturesMapper.ToModel(adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails, adverCategoriesAndFeaturesId));
            }
            else
            {
                return false;
            }
        }
        
        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutAdverCategoriesAndFeatures(AdverCategoriesAndFeaturesDto adverCategoriesAndFeatures)
        {
            return _adverCategoriesAndFeaturesService.Update(AdverCategoriesAndFeaturesMapper.ToModel(adverCategoriesAndFeatures));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteAdverCategoriesAndFeatures(int id)
        {
            return _adverCategoriesAndFeaturesService.Delete(id);
        }
    }
}
