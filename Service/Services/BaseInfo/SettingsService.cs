using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.IServices.BaseInfo;
using Domain.Models.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.BaseInfo
{
    public class SettingsService : ISettingsService<SettingsModel>
    {
        private readonly ISettingsRepository<SettingsModel> _settingRepository;

        public SettingsService(ISettingsRepository<SettingsModel> settingRepository)
        {
            _settingRepository = settingRepository;
        }

        public SettingsModel GetAll()
        {
            return _settingRepository.GetAll();
        }

        public bool Insert(SettingsModel setting)
        {
            return _settingRepository.Insert(setting).Result;
        }

        public bool Update(SettingsModel setting)
        {
            try
            {
                return _settingRepository.Update(setting).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }
    }
}
