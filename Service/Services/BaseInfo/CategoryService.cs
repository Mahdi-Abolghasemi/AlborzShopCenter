using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.BaseInfo;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.BaseInfo
{
    public class CategoryService : ICategoryService<CategoryModel>
    {
        private readonly ICategoryRepository<CategoryModel> _categoryRepository;

        public CategoryService(ICategoryRepository<CategoryModel> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public IEnumerable<CategoryModel> GetAll()
        {
            return _categoryRepository.GetAll();
        }

        public IEnumerable<CategoryModel> Search(SearchCategoryDto input)
        {
            return _categoryRepository.Search(input);
        }

        public bool Insert(CategoryModel category)
        {
            return _categoryRepository.Insert(category).Result;
        }

        public bool Update(CategoryModel category)
        {
            try
            {
                return _categoryRepository.Update(category).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _categoryRepository.Delete(id).Result;//*********
        }
    }
}
