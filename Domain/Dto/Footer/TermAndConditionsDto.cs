using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.Footer
{
    public class TermAndConditionsDto
    {
        public Guid Id { get; set; }
        public DateTime EditingTime { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
