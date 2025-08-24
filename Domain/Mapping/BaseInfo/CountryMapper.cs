using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dto.BaseInfo;
using Domain.Models.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class CountryMapper
    {
        public static CountryDto ToDto(this CountryModel country)
        {
            return new CountryDto
            {
                Id = country.Id,
                Name = country.Name,
                Deleted = Convert.ToInt32(country.Deleted),
                UseOrder = Convert.ToInt32(country.UseOrder),
                RegionCode = country.RegionCode
            };
        }

        public static IEnumerable<CountryDto> ToDto(IEnumerable<CountryModel> country)
        {
            return country.Select(x=>x.ToDto());
        }

        public static CountryModel ToModel(CountryDto dto)
        {
            return new CountryModel
            {
                Id = dto.Id,
                Name = dto.Name,
                Deleted = Convert.ToBoolean(dto.Deleted),
                UseOrder = Convert.ToBoolean(dto.UseOrder),
                RegionCode = dto.RegionCode
            };
        }
    }
}
