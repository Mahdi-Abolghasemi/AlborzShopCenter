using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string CategoryName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
    }

    public class SearchBrandDto
    {
        public string Name { get; set; }
        public int Active { get; set; }
        public int GroupId { get; set; }
        public int CategoryId { get; set; }
    }
}
