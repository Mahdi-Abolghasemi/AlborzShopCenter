using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.IRepository;
using Domain.Models;
using Domain.Dto;
using Domain.Data;
using Domain.Enumeration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Repository.Repository
{
    public class ApplicationUserRepository<T> : IApplicationUserRepository<T> where T : ApplicationUser
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private DbSet<T> entities;

        public ApplicationUserRepository(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
            entities = _applicationDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            var users = from c in entities.Include(c => c.Country)
                        where c.Deleted == false
                         select c;

            return users;
        }

        public IEnumerable<T> Search(ApplicationUserSearchDto conditions)
        {
            var data = entities.Include(c => c.Country).Where(item => item.Deleted == false);

            if (!string.IsNullOrEmpty(conditions.UserName))
            {
                data = data.Where(item => item.UserName.ToLower().Contains(conditions.UserName.ToLower()));
            }

            if (conditions.Active > -1)
            {
                data = data.Where(item => item.Active == Convert.ToBoolean(conditions.Active));
            }

            if (conditions.RoleType > -1)
            {
                data = data.Where(item => item.RoleType == conditions.RoleType);
            }

            return data.ToList();
        }

        public async Task<bool> Insert(T entity, int role, string password)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                var newEntity = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = entity.UserName,
                    Email = entity.Email,
                    PhoneNumber = entity.PhoneNumber,
                    TwoFactorEnabled = entity.TwoFactorEnabled,
                    Active = entity.Active,
                    CountryId = entity.CountryId,
                    RoleType = entity.RoleType
                };

                await _userManager.CreateAsync(newEntity, password);
                await _userManager.AddToRoleAsync(newEntity, Enum.GetName(typeof(RoleTypeEnum), role));

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                var user = await _applicationDbContext.Users.FindAsync(entity.Id);               
                user.UserName = entity.UserName;
                user.NormalizedUserName = entity.UserName.ToUpper();
                user.TwoFactorEnabled = entity.TwoFactorEnabled;
                user.Active = entity.Active;
                user.Deleted = entity.Deleted;
                int oldRole = user.RoleType;
                user.RoleType = entity.RoleType;

                if (user.Email != entity.Email)
                {
                    user.Email = entity.Email;
                    user.NormalizedEmail = entity.Email.ToUpper();
                    user.EmailConfirmed = false;
                }

                if (user.PhoneNumber != entity.PhoneNumber || user.CountryId != entity.CountryId)
                {
                    user.PhoneNumber = entity.PhoneNumber;
                    user.PhoneNumberConfirmed = false;
                    user.CountryId = entity.CountryId;
                }

                await _applicationDbContext.SaveChangesAsync();

                if (oldRole != entity.RoleType)
                {
                    await _userManager.RemoveFromRoleAsync(user, Enum.GetName(typeof(RoleTypeEnum), oldRole));
                    await _userManager.AddToRoleAsync(user, Enum.GetName(typeof(RoleTypeEnum), entity.RoleType));
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> ChangePassword(T entity, string newPassword)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                var user = await _applicationDbContext.Users.FindAsync(entity.Id);
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, newPassword);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public T Get(string userId)
        {
            var email = entities.Where(e => e.Id == userId).Select(s => s);
            return email.FirstOrDefault();
        }
    }
}
