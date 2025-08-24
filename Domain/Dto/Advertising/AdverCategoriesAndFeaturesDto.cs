using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.Advertising
{
    public class AdverCategoriesAndFeaturesDto
    {
        public int Id { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public string Title { get; set; }
        public int Type { get; set; }
        public string Footer { get; set; }
        public int Condition { get; set; }
        public decimal Price { get; set; }
        public int StyleType { get; set; }
        public virtual IEnumerable<AdverCategoriesAndFeaturesDetailsDto> AdverCategoriesAndFeaturesDetails { get; set; }
    }
}
