using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
    }

    public class SearchCategoryDto
    {
        public string Name { get; set; }
        public int Active { get; set; }
    }
}
