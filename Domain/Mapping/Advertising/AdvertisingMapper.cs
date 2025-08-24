using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Advertising;
using Domain.Models.Advertising;

namespace Domain.Mapping.Advertising
{
    public static class AdvertisingMapper
    {
        public static AdvertisingDto ToDto(this AdvertisingModel advertising)
        {
            return new AdvertisingDto
            {
                Id = advertising.Id,
                ImagesName = advertising.ImagesName,
                LinkPath = advertising.LinkPath,
                Deleted = Convert.ToInt32(advertising.Deleted),
                Active = Convert.ToInt32(advertising.Active),
                HasCaption = Convert.ToInt32(advertising.HasCaption),
                Title = advertising.Title,
                Description = advertising.Description,
                CaptionStyle = CaptionStyleMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<CaptionStyleDto>(advertising.CaptionStyle)),
                HasTag = Convert.ToInt32(advertising.HasTag),
                TagTitle = advertising.TagTitle,
                TagText = advertising.TagText,
                TagStyle = TagStyleMapper.ToDto(Newtonsoft.Json.JsonConvert.DeserializeObject<TagStyleDto>(advertising.TagStyle))
            };
        }

        public static IEnumerable<AdvertisingDto> ToDto(IEnumerable<AdvertisingModel> advertising)
        {
            return advertising.Select(x => x.ToDto());
        }

        public static AdvertisingModel ToModel(this AdvertisingDto advertising)
        {
            return new AdvertisingModel
            {
                Id = advertising.Id,
                ImagesName = advertising.ImagesName,
                LinkPath = advertising.LinkPath,
                Deleted = Convert.ToBoolean(advertising.Deleted),
                Active = Convert.ToBoolean(advertising.Active),
                HasCaption = Convert.ToBoolean(advertising.HasCaption),
                Title = advertising.Title,
                Description = advertising.Description,
                CaptionStyle = Newtonsoft.Json.JsonConvert.SerializeObject(advertising.CaptionStyle),
                HasTag = Convert.ToBoolean(advertising.HasTag),
                TagTitle = advertising.TagTitle,
                TagText = advertising.TagText,
                TagStyle = Newtonsoft.Json.JsonConvert.SerializeObject(advertising.TagStyle)
            };
        }
    }

    public static class CaptionStyleMapper
    {
        public static CaptionStyleDto ToDto(this CaptionStyleDto captionStyle)
        {
            return new CaptionStyleDto
            {
                Value = captionStyle.Value,
                Code = captionStyle.Code,
                Color = captionStyle.Color
            };
        }
    }

    public static class TagStyleMapper
    {
        public static TagStyleDto ToDto(this TagStyleDto tagStyle)
        {
            return new TagStyleDto
            {
                Value = tagStyle.Value,
                Code = tagStyle.Code,
                BackgroundColor = tagStyle.BackgroundColor,
                FontColor = tagStyle.FontColor
            };
        }
    }
}
