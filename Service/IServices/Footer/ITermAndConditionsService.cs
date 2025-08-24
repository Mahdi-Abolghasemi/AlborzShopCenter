using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Footer;

namespace Service.IServices.Footer
{
    public interface ITermAndConditionsService
    {
        IEnumerable<TermAndConditionsDto> Read();
        bool Write(TermAndConditionsDto input);
        bool Delete(Guid id);
    }
}
