using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace CryptoInTheBlack.Model
{
    public class CoinGeckoPriceHistory
    {
        [JsonProperty(PropertyName = "prices")]
        public List<decimal[]> Prices { get; set; }

        public List<CoinGeckoPrice> GetPrices()
        {
            if (Prices == null) return new List<CoinGeckoPrice>();
            return Prices.Select(x => new CoinGeckoPrice(DateTimeOffset.FromUnixTimeMilliseconds((long)x[0]).Date, x[1])).ToList();
        }
    }

    public class CoinGeckoPrice
    {
        public CoinGeckoPrice(DateTime date, decimal price)
        {
            Date = date;
            Price = price;
        }

        public DateTime Date { get; set; }

        public decimal Price { get; set; }
    }
}
