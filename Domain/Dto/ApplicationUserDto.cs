using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ApplicationUserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int TwoFactorEnabled { get; set; }      
        public int Deleted { get; set; }
        public int Active { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int RoleType { get; set; }
        public string RoleTypeName { get; set; }
        public string Password { get; set; }
    }

    public class ApplicationUserSearchDto
    {
        public string UserName { get; set; }
        public int Active { get; set; }
        public int RoleType { get; set; }
    }
}
