using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.Advertising;
using Domain.Models.Advertising;
using Repository.IRepository.Advertising;
using Domain.Dto.Advertising;

namespace Service.Services.Advertising
{
    public class AdverCategoriesAndFeaturesDetailsService : IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel>
    {
        private readonly IAdverCategoriesAndFeaturesDetailsRepository<AdverCategoriesAndFeaturesDetailsModel> _adverCategoriesAndFeaturesDetailsRepository;

        public AdverCategoriesAndFeaturesDetailsService(IAdverCategoriesAndFeaturesDetailsRepository<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetailsRepository)
        {
            _adverCategoriesAndFeaturesDetailsRepository = adverCategoriesAndFeaturesDetailsRepository;
        }

        public bool Insert(IEnumerable<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetails)
        {
            return _adverCategoriesAndFeaturesDetailsRepository.Insert(adverCategoriesAndFeaturesDetails).Result;
        }

        public bool Update(IEnumerable<AdverCategoriesAndFeaturesDetailsModel> adverCategoriesAndFeaturesDetails)
        {
            return _adverCategoriesAndFeaturesDetailsRepository.Update(adverCategoriesAndFeaturesDetails).Result;
        }

        public bool Delete(int adverCategoriesAndFeaturesDetailsId)
        {
            return _adverCategoriesAndFeaturesDetailsRepository.Delete(adverCategoriesAndFeaturesDetailsId).Result;//*********
        }

        public Guid UploadFile(FeaturesDetailsFileUploadDto data)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\Images");
            path = string.Concat(path, @"\ClientApp\build\Images");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\Advertising\AdverCategoriesAndFeaturesDetails");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            Guid FolderName = new Guid();
            if (string.IsNullOrEmpty(data.FolderName))
            //if (Guid.Equals(Guid.Empty,data.FolderName))
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

        public bool RemoveUploadFile(string inputPath)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //path = string.Concat(path, @"\ClientApp\public");
            path = string.Concat(path, @"\ClientApp\build");
            path = string.Concat(path, inputPath);

            if (System.IO.File.Exists(path))
            {
                try
                {
                    System.IO.File.Delete(path);
                    return true;
                }
                catch(Exception ex)
                {
                    return false;
                }
                
            }
            else
            {
                return false;
            }
        }
    }
}
