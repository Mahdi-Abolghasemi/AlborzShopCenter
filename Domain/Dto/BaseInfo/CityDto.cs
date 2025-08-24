using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deleted { get; set; }
        public int UseOrder { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public decimal ShippingCost { get; set; }
    }

    public class SearchCityDto
    {
        public string Name { get; set; }
        public int UseOrder { get; set; }
        public int CountryId { get; set; }
    }
}
