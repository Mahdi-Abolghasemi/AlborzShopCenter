using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.BaseInfo;

namespace Domain.Models.Advertising
{
    [Table("AdverCategoriesAndFeaturesDetails")]
    public class AdverCategoriesAndFeaturesDetailsModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [ForeignKey(nameof(AdverCategoriesAndFeaturesModel))]
        public int AdverCategoriesAndFeaturesId { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        [ForeignKey(nameof(GroupModel))]
        public int? GroupId { get; set; }
        //[Required]
        //[ForeignKey(nameof(ProductModel))]
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ImagePath { get; set; }
        public virtual GroupModel Group { get; set; }
        //public virtual ProductModel Product { get; set; }
        public virtual AdverCategoriesAndFeaturesModel AdverCategoriesAndFeatures { get; set; }
    }
}
