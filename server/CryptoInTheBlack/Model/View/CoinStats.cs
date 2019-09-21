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
            LatestPrice = priceHistory.Last().Price;

            decimal totalDays = priceHistory.Count;
            var daysProfitable = priceHistory.Count(x => x.Price <= LatestPrice);
            DaysProfitablePercentage = Math.Round(daysProfitable / totalDays * 100, 2);
            DaysNotProfitablePercentage = 100 - DaysProfitablePercentage;

            ProfitableDescription = $"It has been profitable to buy and hold {coin.Name} for {daysProfitable} out of the last {totalDays} days ({DaysProfitablePercentage}%) since {priceHistory.First().Date:dd MMMM yyyy}.";
            NotProfitableDescription = $"It has not been profitable to buy and hold {coin.Name} for {priceHistory.Count - daysProfitable} out of the last {totalDays} days ({DaysNotProfitablePercentage}%).";

            var profitableChartItems = new CoinStatsChartItem[priceHistory.Count - 1];
            var notProfitableChartItems = new CoinStatsChartItem[priceHistory.Count - 1];

            var allTimeHigh = priceHistory.First();
            for (var i = 0; i < priceHistory.Count - 1; i++)
            {
                var dayPrice = priceHistory[i];
                profitableChartItems[i] = new CoinStatsChartItem(dayPrice.Date, dayPrice.Price <= LatestPrice ? dayPrice.Price : (decimal?)null);
                notProfitableChartItems[i] = new CoinStatsChartItem(dayPrice.Date, dayPrice.Price >= LatestPrice ? dayPrice.Price : (decimal?)null);
                if (dayPrice.Price >= allTimeHigh.Price)
                    allTimeHigh = dayPrice;
            }

            Chart = new CoinStatsChart(profitableChartItems, notProfitableChartItems);
            AllTimeHighPrice = allTimeHigh.Price;
            AllTimeHighDescription = $"The all time high was ${allTimeHigh.Price:F2} on {allTimeHigh.Date:dd MMMM yyyy} which was {(DateTime.Now.Date - allTimeHigh.Date).Days} days ago.";
        }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "symbol")]
        public string Symbol { get; set; }

        [JsonProperty(PropertyName = "image")]
        public string Image { get; set; }

        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }

        [JsonProperty(PropertyName = "daysProfitablePercentage")]
        public decimal DaysProfitablePercentage { get; set; }

        [JsonProperty(PropertyName = "daysNotProfitablePercentage")]
        public decimal DaysNotProfitablePercentage { get; set; }

        [JsonProperty(PropertyName = "profitableDescription")]
        public string ProfitableDescription { get; set; }

        [JsonProperty(PropertyName = "notProfitableDescription")]
        public string NotProfitableDescription { get; set; }

        [JsonProperty(PropertyName = "allTimeHighDescription")]
        public string AllTimeHighDescription { get; set; }

        [JsonProperty(PropertyName = "latestPrice")]
        public decimal LatestPrice { get; set; }

        [JsonProperty(PropertyName = "allTimeHighPrice")]
        public decimal AllTimeHighPrice { get; set; }

        [JsonProperty(PropertyName = "chart")]
        public CoinStatsChart Chart { get; set; }
    }

    public class CoinStatsChart
    {
        public CoinStatsChart(CoinStatsChartItem[] profitable, CoinStatsChartItem[] notProfitable)
        {
            Profitable = profitable;
            NotProfitable = notProfitable;
        }

        [JsonProperty(PropertyName = "profitable")]
        public CoinStatsChartItem[] Profitable { get; set; }

        [JsonProperty(PropertyName = "notProfitable")]
        public CoinStatsChartItem[] NotProfitable { get; set; }
    }

    public class CoinStatsChartItem
    {
        public CoinStatsChartItem(DateTime date, decimal? price)
        {
            Date = date.ToString("yyyy-MM-dd");
            Price = price;
        }

        [JsonProperty(PropertyName = "x")]
        public string Date { get; set; }

        [JsonProperty(PropertyName = "y")]
        public decimal? Price { get; set; }
    }
}
