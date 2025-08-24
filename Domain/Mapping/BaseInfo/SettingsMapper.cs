using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class SettingsMapper
    {
        public static SettingsDto ToDto(this SettingsModel setting)
        {
            return new SettingsDto
            {
                Id = setting.Id,
                Boarding = Convert.ToInt32(setting.Boarding),
                Daily = Convert.ToInt32(setting.Daily),
                NumbersOfDayForSelect = setting.NumbersOfDayForSelect,
                NumbersOfDayForSupport = setting.NumbersOfDayForSupport
            };
        }

        public static SettingsModel ToModel(SettingsDto setting)
        {
            return new SettingsModel
            {
                Id = setting.Id,
                Boarding = Convert.ToBoolean(setting.Boarding),
                Daily = Convert.ToBoolean(setting.Daily),
                NumbersOfDayForSelect = setting.NumbersOfDayForSelect,
                NumbersOfDayForSupport = setting.NumbersOfDayForSupport
            };
        }
    }
}
