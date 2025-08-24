using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Advertising;

namespace Service.IServices.Advertising
{
    public interface IAdverCategoriesAndFeaturesDetailsService<T> where T : class
    {
        bool Insert(IEnumerable<T> entity);
        bool Update(IEnumerable<T> entity);
        bool Delete(int adverCategoriesAndFeaturesDetailsId);
        Guid UploadFile(FeaturesDetailsFileUploadDto data);
        bool RemoveUploadFile(string path);
    }
}
