using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Advertising
{
    [Table("AdverCategoriesAndFeatures")]
    public class AdverCategoriesAndFeaturesModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int Type { get; set; }
        [Required]
        public string Footer { get; set; }
        public int Condition { get; set; }
        public decimal Price { get; set; }
        [Required]
        public int StyleType { get; set; }
        public virtual IEnumerable<AdverCategoriesAndFeaturesDetailsModel> AdverCategoriesAndFeaturesDetails { get; set; }
    }
}
