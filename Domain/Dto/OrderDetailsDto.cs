using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int Deleted { get; set; }
        public int Status { get; set; }
        public string StatusTitle { get; set; }
        public int? ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ProductImagePath { get; set; }
        public int Number { get; set; }
        public decimal Price { get; set; }
        public OrderColorDto Color { get; set; }
        public OrderSizeDto Size { get; set; }
    }

    public class OrderColorDto
    {
        public string Id { get; set; }
        public string Color { get; set; }
    }

    public class OrderSizeDto
    {
        public string Id { get; set; }
        public string Size { get; set; }
    }
}
