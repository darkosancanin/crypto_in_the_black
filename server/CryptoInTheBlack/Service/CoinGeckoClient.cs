using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CryptoInTheBlack.Model;
using Newtonsoft.Json;

namespace CryptoInTheBlack.Service
{
    public interface ICoinGeckoClient
    {
        Task<CoinGeckoCoinDetail> GetCoinDetail(string id);
        Task<List<CoinGeckoCoin>> GetCoinList();
        Task<List<CoinGeckoPrice>> GetCoinPriceHistory(string id);
    }

    public class CoinGeckoClient : ICoinGeckoClient
    {
        private static string API_BASE_URL = "https://api.coingecko.com/api/v3";
        private readonly HttpClient _httpClient;

        public CoinGeckoClient() : this(new HttpClient())
        {
        }

        public CoinGeckoClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<CoinGeckoCoin>> GetCoinList()
        {
            var response = await _httpClient.GetStringAsync($"{API_BASE_URL}/coins/list");
            return JsonConvert.DeserializeObject<List<CoinGeckoCoin>>(response);
        }

        public async Task<CoinGeckoCoinDetail> GetCoinDetail(string id)
        {
            var response = await _httpClient.GetStringAsync($"{API_BASE_URL}/coins/{id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false");
            return JsonConvert.DeserializeObject<CoinGeckoCoinDetail>(response);
        }

        public async Task<List<CoinGeckoPrice>> GetCoinPriceHistory(string id)
        {
            var response = await _httpClient.GetStringAsync($"{API_BASE_URL}/coins/{id}/market_chart?vs_currency=usd&days=max");
            var priceHistory = JsonConvert.DeserializeObject<CoinGeckoPriceHistory>(response);
            return priceHistory.GetPrices().OrderBy(x => x.Date).ToList();
        }
    }
}
