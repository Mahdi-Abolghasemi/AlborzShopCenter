using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;
using Service.IServices;
using Repository.IRepository;

namespace Service.Services
{
    public class UserAccessService : IUserAccessService<UserAccessModel>
    {
        private readonly IUserAccessRepository<UserAccessModel> _userAccessRepository;

        public UserAccessService(IUserAccessRepository<UserAccessModel> userAccessRepository)
        {
            _userAccessRepository = userAccessRepository;
        }

        public List<int> Get(string userId)
        {
            return _userAccessRepository.Get(userId);
        }

        public bool Insert(UserAccessDto input)
        {
            List<UserAccessModel> userAccess = new List<UserAccessModel>();
            foreach (int item in input.AccessCode)
            {
                var newUserAccess = new UserAccessModel();
                newUserAccess.Id = Guid.NewGuid();
                newUserAccess.UserId = input.UserId;
                newUserAccess.AccessCode = item;
                userAccess.Add(newUserAccess);
            }
            return _userAccessRepository.Insert(input.UserId, userAccess).Result;
        }
    }
}
