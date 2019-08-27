using CryptoInTheBlack.Service;
using Xunit;

namespace CryptoInTheBlack.IntegrationTests.Service
{
    public class CoinRepositoryTests
    {
        [Fact]
        public async void GetCoinStats_returns_stats_from_price_history()
        {
            var repo = new CoinRepository();

            var coinStats = await repo.GetCoinStats("btc");

            Assert.NotNull(coinStats);
            Assert.Equal("btc", coinStats.Symbol);
            Assert.True(coinStats.TotalDays > 2300);
        }
    }
}
