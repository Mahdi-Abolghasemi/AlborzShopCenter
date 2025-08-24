using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Models.BaseInfo;

namespace Domain.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool Deleted { get; set; }
        public bool Active { get; set; }
        [Required]
        [ForeignKey(nameof(CountryModel))]
        public int CountryId { get; set; }
        [Required]
        public int RoleType { get; set; }
        public virtual CountryModel Country { get; set; }
    }
}
