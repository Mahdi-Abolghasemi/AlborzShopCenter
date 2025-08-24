using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain.Dto.Advertising
{
    public class AdverCategoriesAndFeaturesDetailsDto
    {
        public int Id { get; set; }
        public int AdverCategoriesAndFeaturesId { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public int? GroupId { get; set; }
        public string GroupName { get; set; }
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ImagePath { get; set; }
    }

    public class FeaturesDetailsFileUploadDto
    {
        public IFormFile FileUpload { get; set; }
        public string FileName { get; set; }
        public string FolderName { get; set; }
    }
}
