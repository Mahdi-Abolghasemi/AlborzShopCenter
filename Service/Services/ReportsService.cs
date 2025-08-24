using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Service.Services
{
    public class ReportsService : IReportsService
    {
        public IActionResult GetReportFile(string reportName)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            path = string.Concat(path, @"\ClientApp\build\Reports\");
            //path = string.Concat(path, @"\ClientApp\public\Reports\");
            path = string.Concat(path, reportName);

            var stream = new System.IO.FileStream(path, System.IO.FileMode.Open);

            return new FileStreamResult(stream, "application/octet-stream");
        }
    }
}
