using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class ShopDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ManagerName { get; set; }
        public string CellPhone { get; set; }
        public string Phone { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Address { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float Rank { get; set; }
        public int RankGreat { get; set; }
        public int RankGood { get; set; }
        public int RankBad { get; set; }
    }

    public class SearchShopDto
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public int Active { get; set; }
    }
}
