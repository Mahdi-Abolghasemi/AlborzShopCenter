using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Footer;

namespace Service.IServices.Footer
{
    public interface IHelpService
    {
        IEnumerable<HelpDto> Read();
        bool Write(HelpDto input);
        bool Delete(Guid id);
    }
}
