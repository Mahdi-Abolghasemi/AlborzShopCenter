using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public string Descriptions { get; set; }
        public string FolderName { get; set; }
        public string[] Images{ get; set; }
        public ProductAttributeDto[] Attributes { get; set; }
        public ProductColorDto[] Colors { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public int? BrandId { get; set; }
        public string BrandName { get; set; }
        public int? ShopId { get; set; }
        public string ShopName { get; set; }
        public int TotalInventory { get; set; }
        public int? GroupId { get; set; }
        public string GroupName { get; set; }
        public int HasSize { get; set; }
        public int SizeType { get; set; }
        public ProductSizeDto[] Sizes { get; set; }
    }

    public class ProductSearchDto
    {
        public string Name { get; set; }
        public string Model { get; set; }
        public int Active { get; set; }
        public int BrandId { get; set; }
        public int ShopId { get; set; }
        public int GroupId { get; set; }
    }

    public class ProductFileUploadDto
    {
        public IFormFile FileUpload { get; set; }
        public string FileName { get; set; }
        public string FolderName { get; set; }
    }

    public class ProductAttributeDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
    }

    public class ProductColorDto
    {
        public string Id { get; set; }
        public string Color { get; set; }
        public int Inventory { get; set; }
        public decimal Price { get; set; }
    }

    public class ProductSizeDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ColorId { get; set; }
        public int Inventory { get; set; }
        public decimal Price { get; set; }
    }
}
