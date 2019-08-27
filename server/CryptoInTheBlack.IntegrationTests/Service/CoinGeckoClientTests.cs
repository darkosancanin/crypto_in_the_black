using CryptoInTheBlack.Service;
using Xunit;

namespace CryptoInTheBlack.IntegrationTests.Service
{
    public class CoinGeckoClientTests
    {
        [Fact]
        public async void GetCoinList_returns_all_coins()
        {
            var client = new CoinGeckoClient();

            var coins = await client.GetCoinList();

            Assert.NotNull(coins);
            Assert.True(coins.Count > 1000);
        }

        [Fact]
        public async void GetCoinDetail_returns_coin_details()
        {
            var client = new CoinGeckoClient();

            var coin = await client.GetCoinDetail("bitcoin");

            Assert.NotNull(coin);
            Assert.Equal("Bitcoin", coin.Name);
            Assert.Equal("btc", coin.Symbol);
        }

        [Fact]
        public async void GetCoinPriceHistory_returns_price_history()
        {
            var client = new CoinGeckoClient();

            var priceHistory = await client.GetCoinPriceHistory("bitcoin");

            Assert.NotNull(priceHistory);
            Assert.True(priceHistory.Count > 2300);
        }
    }
}
