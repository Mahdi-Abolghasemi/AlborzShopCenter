using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class CountryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deleted { get; set; }
        public int UseOrder { get; set; }
        public string RegionCode { get; set; }
    }

    public class SearchCountryDto
    {
        public string Name { get; set; }
        public int UseOrder { get; set; }
        public string RegionCode { get; set; }
    }
}
