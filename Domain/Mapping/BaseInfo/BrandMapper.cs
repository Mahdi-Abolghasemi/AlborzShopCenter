using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.BaseInfo;
using Domain.Models.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class BrandMapper
    {
        public static BrandDto ToDto(this BrandModel brand)
        {
            return new BrandDto
            {
                Id = brand.Id,
                Name = brand.Name,
                Deleted = Convert.ToInt32(brand.Deleted),
                Active = Convert.ToInt32(brand.Active),
                GroupId = brand.GroupId,
                GroupName = brand.Group.Name,
                CategoryName = brand.Group.Category.Name,
                CountryId = brand.Country.Id,
                CountryName = brand.Country.Name
            };
        }

        public static IEnumerable<BrandDto> ToDto(IEnumerable<BrandModel> brand)
        {
            return brand.Select(x => x.ToDto());
        }

        public static BrandModel ToModel(this BrandDto brand)
        {
            return new BrandModel
            {
                Id = brand.Id,
                Name = brand.Name,
                Deleted = Convert.ToBoolean(brand.Deleted),
                Active = Convert.ToBoolean(brand.Active),
                GroupId = brand.GroupId,
                CountryId = brand.CountryId
            };
        }
    }
}
