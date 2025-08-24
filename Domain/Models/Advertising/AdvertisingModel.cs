using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Advertising
{
    [Table("Advertising")]
    public class AdvertisingModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(Max)")]
        public string ImagesName { get; set; }
        public string LinkPath { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        public bool HasCaption { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CaptionStyle { get; set; }
        public bool HasTag { get; set; }
        public string TagTitle { get; set; }
        public string TagText { get; set; }
        public string TagStyle { get; set; }
    }
}
