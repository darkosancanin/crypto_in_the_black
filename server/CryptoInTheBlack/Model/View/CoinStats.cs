using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace CryptoInTheBlack.Model.View
{
    public class CoinStats
    {
        public CoinStats(Coin coin, List<CoinGeckoPrice> priceHistory)
        {
            Name = coin.Name;
            Symbol = coin.Symbol;
            Image = coin.SmallImage;
            Url = coin.Homepage;
            TotalDays = priceHistory.Count;

            if (priceHistory.Count > 0)
            {
                decimal totalDays = priceHistory.Count;
                var latestPrice = priceHistory.OrderByDescending(x => x.Date).First();
                var daysProfitable = priceHistory.Count(x => x.Price <= latestPrice.Price);
                var daysNotProfitable = priceHistory.Count - daysProfitable;
                var daysProfitablePercentage = Math.Round(daysProfitable / totalDays * 100, 2);
                DaysProfitable = daysProfitable;
                DaysProfitablePercentage = daysProfitablePercentage;
                DaysNotProfitable = daysNotProfitable;
                DaysNotProfitablePercentage = 100 - daysProfitablePercentage;
                SinceDate = priceHistory.OrderBy(x => x.Date).First().Date;
            }
        }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "symbol")]
        public string Symbol { get; set; }

        [JsonProperty(PropertyName = "image")]
        public string Image { get; set; }

        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }

        [JsonProperty(PropertyName = "daysProfitable")]
        public int DaysProfitable { get; set; }

        [JsonProperty(PropertyName = "daysProfitablePercentage")]
        public decimal DaysProfitablePercentage { get; set; }

        [JsonProperty(PropertyName = "daysNotProfitable")]
        public int DaysNotProfitable { get; set; }

        [JsonProperty(PropertyName = "daysNotProfitablePercentage")]
        public decimal DaysNotProfitablePercentage { get; set; }

        [JsonProperty(PropertyName = "totalDays")]
        public int TotalDays { get; set; }

        [JsonProperty(PropertyName = "sinceDate")]
        public DateTime SinceDate { get; set; }
    }
}
