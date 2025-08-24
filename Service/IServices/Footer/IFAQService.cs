using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Footer;

namespace Service.IServices.Footer
{
    public interface IFAQService
    {
        IEnumerable<FAQDto> Read();
        bool Write(FAQDto input);
        bool Delete(Guid id);
    }
}
