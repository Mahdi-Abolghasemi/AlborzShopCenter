using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.BaseInfo
{
    [Table("Cities")]
    public class CityModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [Required]
        [ForeignKey(nameof(CountryModel))]
        public int CountryId { get; set; }
        public bool Deleted { get; set; }
        public bool UseOrder { get; set; }
        [Required]
        public decimal ShippingCost { get; set; }
        public virtual CountryModel Country { get; set; }
    }
}
