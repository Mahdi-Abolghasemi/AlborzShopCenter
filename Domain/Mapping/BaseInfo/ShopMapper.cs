using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.BaseInfo;
using Domain.Models.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class ShopMapper
    {
        public static ShopDto ToDto(this ShopModel shop)
        {
            return new ShopDto
            {
                Id = shop.Id,
                Name = shop.Name,
                ManagerName = shop.ManagerName,
                CellPhone = shop.CellPhone,
                Phone = shop.Phone,
                CityId = shop.CityId,
                CityName = shop.City.Name,
                CountryId = shop.City.Country.Id,
                CountryName = shop.City.Country.Name,
                Address = shop.Address,
                Deleted = Convert.ToInt32(shop.Deleted),
                Active = Convert.ToInt32(shop.Active),
                StartDate = shop.StartDate,
                EndDate = shop.EndDate,
                Rank = shop.Rank,
                RankGreat = shop.RankGreat,
                RankGood = shop.RankGood,
                RankBad = shop.RankBad
            };
        }

        public static IEnumerable<ShopDto> ToDto(IEnumerable<ShopModel> shop)
        {
            return shop.Select(x => x.ToDto());
        }

        public static ShopModel ToModel(this ShopDto shop)
        {
            return new ShopModel
            {
                Id = shop.Id,
                Name = shop.Name,
                ManagerName = shop.ManagerName,
                CellPhone = shop.CellPhone,
                Phone = shop.Phone,
                CityId = shop.CityId,
                Address = shop.Address,
                Deleted = Convert.ToBoolean(shop.Deleted),
                Active = Convert.ToBoolean(shop.Active),
                StartDate = shop.StartDate,
                EndDate = shop.EndDate,
                Rank = shop.Rank,
                RankGreat = shop.RankGreat,
                RankGood = shop.RankGood,
                RankBad = shop.RankBad
            };
        }
    }
}
