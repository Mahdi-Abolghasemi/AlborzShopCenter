using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.BaseInfo
{
    [Table("Shops")]
    public class ShopModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        public string ManagerName { get; set; }
        public string CellPhone { get; set; }
        public string Phone { get; set; }
        [Required]
        [ForeignKey(nameof(CityModel))]
        public int CityId { get; set; }
        public string Address { get; set; }
        public bool Deleted { get; set; }
        public bool Active { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float Rank { get; set; }
        public int RankGreat { get; set; }
        public int RankGood { get; set; }
        public int RankBad { get; set; }
        public virtual CityModel City { get; set; }
    }
}
