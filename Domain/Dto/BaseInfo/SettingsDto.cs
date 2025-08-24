using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.BaseInfo
{
    public class SettingsDto
    {
        public int Id { get; set; }
        public int Boarding { get; set; }
        public int Daily { get; set; }
        public int NumbersOfDayForSelect { get; set; }
        public int NumbersOfDayForSupport { get; set; }
    }
}
