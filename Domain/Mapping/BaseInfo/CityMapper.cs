using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;


namespace Domain.Mapping.BaseInfo
{
    public static class CityMapper
    {
        public static CityDto ToDto(this CityModel city)
        {
            return new CityDto
            {
                Id = city.Id,
                Name = city.Name,
                Deleted = Convert.ToInt32(city.Deleted),
                UseOrder = Convert.ToInt32(city.UseOrder),
                CountryId = city.CountryId,
                CountryName = city.Country.Name,
                ShippingCost = city.ShippingCost
            };
        }

        public static IEnumerable<CityDto> ToDto(IEnumerable<CityModel> city)
        {
            return city.Select(x => x.ToDto());
        }

        public static CityModel ToModel(CityDto city)
        {
            return new CityModel
            {
                Id = city.Id,
                Name = city.Name,
                Deleted = Convert.ToBoolean(city.Deleted),
                UseOrder = Convert.ToBoolean(city.UseOrder),
                CountryId = city.CountryId,
                ShippingCost = city.ShippingCost
            };
        }
    }
}
