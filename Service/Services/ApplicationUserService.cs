using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices;
using Domain.Models;
using Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Domain.Dto;

namespace Service.Services
{
    public class ApplicationUserService : IApplicationUserService<ApplicationUser>
    {
        private readonly IApplicationUserRepository<ApplicationUser> _applicationUserRepository;

        public ApplicationUserService(IApplicationUserRepository<ApplicationUser> applicationUserRepository)
        {
            _applicationUserRepository = applicationUserRepository;
        }

        public IEnumerable<ApplicationUser> GetAll()
        {
            return _applicationUserRepository.GetAll();
        }

        public IEnumerable<ApplicationUser> Search(ApplicationUserSearchDto input)
        {
            return _applicationUserRepository.Search(input);
        }

        public bool Insert(ApplicationUser user, int role, string password)
        {
            return _applicationUserRepository.Insert(user, role, password).Result;
        }

        public bool Update(ApplicationUser user)
        {
            try
            {
                return _applicationUserRepository.Update(user).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool ChangePassword(ApplicationUser user, string newPassword)
        {
            return _applicationUserRepository.ChangePassword(user, newPassword).Result;//*********
        }

        public ApplicationUser Get(string userId)
        {
            return _applicationUserRepository.Get(userId);
        }
    }
}
