using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class TimeSendingDto
    {
        public int Id { get; set; }
        public string Of { get; set; }
        public string To { get; set; }
        public int Deleted { get; set; }
        public int Active { get; set; }
        public int MaximumNumberOfOrders { get; set; }
        public int OrderPreparationTime { get; set; }
    }

    public class TimeSendingSearchDto
    {
        public string Of { get; set; }
        public string To { get; set; }
        public int Active { get; set; }
    }
}
