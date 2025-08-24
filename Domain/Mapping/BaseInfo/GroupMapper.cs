using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class GroupMapper
    {
        public static GroupDto ToDto(this GroupModel group)
        {
            return new GroupDto
            {
                Id = group.Id,
                Name = group.Name,
                Deleted = Convert.ToInt32(group.Deleted),
                Active = Convert.ToInt32(group.Active),
                CategoryId = group.CategoryId,
                CategoryName = group.Category.Name
            };
        }

        public static IEnumerable<GroupDto> ToDto(IEnumerable<GroupModel> group)
        {
            return group.Select(x => x.ToDto());
        }

        public static GroupModel ToModel(GroupDto group)
        {
            return new GroupModel
            {
                Id = group.Id,
                Name = group.Name,
                Deleted = Convert.ToBoolean(group.Deleted),
                Active = Convert.ToBoolean(group.Active),
                CategoryId = group.CategoryId
            };
        }
    }
}
