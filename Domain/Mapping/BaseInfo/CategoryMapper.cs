using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class CategoryMapper
    {
        public static CategoryDto ToDto(this CategoryModel category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Deleted = Convert.ToInt32(category.Deleted),
                Active = Convert.ToInt32(category.Active)
            };
        }

        public static IEnumerable<CategoryDto> ToDto(IEnumerable<CategoryModel> category)
        {
            return category.Select(x => x.ToDto());
        }

        public static CategoryModel ToModel(CategoryDto category)
        {
            return new CategoryModel
            {
                Id = category.Id,
                Name = category.Name,
                Deleted = Convert.ToBoolean(category.Deleted),
                Active = Convert.ToBoolean(category.Active)
            };
        }
    }
}
