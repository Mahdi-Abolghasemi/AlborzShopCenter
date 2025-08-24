using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;
using Domain.Models;

namespace Domain.Mapping
{
    public static class ProductMapper
    {
        public static ProductDto ToDto(this ProductModel product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Deleted = Convert.ToInt32(product.Deleted),
                Active = Convert.ToInt32(product.Active),
                Descriptions = product.Descriptions,
                FolderName = product.FolderName,
                Images = product.Images.Split(','),
                Attributes = string.IsNullOrEmpty(product.Attributes) ? new List<ProductAttributeDto>().ToArray() : ProductAttributeMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProductAttributeDto>>(product.Attributes)).ToArray(),
                Colors = string.IsNullOrEmpty(product.Colors) ? new List<ProductColorDto>().ToArray() : ProductColorMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProductColorDto>>(product.Colors)).ToArray(),
                Model = product.Model,
                Price = product.Price,
                BrandId = product.BrandId,
                BrandName = product.Brand.Name,
                ShopId = product.ShopId,
                ShopName = product.Shop.Name,
                TotalInventory = product.TotalInventory,
                GroupId = product.GroupId,
                GroupName = product.Group.Name,
                HasSize = Convert.ToInt32(product.HasSize),
                SizeType = product.SizeType,
                Sizes = string.IsNullOrEmpty(product.Sizes) ? new List<ProductSizeDto>().ToArray() : ProductSizeMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProductSizeDto>>(product.Sizes)).ToArray(),
            };
        }

        public static IEnumerable<ProductDto> ToDto(IEnumerable<ProductModel> product)
        {
            return product.Select(x => x.ToDto());
        }

        public static ProductModel ToModel(this ProductDto product)
        {
            return new ProductModel
            {
                Id = product.Id,
                Name = product.Name,
                Deleted = Convert.ToBoolean(product.Deleted),
                Active = Convert.ToBoolean(product.Active),
                Descriptions = product.Descriptions,
                FolderName = product.FolderName,
                Images = string.Join(",", product.Images.Select(i => i.ToString()).ToArray()),
                Attributes = Newtonsoft.Json.JsonConvert.SerializeObject(product.Attributes),
                Colors = Newtonsoft.Json.JsonConvert.SerializeObject(product.Colors),
                Model = product.Model,
                Price = product.Price,
                BrandId = product.BrandId,
                ShopId = product.ShopId,
                TotalInventory = product.TotalInventory,
                GroupId = product.GroupId,
                HasSize = Convert.ToBoolean(product.HasSize),
                SizeType = product.SizeType,
                Sizes = Newtonsoft.Json.JsonConvert.SerializeObject(product.Sizes)
            };
        }
    }

    public static class ProductAttributeMapper
    {
        public static ProductAttributeDto ToDto(this ProductAttributeDto attribute)
        {
            return new ProductAttributeDto
            {
                Id = attribute.Id,
                Title = attribute.Title,
                Value = attribute.Value
            };
        }

        public static IEnumerable<ProductAttributeDto> ToDto(IEnumerable<ProductAttributeDto> attribute)
        {
            return attribute.Select(x => x.ToDto());
        }
    }

    public static class ProductColorMapper
    {
        public static ProductColorDto ToDto(this ProductColorDto color)
        {
            return new ProductColorDto
            {
                Id = color.Id,
                Color = color.Color,
                Inventory = color.Inventory,
                Price = color.Price
            };
        }

        public static IEnumerable<ProductColorDto> ToDto(IEnumerable<ProductColorDto> color)
        {
            return color.Select(x => x.ToDto());
        }
    }

    public static class ProductSizeMapper
    {
        public static ProductSizeDto ToDto(this ProductSizeDto size)
        {
            return new ProductSizeDto
            {
                Id = size.Id,
                Title = size.Title,
                ColorId = size.ColorId,
                Inventory = size.Inventory,
                Price = size.Price
            };
        }

        public static IEnumerable<ProductSizeDto> ToDto(IEnumerable<ProductSizeDto> size)
        {
            return size.Select(x => x.ToDto());
        }
    }
}
