using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices;
using Domain.Models;
using Domain.Dto;
using Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace Service.Services
{
    public class ProductService : IProductService<ProductModel>
    {
        private readonly IProductRepository<ProductModel> _productRepository;

        public ProductService(IProductRepository<ProductModel> productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<ProductModel> GetAll()
        {
            return _productRepository.GetAll();
        }

        public IEnumerable<ProductModel> Get(int productId)
        {
            return _productRepository.Get(productId);
        }

        public IEnumerable<ProductModel> Search(string input)
        {
            return _productRepository.Search(input);
        }

        public IEnumerable<ProductModel> Search(ProductSearchDto input)
        {
            return _productRepository.Search(input);
        }

        public bool Insert(ProductModel product)
        {
            return _productRepository.Insert(product).Result;
        }

        public bool Update(ProductModel product)
        {
            try
            {
                return _productRepository.Update(product).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _productRepository.Delete(id).Result;//*********
        }

        public Guid UploadFile(ProductFileUploadDto data)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\Images");
            path = string.Concat(path, @"\ClientApp\build\Images");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\Products");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            Guid FolderName = new Guid();
            if (string.IsNullOrEmpty(data.FolderName))
            {
                FolderName = Guid.NewGuid();
                path = string.Concat(path, @"\", FolderName);
                System.IO.Directory.CreateDirectory(path);

                path = string.Concat(path, @"\", data.FileName);
                using (var memoryStream = new System.IO.FileStream(path, System.IO.FileMode.Create))
                {
                    data.FileUpload.CopyTo(memoryStream);
                }
            }
            else
            {
                FolderName = Guid.Parse(data.FolderName);
                path = string.Concat(path, @"\", FolderName);
                if (!System.IO.Directory.Exists(path))
                    System.IO.Directory.CreateDirectory(path);

                path = string.Concat(path, @"\", data.FileName);
                using (var memoryStream = new System.IO.FileStream(path, System.IO.FileMode.Create))
                {
                    data.FileUpload.CopyTo(memoryStream);
                }
            }

            return FolderName;
        }

        public void RemoveUploadFile(ProductFileUploadDto data)
        {
            string _path = System.IO.Directory.GetCurrentDirectory();
            //_path = string.Concat(_path, @"\ClientApp\public\Images");
            _path = string.Concat(_path, @"\ClientApp\build\Images");
            _path = string.Concat(_path, @"\Products");
            _path= string.Concat(_path, @"\", data.FolderName);
            _path = string.Concat(_path, @"\", data.FileName);

            if (System.IO.File.Exists(_path))
            {
                System.IO.File.Delete(_path);
            }
        }

        public void MinusNumber(int productId, int number, string colorId, string sizeId)
        {
            _productRepository.MinusNumber(productId, number, colorId, sizeId);
        }
    }
}
