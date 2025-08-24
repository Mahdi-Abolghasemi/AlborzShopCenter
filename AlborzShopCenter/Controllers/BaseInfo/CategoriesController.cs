using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Service.IServices.BaseInfo;
using Domain.Mapping.BaseInfo;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers.BaseInfo
{
    [Authorize(Roles = "Admin , User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService<CategoryModel> _categoryService;

        public CategoriesController(ICategoryService<CategoryModel> categoryService)
        {
            _categoryService = categoryService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<CategoryDto> GetCategories()
        {
            return CategoryMapper.ToDto(_categoryService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<CategoryDto> Search(SearchCategoryDto input)
        {
            var result = _categoryService.Search(input);
            return CategoryMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutCategory(CategoryDto category)
        {
            return _categoryService.Update(CategoryMapper.ToModel(category));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostCategory(CategoryDto category)
        {
            return _categoryService.Insert(CategoryMapper.ToModel(category));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteCategory(int id)
        {
            return _categoryService.Delete(id);
        }
    }
}
