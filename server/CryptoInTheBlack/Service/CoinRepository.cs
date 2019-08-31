using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoInTheBlack.Model;
using CryptoInTheBlack.Model.Generated;
using CryptoInTheBlack.Model.View;
using Microsoft.Extensions.Caching.Memory;

namespace CryptoInTheBlack.Service
{
    public interface ICoinRepository
    {
        Task<CoinStats> GetCoinStats(string symbol);
        List<CoinSearchResult> SearchForCoins(string searchText, int maxResults = 20);
        bool CoinExists(string symbol);
    }

    public class CoinRepository : ICoinRepository
    {
        private readonly Dictionary<string, Coin> _coinBySymbolLookup;
        private readonly List<Coin> _coins;
        private readonly ICoinGeckoClient _coinGeckoClient;
        private readonly IMemoryCache _memoryCache;

        public CoinRepository() : this(new CoinGeckoClient(), new MemoryCache(new MemoryCacheOptions()))
        {
        }

        public CoinRepository(ICoinGeckoClient coinGeckoClient, IMemoryCache memoryCache)
        {
            _coinGeckoClient = coinGeckoClient;
            _memoryCache = memoryCache;
            _coins = CoinData.GetAllCoins().Where(x => x.MarketCapRank > 0).GroupBy(x => x.Symbol).Select(x => x.OrderBy(y => y.MarketCapRank).First()).ToList();
            _coinBySymbolLookup = _coins.ToDictionary(x => x.Symbol, x => x);
        }

        public List<CoinSearchResult> SearchForCoins(string searchText, int maxResults = 20)
        {
            return _coins
                .Where(x => searchText == null || 
                            x.Name.Contains(searchText, StringComparison.InvariantCultureIgnoreCase) ||
                            x.Symbol.Contains(searchText, StringComparison.CurrentCultureIgnoreCase))
                .OrderBy(x => x.MarketCapRank)
                .Take(maxResults)
                .Select(x => new CoinSearchResult(x))
                .ToList();
        }

        public async Task<CoinStats> GetCoinStats(string symbol)
        {
            return await _memoryCache.GetOrCreateAsync(symbol, async x =>
            {
                var coin = _coinBySymbolLookup[symbol];
                var priceHistory = await _coinGeckoClient.GetCoinPriceHistory(coin.Id);
                var coinStats = new CoinStats(coin, priceHistory);
                _memoryCache.Set(symbol, coinStats, TimeSpan.FromHours(1));
                return coinStats;
            });
        }

        public bool CoinExists(string symbol) => _coinBySymbolLookup.ContainsKey(symbol ?? string.Empty);
    }
}
