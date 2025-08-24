using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.Advertising;
using Domain.Models.Advertising;
using Domain.Dto.Advertising;
using Repository.IRepository.Advertising;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.Advertising
{
    public class AdvertisingService : IAdvertisingService<AdvertisingModel>
    {
        private readonly IAdvertisingRepository<AdvertisingModel> _advertisingRepository;

        public AdvertisingService(IAdvertisingRepository<AdvertisingModel> advertisingRepository)
        {
            _advertisingRepository = advertisingRepository;
        }

        public IEnumerable<AdvertisingModel> GetAll()
        {
            return _advertisingRepository.GetAll();
        }

        public bool Insert(AdvertisingModel advertising)
        {
            return _advertisingRepository.Insert(advertising).Result;
        }

        public bool Update(AdvertisingModel advertising)
        {
            try
            {
                return _advertisingRepository.Update(advertising).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _advertisingRepository.Delete(id).Result;//*********
        }

        public bool UploadFile(AdvertisingFileUploadDto data)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\Images");
            path = string.Concat(path, @"\ClientApp\build\Images");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\Advertising\Advertising");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\", data.FileName);

            try
            {
                using (var memoryStream = new System.IO.FileStream(path, System.IO.FileMode.Create))
                {
                    data.FileUpload.CopyTo(memoryStream);
                }
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
