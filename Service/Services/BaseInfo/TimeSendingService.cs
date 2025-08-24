using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models.BaseInfo;
using Domain.Dto.BaseInfo;
using Service.IServices.BaseInfo;
using Repository.IRepository.BaseInfo;
using Microsoft.EntityFrameworkCore;

namespace Service.Services.BaseInfo
{
    public class TimeSendingService:ITimeSendingService<TimeSendingModel>
    {
        private readonly ITimeSendingRepository<TimeSendingModel> _timeSendingRepository;

        public TimeSendingService(ITimeSendingRepository<TimeSendingModel> timeSendingRepository)
        {
            _timeSendingRepository = timeSendingRepository;
        }

        public IEnumerable<TimeSendingModel> GetAll()
        {
            return _timeSendingRepository.GetAll();
        }

        public IEnumerable<TimeSendingModel> Search(TimeSendingSearchDto input)
        {
            return _timeSendingRepository.Search(input);
        }

        public bool Insert(TimeSendingModel timeSending)
        {
            return _timeSendingRepository.Insert(timeSending).Result;
        }

        public bool Update(TimeSendingModel timeSending)
        {
            try
            {
                return _timeSendingRepository.Update(timeSending).Result;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;//********
            }
        }

        public bool Delete(int id)
        {
            return _timeSendingRepository.Delete(id).Result;//*********
        }
    }
}
