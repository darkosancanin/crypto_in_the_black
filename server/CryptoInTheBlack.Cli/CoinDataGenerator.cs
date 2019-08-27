using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CryptoInTheBlack.Model;
using CryptoInTheBlack.Service;
using ComposableAsync;
using RateLimiter;

namespace CryptoInTheBlack.Cli
{
    public class CoinDataGenerator
    {
        private readonly CoinGeckoClient _coinGeckoClient;

        public CoinDataGenerator(CoinGeckoClient coinGeckoClient)
        {
            _coinGeckoClient = coinGeckoClient;
        }

        public async Task GenerateCoinDataFile(string fileLocation)
        {
            Console.WriteLine($"Generating new CoinData file at '{fileLocation}'.");
            var coins = await _coinGeckoClient.GetCoinList();
            Console.WriteLine($"Coin list downloaded from CoinGecko. {coins.Count} coins found.");
            var coinDetails = new List<CoinGeckoCoinDetail>();
            var counter = 0;
            var maxApiTimeConstraint = TimeLimiter.GetFromMaxCountByInterval(80, TimeSpan.FromMinutes(1));
            foreach (var coin in coins)
            {
                await maxApiTimeConstraint;
                Interlocked.Increment(ref counter);
                Console.WriteLine($"{counter}/{coins.Count} - Retrieving coin details for {coin.Id} ({coin.Name}).");
                coinDetails.Add(await _coinGeckoClient.GetCoinDetail(coin.Id));
            }
            Console.WriteLine("Completed downloading all coin details.");
            Console.WriteLine($"Saving filedata to '{fileLocation}'.");
            var coinFileData = GetCoinDataFile(coinDetails);
            File.WriteAllText(fileLocation, coinFileData);
            Console.WriteLine($"Completed generating new CoinData file at '{fileLocation}'.");
        }
        private string FormatValueForCode(string value) => string.IsNullOrEmpty(value) ? null : $@"{value.Replace("\"", "\"\"")}";

        public string GetCoinDataFile(List<CoinGeckoCoinDetail> coins)
        {
            var coinContent = string.Join(Environment.NewLine, coins.Select(x => $"new Coin(\"{x.Id}\", @\"{FormatValueForCode(x.Name)}\", \"{x.Symbol}\", @\"{FormatValueForCode(x.Description?.English)}\", \"{x.Links?.Homepage?.First()}\", \"{x.Images?.Thumb}\", \"{x.Images?.Small}\", \"{x.Images?.Large}\", {x.MarketCapRank ?? 0}),"));
            
            return $@"using System.Collections.Generic;

namespace CryptoInTheBlack.Model.Generated
{{
    public class CoinData
    {{
        public static List<Coin> GetAllCoins()
        {{
            return new List<Coin>
            {{
                {coinContent}
            }};
        }}
    }}
}}";
        }
    }
}
