using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.BaseInfo;

namespace Domain.Models
{
    [Table("Products")]
    public class ProductModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(Max)")]
        public string Name { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        [Column(TypeName = "text")]
        public string Descriptions { get; set; }
        public string FolderName { get; set; }
        public string Images { get; set; }
        [Column(TypeName = "nvarchar(Max)")]
        public string Attributes { get; set; }

        [Column(TypeName = "nvarchar(Max)")]
        public string Colors { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Model { get; set; }
        [Required]
        public decimal Price { get; set; }
        [ForeignKey(nameof(BrandModel))]
        public int? BrandId { get; set; }
        [ForeignKey(nameof(ShopModel))]
        public int? ShopId { get; set; }
        [Required]
        public int TotalInventory { get; set; }
        [ForeignKey(nameof(GroupModel))]
        public int? GroupId { get; set; }
        public bool HasSize { get; set; }
        public int SizeType { get; set; }
        [Column(TypeName = "nvarchar(Max)")]
        public string Sizes { get; set; }
        public virtual BrandModel Brand { get; set; }
        public virtual ShopModel Shop { get; set; }
        public virtual GroupModel Group { get; set; }
    }
}
