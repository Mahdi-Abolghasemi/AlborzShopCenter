using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Dto;
using Service.IServices;
using Domain.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace AlborzShopCenter.Controllers
{
    [Authorize(Roles = "Admin , User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly IProductService<ProductModel> _productService;
        public ProductsController(IProductService<ProductModel> productService)//, IWebHostEnvironment env)
        {
            _productService = productService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetAll")]
        public IEnumerable<ProductDto> GetProducts()
        {
            return ProductMapper.ToDto(_productService.GetAll()).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Get")]
        public IEnumerable<ProductDto> Get([FromForm] int productId)
        {
            var result = _productService.Get(productId);
            return ProductMapper.ToDto(result).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search_Visitor")]
        public IEnumerable<ProductDto> Search_Visitor([FromForm] string valueSearch)
        {
            var result = _productService.Search(valueSearch);
            return ProductMapper.ToDto(result).ToList();
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("Search")]
        public IEnumerable<ProductDto> Search(ProductSearchDto product)
        {
            var result = _productService.Search(product);
            return ProductMapper.ToDto(result).ToList();
        }

        [HttpPost]
        [ActionName("Put")]
        public ActionResult<bool> PutProduct(ProductDto product)
        {
            return _productService.Update(ProductMapper.ToModel(product));
        }

        [HttpPost]
        [ActionName("Post")]
        public ActionResult<bool> PostProduct(ProductDto product)
        {
            return _productService.Insert(ProductMapper.ToModel(product));
        }

        [HttpPost("{id}")]
        [ActionName("Delete")]
        public ActionResult<bool> DeleteProduct(int id)
        {
            return _productService.Delete(id);
        }

        [HttpPost]
        [ActionName("UploadFile")]
        public ActionResult<Guid> UploadFile([FromForm] ProductFileUploadDto data)
        {
            return _productService.UploadFile(data);
        }

        [HttpPost]
        [ActionName("RemoveUploadFile")]
        public void RemoveUploadFile([FromForm] ProductFileUploadDto data)
        {
            _productService.RemoveUploadFile(data);
        }
    }
}
