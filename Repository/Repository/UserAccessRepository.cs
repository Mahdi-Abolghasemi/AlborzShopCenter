using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Domain.Data;


namespace Repository.Repository
{
    public class UserAccessRepository<T> : IUserAccessRepository<T> where T : UserAccessModel
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;

        public UserAccessRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }

        public List<int> Get(string userId)
        {
            var userAccess = from u in entities
                             where u.UserId == Guid.Parse(userId)
                             select u.AccessCode;

            return userAccess.ToList();
        }

        public async Task<bool> Insert(Guid userId, IEnumerable<T> entity)
        {
            try
            {
                var result = from u in entities
                             where u.UserId == userId
                             select u;

                if (result.Count() > 0)
                {
                    entities.RemoveRange(result);
                    entities.AddRange(entity);
                    await _applicationDbContext.SaveChangesAsync();
                }
                else
                {
                    entities.AddRange(entity);
                    await _applicationDbContext.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
