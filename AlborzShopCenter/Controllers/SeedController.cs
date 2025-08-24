using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Domain.Data;
using Domain.Models;
using Domain.Enumeration;
using Domain.Models.BaseInfo;
using Service.IServices.BaseInfo;
using Service.IServices;
using Domain.Dto.BaseInfo;
using Domain.Dto;
using Domain.Mapping.BaseInfo;
using Service.Services;

namespace AlborzShopCenter.Controllers
{
    /*[Route("api/[controller]/[action]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public SeedController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet]
        [ActionName("CreateDefaultUsers")]
        public async Task<ActionResult> CreateDefaultUsers()
        {
            // setup the default role names
            string role_RegisteredUser = "RegisteredUser";
            string role_Administrator = "Administrator";

            // create the default roles (if they don't exist yet)
            if (await _roleManager.FindByNameAsync(role_RegisteredUser) == null)
                await _roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            if (await _roleManager.FindByNameAsync(role_Administrator) == null)
                await _roleManager.CreateAsync(new IdentityRole(role_Administrator));
            // create a list to track the newly added users
            var addedUserList = new List<ApplicationUser>();

            // check if the admin user already exists
            var email_Admin = "admin@email.com";
            if (await _userManager.FindByNameAsync(email_Admin) == null)
            {
                // create a new admin ApplicationUser account
                var user_Admin = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = email_Admin,
                    Email = email_Admin,
                };
                // insert the admin user into the DB
                await _userManager.CreateAsync(user_Admin, "MySecr3t$");
                // assign the "RegisteredUser" and "Administrator" roles
                await _userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await _userManager.AddToRoleAsync(user_Admin, role_Administrator);
                // confirm the e-mail and remove lockout
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
                // add the admin user to the added users list
                addedUserList.Add(user_Admin);


                //add access to system for admin
                var objaccessCode = new UserAccessCodeService(_context);
                List<int> accessCode = new List<int>();
                accessCode.Add(Convert.ToInt32(AccessCodeEnum.ViewCountrys));
                await objaccessCode.Save(Guid.Parse(user_Admin.Id), accessCode);
            }

            // check if the standard user already exists
            var email_User = "user@email.com";
            if (await _userManager.FindByNameAsync(email_User) == null)
            {
                // create a new standard ApplicationUser account
                var user_User = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = email_User,
                    Email = email_User
                };
                // insert the standard user into the DB
                await _userManager.CreateAsync(user_User, "MySecr3t$");
                // assign the "RegisteredUser" role
                await _userManager.AddToRoleAsync(user_User, role_RegisteredUser);
                // confirm the e-mail and remove lockout
                user_User.EmailConfirmed = true;
                user_User.LockoutEnabled = false;
                // add the standard user to the added users list
                addedUserList.Add(user_User);
            }

            // if we added at least one user, persist the changes into the DB
            if (addedUserList.Count > 0)
                await _context.SaveChangesAsync();
            return new JsonResult(new
            {
                Count = addedUserList.Count,
                Users = addedUserList
            });
        }
    }*/

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISettingsService<SettingsModel> _settingsService;
        private readonly IUserAccessService<UserAccessModel> _userAccessService;

        private readonly IEmailSenderService _emailSenderService;
        private readonly IOrderService<OrderModel> _orderService;

        public SeedController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ISettingsService<SettingsModel> settingsService, IUserAccessService<UserAccessModel> userAccessService, IEmailSenderService emailSenderService, IOrderService<OrderModel> orderService)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _settingsService = settingsService;
            _userAccessService = userAccessService;
            _emailSenderService = emailSenderService;
            _orderService = orderService;
        }

        [HttpGet]
        [ActionName("CreateDefaultUsers")]
        public async Task<ActionResult> CreateDefaultUsers()
        {
            // create the default roles (if they don't exist yet)
            if (await _roleManager.FindByNameAsync(Enum.GetName(RoleTypeEnum.Admin)) == null)
                await _roleManager.CreateAsync(new IdentityRole(Enum.GetName(RoleTypeEnum.Admin)));
            if (await _roleManager.FindByNameAsync(Enum.GetName(RoleTypeEnum.User)) == null)
                await _roleManager.CreateAsync(new IdentityRole(Enum.GetName(RoleTypeEnum.User)));
            if (await _roleManager.FindByNameAsync(Enum.GetName(RoleTypeEnum.Client)) == null)
                await _roleManager.CreateAsync(new IdentityRole(Enum.GetName(RoleTypeEnum.Client)));

            // create a list to track the newly added users
            var addedUserList = new List<ApplicationUser>();

            // check if the admin user already exists
            var email_Admin = "admin@email.com";
            if (await _userManager.FindByNameAsync(email_Admin) == null)
            {
                // create a new admin ApplicationUser account
                var user_Admin = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = email_Admin,
                    Email = email_Admin,
                    CountryId = 1
                };
                // insert the admin user into the DB
                await _userManager.CreateAsync(user_Admin, "MySecr3t$");
                // assign the "RegisteredUser" and "Administrator" roles
                await _userManager.AddToRoleAsync(user_Admin, Enum.GetName(RoleTypeEnum.Admin));
                // confirm the e-mail and remove lockout
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
                user_Admin.Active = true;
                user_Admin.RoleType = 1;
                // add the admin user to the added users list
                addedUserList.Add(user_Admin);


                //add access to system for admin
                /*var objaccessCode = new UserAccessCodeService(_context);
                List<int> accessCode = new List<int>();
                accessCode.Add(Convert.ToInt32(AccessCodeEnum.ViewCountrys));
                await objaccessCode.Save(Guid.Parse(user_Admin.Id), accessCode);*/
            }

            // if we added at least one user, persist the changes into the DB
            if (addedUserList.Count > 0)
                await _context.SaveChangesAsync();
            return new JsonResult(new
            {
                Count = addedUserList.Count,
                Users = addedUserList
            });
        }

        [HttpGet]
        [ActionName("CreateUserAccess")]
        public async Task<bool> CreateUserAccess()
        {
            var user = await _userManager.FindByEmailAsync("admin@email.com");
            bool result = false;

            if (user != null)
            {
                List<int> _accessCode = new List<int>();
                foreach (int item in Enum.GetValues<UserAccessCodeEnum>())
                {
                    _accessCode.Add(item);
                }

                UserAccessDto _userAccess = new UserAccessDto();
                _userAccess.UserId = Guid.Parse(user.Id);
                _userAccess.AccessCode = _accessCode.ToArray();
                result = _userAccessService.Insert(_userAccess);
            }

            return result;
        }

        [HttpGet]
        [ActionName("CreateSettings")]
        public ActionResult<bool> CreateSettings()
        {
            var settings = _settingsService.GetAll();

            if (settings.Id == 0)
            {
                SettingsDto setting = new SettingsDto();
                setting.Boarding = 0;
                setting.Daily = 1;
                setting.NumbersOfDayForSelect = 1;
                setting.NumbersOfDayForSupport = 1;

                return _settingsService.Insert(SettingsMapper.ToModel(setting));
            }
            else
            {
                return false;
            }
        }
    }
}
