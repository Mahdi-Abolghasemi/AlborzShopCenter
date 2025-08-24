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
    public class ShopService : IShopService<ShopModel>
    {
        private readonly IShopRepository<ShopModel> _shopRepository;

        public ShopService(IShopRepository<ShopModel> shopRepository)
        {
            _shopRepository = shopRepository;
        }

        public IEnumerable<ShopModel> GetAll()
        {
            return _shopRepository.GetAll();
        }

        public IEnumerable<ShopModel> Search(SearchShopDto input)
        {
            return _shopRepository.Search(input);
        }

        public bool Insert(ShopModel shop)
        {
            return _shopRepository.Insert(shop).Result;
        }

        public bool Update(ShopModel shop)
        {
            try
            {
                return _shopRepository.Update(shop).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _shopRepository.Delete(id).Result;//*********
        }
    }
}
