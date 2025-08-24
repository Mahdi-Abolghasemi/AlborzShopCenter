using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.BaseInfo
{
    [Table("TimeSending")]
    public class TimeSendingModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public TimeSpan Of { get; set; }
        [Required]
        public TimeSpan To { get; set; }
        [Required]
        public bool Deleted { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public int MaximumNumberOfOrders { get; set; }
        [Required]
        public int OrderPreparationTime { get; set; }
    }
}
