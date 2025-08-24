using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.BaseInfo
{
    [Table("Brands")]
    public class BrandModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        [ForeignKey(nameof(GroupModel))]
        public int GroupId { get; set; }
        [Required]
        [ForeignKey(nameof(CountryModel))]
        public int CountryId { get; set; }
        public virtual GroupModel Group { get; set; }
        public virtual CountryModel Country { get; set; }
    }
}
