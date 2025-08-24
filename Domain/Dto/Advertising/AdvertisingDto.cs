using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain.Dto.Advertising
{
    public class AdvertisingDto
    {
        public int Id { get; set; }
        public string ImagesName { get; set; }
        public string LinkPath { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public int HasCaption { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CaptionStyleDto CaptionStyle { get; set; }
        public int HasTag { get; set; }
        public string TagTitle { get; set; }
        public string TagText { get; set; }
        public TagStyleDto TagStyle { get; set; }
    }

    public class AdvertisingFileUploadDto
    {
        public IFormFile FileUpload { get; set; }
        public string FileName { get; set; }
    }

    public class CaptionStyleDto
    {
        public int Value { get; set; }
        public string Code { get; set; }
        public string Color { get; set; }
    }

    public class TagStyleDto
    {
        public int Value { get; set; }
        public string Code { get; set; }
        public string BackgroundColor { get; set; }
        public string FontColor { get; set; }
    }
}
