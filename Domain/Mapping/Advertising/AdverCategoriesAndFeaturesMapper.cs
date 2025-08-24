using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Advertising;
using Domain.Models.Advertising;

namespace Domain.Mapping.Advertising
{
    public static class AdverCategoriesAndFeaturesMapper
    {
        public static AdverCategoriesAndFeaturesDto ToDto(this AdverCategoriesAndFeaturesModel adverCategoriesAndFeatures)
        {
            return new AdverCategoriesAndFeaturesDto
            {
                Id = adverCategoriesAndFeatures.Id,
                Deleted = Convert.ToInt32(adverCategoriesAndFeatures.Deleted),
                Active = Convert.ToInt32(adverCategoriesAndFeatures.Active),
                Title = adverCategoriesAndFeatures.Title,
                Type = adverCategoriesAndFeatures.Type,
                Footer = adverCategoriesAndFeatures.Footer,
                Condition = adverCategoriesAndFeatures.Condition,
                Price = adverCategoriesAndFeatures.Price,
                StyleType = adverCategoriesAndFeatures.StyleType,
                AdverCategoriesAndFeaturesDetails = adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails.Contains(null) ? new List<AdverCategoriesAndFeaturesDetailsDto>() : adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails.ToDto()
            };
        }

        public static IEnumerable<AdverCategoriesAndFeaturesDto> ToDto(this IEnumerable<AdverCategoriesAndFeaturesModel> adverCategoriesAndFeatures)
        {
            return adverCategoriesAndFeatures.Select(x => x.ToDto());
        }

        public static AdverCategoriesAndFeaturesDetailsDto ToDto(this AdverCategoriesAndFeaturesDetailsModel adverCategoriesAndFeaturesDetails)
        {
            if (adverCategoriesAndFeaturesDetails != null)
            {
                return new AdverCategoriesAndFeaturesDetailsDto
                {
                    Id = adverCategoriesAndFeaturesDetails.Id,
                    AdverCategoriesAndFeaturesId = adverCategoriesAndFeaturesDetails.AdverCategoriesAndFeaturesId,
                    Deleted = Convert.ToInt32(adverCategoriesAndFeaturesDetails.Deleted),
                    Active = Convert.ToInt32(adverCategoriesAndFeaturesDetails.Active),
                    GroupId = adverCategoriesAndFeaturesDetails.GroupId,
                    GroupName = adverCategoriesAndFeaturesDetails.Group.Name,
                    ProductId = adverCategoriesAndFeaturesDetails.ProductId,
                    ProductTitle = adverCategoriesAndFeaturesDetails.ProductTitle,
                    ImagePath = adverCategoriesAndFeaturesDetails.ImagePath
                };
            }
            else
            {
                return new AdverCategoriesAndFeaturesDetailsDto();
            }
        }

        public static IEnumerable<AdverCategoriesAndFeaturesDetailsDto> ToDto(this IEnumerable<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetails)
        {
            return adverCategoriesAndFeaturesDetails.Select(x => x.ToDto());
        }

        public static AdverCategoriesAndFeaturesModel ToModel(this AdverCategoriesAndFeaturesDto adverCategoriesAndFeatures)
        {
            return new AdverCategoriesAndFeaturesModel
            {
                Id = adverCategoriesAndFeatures.Id,
                Deleted = Convert.ToBoolean(adverCategoriesAndFeatures.Deleted),
                Active = Convert.ToBoolean(adverCategoriesAndFeatures.Active),
                Title = adverCategoriesAndFeatures.Title,
                Type = adverCategoriesAndFeatures.Type,
                Footer = adverCategoriesAndFeatures.Footer,
                Condition = adverCategoriesAndFeatures.Condition,
                Price = adverCategoriesAndFeatures.Price,
                StyleType = adverCategoriesAndFeatures.StyleType
                //AdverCategoriesAndFeaturesDetails = adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails.Contains(null) ? new List<AdverCategoriesAndFeaturesDetailsDto>() : adverCategoriesAndFeatures.AdverCategoriesAndFeaturesDetails.ToDto()
            };
        }

        public static IEnumerable<AdverCategoriesAndFeaturesDetailsModel> ToModel(this IEnumerable<AdverCategoriesAndFeaturesDetailsDto> adverCategoriesAndFeaturesDetails, int adverCategoriesAndFeaturesId)
        {
            return adverCategoriesAndFeaturesDetails.Select(x => x.ToModel(adverCategoriesAndFeaturesId));
        }

        public static AdverCategoriesAndFeaturesDetailsModel ToModel(this AdverCategoriesAndFeaturesDetailsDto adverCategoriesAndFeaturesDetails, int adverCategoriesAndFeaturesId)
        {
            return new AdverCategoriesAndFeaturesDetailsModel
            {
                Id = adverCategoriesAndFeaturesDetails.Id,
                AdverCategoriesAndFeaturesId = adverCategoriesAndFeaturesId,
                Deleted = Convert.ToBoolean(adverCategoriesAndFeaturesDetails.Deleted),
                Active = Convert.ToBoolean(adverCategoriesAndFeaturesDetails.Active),
                GroupId = adverCategoriesAndFeaturesDetails.GroupId,
                ProductId = adverCategoriesAndFeaturesDetails.ProductId,
                ProductTitle = adverCategoriesAndFeaturesDetails.ProductTitle,
                ImagePath = adverCategoriesAndFeaturesDetails.ImagePath
            };
        }
    }
}
