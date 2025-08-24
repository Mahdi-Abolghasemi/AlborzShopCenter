using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.BaseInfo;
using Domain.Models.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;
using Domain.Dto.BaseInfo;

namespace Service.Services.BaseInfo
{
    public class GroupService : IGroupService<GroupModel>
    {
        private readonly IGroupRepository<GroupModel> _groupRepository;

        public GroupService(IGroupRepository<GroupModel> groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public IEnumerable<GroupModel> GetAll()
        {
            return _groupRepository.GetAll();
        }

        public IEnumerable<GroupModel> Search(GroupDto input)
        {
            return _groupRepository.Search(input);
        }

        public bool Insert(GroupModel group)
        {
            return _groupRepository.Insert(group).Result;
        }

        public bool Update(GroupModel group)
        {
            try
            {
                return _groupRepository.Update(group).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _groupRepository.Delete(id).Result;//*********
        }
    }
}
