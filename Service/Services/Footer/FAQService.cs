using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.Footer;
using Service.IServices.Footer;
using System.Text.Json;

namespace Service.Services.Footer
{
    public class FAQService : IFAQService
    {
        public IEnumerable<FAQDto> Read()
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\File");
            path = string.Concat(path, @"\ClientApp\build\File");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\FAQ.txt");

            if (System.IO.File.Exists(path))
            {
                string jsonString = System.IO.File.ReadAllText(path);
                var data = JsonSerializer.Deserialize<List<FAQDto>>(jsonString);

                return data;
            }
            else
                return Array.Empty<FAQDto>();
        }

        public bool Write(FAQDto input)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\File");
            path = string.Concat(path, @"\ClientApp\build\File");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\FAQ.txt");
            string jsonString;

            try
            {
                if (input.Id == Guid.Empty)
                {
                    input.Id = Guid.NewGuid();

                    if (System.IO.File.Exists(path))
                    {
                        jsonString = System.IO.File.ReadAllText(path);
                        var data = JsonSerializer.Deserialize<List<FAQDto>>(jsonString);
                        data.Add(input);
                        System.IO.File.Delete(path);
                        jsonString = JsonSerializer.Serialize(data);
                        System.IO.File.WriteAllText(path, jsonString);
                    }
                    else
                    {
                        List<FAQDto> data = new List<FAQDto>();
                        data.Add(input);
                        jsonString = JsonSerializer.Serialize(data);
                        System.IO.File.WriteAllText(path, jsonString);
                    }
                }
                else
                {
                    jsonString = System.IO.File.ReadAllText(path);
                    var data = JsonSerializer.Deserialize<List<FAQDto>>(jsonString);
                    int indexOf = data.FindIndex(i => i.Id == input.Id);

                    if (indexOf > -1)
                    {
                        data[indexOf] = input;
                        System.IO.File.Delete(path);
                        jsonString = JsonSerializer.Serialize(data);
                        System.IO.File.WriteAllText(path, jsonString);
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(Guid id)
        {
            string path = System.IO.Directory.GetCurrentDirectory();
            //string contentRootPath = _env.ContentRootPath;
            //string webRootPath = _env.WebRootPath;
            //return path + "***" + contentRootPath + "**" + webRootPath + "*";

            //path = string.Concat(path, @"\ClientApp\public\File");
            path = string.Concat(path, @"\ClientApp\build\File");
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);

            path = string.Concat(path, @"\FAQ.txt");
            string jsonString;

            try
            {
                jsonString = System.IO.File.ReadAllText(path);
                var data = JsonSerializer.Deserialize<List<FAQDto>>(jsonString);
                int indexOf = data.FindIndex(i => i.Id == id);

                if (indexOf > -1)
                {
                    data.RemoveAt(indexOf);
                    System.IO.File.Delete(path);
                    jsonString = JsonSerializer.Serialize(data);
                    System.IO.File.WriteAllText(path, jsonString);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
