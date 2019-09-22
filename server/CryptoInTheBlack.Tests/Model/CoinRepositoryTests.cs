using System.Collections.Generic;
using CryptoInTheBlack.Model;
using CryptoInTheBlack.Service;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using Xunit;

namespace CryptoInTheBlack.Tests.Model
{

    public class CoinRepositoryTests
    {
        [Fact]
        public void SearchForCoins_searches_by_name()
        {
            var repo = new CoinRepository();

            var coins = repo.SearchForCoins("Wanchain");

            Assert.NotNull(coins);
            Assert.True(coins.Count > 0);
            Assert.Contains(coins, x => x.Symbol == "wan");
        }

        [Fact]
        public void SearchForCoins_searches_by_case_insensitive_name()
        {
            var repo = new CoinRepository();

            var coins = repo.SearchForCoins("wanchain");

            Assert.NotNull(coins);
            Assert.True(coins.Count > 0);
            Assert.Contains(coins, x => x.Symbol == "wan");
        }

        [Fact]
        public void SearchForCoins_searches_by_symbol()
        {
            var repo = new CoinRepository();

            var coins = repo.SearchForCoins("btc");

            Assert.NotNull(coins);
            Assert.True(coins.Count > 0);
            Assert.Contains(coins, x => x.Symbol == "btc");
        }

        [Fact]
        public void SearchForCoins_searches_by_case_insensitive_symbol()
        {
            var repo = new CoinRepository();

            var coins = repo.SearchForCoins("BTC");

            Assert.NotNull(coins);
            Assert.True(coins.Count > 0);
            Assert.Contains(coins, x => x.Symbol == "btc");
        }

        [Fact]
        public void CoinExists_returns_if_the_coin_symbol_exists()
        {
            var repo = new CoinRepository();

            Assert.True(repo.CoinExists("btc"));
            Assert.True(repo.CoinExists("eth"));

            Assert.False(repo.CoinExists("blahblah"));
            Assert.False(repo.CoinExists(""));
        }

        [Fact]
        public void CoinExists_handles_null()
        {
            var repo = new CoinRepository();

            Assert.False(repo.CoinExists(null));
        }

        [Fact]
        public async void GetCoinStats_returns_stats_from_cache_on_second_call()
        {
            var coinGeckoClient = new Mock<ICoinGeckoClient>();
            var coinLogger = new Mock<ICoinLogger>();
            var repo = new CoinRepository(coinGeckoClient.Object, new MemoryCache(new MemoryCacheOptions()), coinLogger.Object);
            coinGeckoClient.Setup(x => x.GetCoinPriceHistory("bitcoin")).ReturnsAsync(new List<CoinGeckoPrice>());

            await repo.GetCoinStats("btc");
            await repo.GetCoinStats("btc");
            await repo.GetCoinStats("btc");

            coinGeckoClient.Verify(x => x.GetCoinPriceHistory("bitcoin"), Times.Once);
        }
    }
}
