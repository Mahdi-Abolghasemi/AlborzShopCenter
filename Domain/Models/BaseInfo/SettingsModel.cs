using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.BaseInfo
{
    [Table("Settings")]
    public class SettingsModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Boarding { get; set; }
        [Required]
        public bool Daily { get; set; }
        [Required]
        public int NumbersOfDayForSelect { get; set; }
        [Required]
        public int NumbersOfDayForSupport { get; set; }
    }
}
