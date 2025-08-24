/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Data;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Service.Services
{
    public class UserAccessCodeService
    {
        private readonly ApplicationDbContext _context;

        public UserAccessCodeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<bool>> Save(Guid userId, List<int> accessCode)
        {
            var result = from c in _context.UserAccess where c.UserId == userId select c;
            if (result.Count() > 0)
            {
                _context.UserAccess.RemoveRange(result);

                var newUserAccessCode = new UserAccessCodeModel();
                foreach (int item in accessCode)
                {
                    newUserAccessCode.Id = Guid.NewGuid();
                    newUserAccessCode.UserId = userId;
                    newUserAccessCode.AccessCode = item;

                    _context.UserAccess.Add(newUserAccessCode);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                var newUserAccessCode = new UserAccessModel();
                foreach (int item in accessCode)
                {
                    newUserAccessCode.Id = Guid.NewGuid();
                    newUserAccessCode.UserId = userId;
                    newUserAccessCode.AccessCode = item;

                    _context.UserAccessCode.Add(newUserAccessCode);
                    await _context.SaveChangesAsync();
                }
            }

            return true;
        }

        public List<int> Get(Guid userId)
        {
            var result = from c in _context.UserAccess where c.UserId == userId select c.AccessCode;
            return result.ToList();
        }
    }
}
*/