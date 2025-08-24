using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;

namespace Domain.Mapping.BaseInfo
{
    public static class TimeSendingMapper
    {
        public static TimeSendingDto ToDto(this TimeSendingModel timeSending)
        {
            return new TimeSendingDto
            {
                Id = timeSending.Id,
                Of = timeSending.Of.ToString().Substring(0, 5),
                To = timeSending.To.ToString().Substring(0, 5),
                Deleted = Convert.ToInt32(timeSending.Deleted),
                Active = Convert.ToInt32(timeSending.Active),
                MaximumNumberOfOrders = timeSending.MaximumNumberOfOrders,
                OrderPreparationTime = timeSending.OrderPreparationTime
            };
        }

        public static IEnumerable<TimeSendingDto> ToDto(IEnumerable<TimeSendingModel> timeSendings)
        {
            return timeSendings.Select(x => x.ToDto());
        }

        public static TimeSendingModel ToModel(TimeSendingDto timeSending)
        {
            return new TimeSendingModel
            {
                Id = timeSending.Id,
                Of = DateTime.Parse(timeSending.Of).TimeOfDay,
                To = DateTime.Parse(timeSending.To).TimeOfDay,
                Deleted = Convert.ToBoolean(timeSending.Deleted),
                Active = Convert.ToBoolean(timeSending.Active),
                MaximumNumberOfOrders = timeSending.MaximumNumberOfOrders,
                OrderPreparationTime = timeSending.OrderPreparationTime
            };
        }
    }
}
