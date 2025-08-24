using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class UserAccessDto
    {
        public Guid UserId { get; set; }
        public int[] AccessCode { get; set; }
    }
}
