using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;
using Domain.Models;
using Domain.Enumeration;

namespace Domain.Mapping
{
    public static class ApplicationUserMapper
    {
        public static ApplicationUserDto ToDto(this ApplicationUser applicationUser)
        {
            return new ApplicationUserDto
            {
                Id = Guid.Parse(applicationUser.Id),
                UserName = applicationUser.UserName,
                Email = applicationUser.Email,
                PhoneNumber = applicationUser.PhoneNumber,
                TwoFactorEnabled = Convert.ToInt32(applicationUser.TwoFactorEnabled),
                Deleted = Convert.ToInt32(applicationUser.Deleted),
                Active = Convert.ToInt32(applicationUser.Active),
                CountryId = applicationUser.CountryId,
                CountryName = applicationUser.Country.Name,
                RoleType = applicationUser.RoleType,
                RoleTypeName = Enum.GetName(typeof(RoleTypeEnum), applicationUser.RoleType),
                Password = applicationUser.PasswordHash
            };
        }

        public static IEnumerable<ApplicationUserDto> ToDto(IEnumerable<ApplicationUser> applicationUser)
        {
            return applicationUser.Select(x => x.ToDto());
        }

        public static ApplicationUser ToModel(this ApplicationUserDto applicationUser)
        {
            return new ApplicationUser
            {
                Id = applicationUser.Id.ToString(),
                UserName = applicationUser.UserName,
                Email = applicationUser.Email,
                PhoneNumber = applicationUser.PhoneNumber,
                TwoFactorEnabled = Convert.ToBoolean(applicationUser.TwoFactorEnabled),
                Deleted = Convert.ToBoolean(applicationUser.Deleted),
                Active = Convert.ToBoolean(applicationUser.Active),
                CountryId = applicationUser.CountryId,
                RoleType = applicationUser.RoleType,
                PasswordHash = applicationUser.Password
            };
        }
    }
}
