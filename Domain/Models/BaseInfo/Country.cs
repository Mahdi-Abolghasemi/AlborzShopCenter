using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Domain.Models.BaseInfo
{
    [Table("Countries")]
    public class CountryModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public bool UseOrder { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(10)")]
        public string RegionCode { get; set; }
    }
}
