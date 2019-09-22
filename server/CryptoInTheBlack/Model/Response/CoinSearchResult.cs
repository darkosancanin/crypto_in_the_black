using Newtonsoft.Json;

namespace CryptoInTheBlack.Model.Response
{
    public class CoinSearchResult
    {
        public CoinSearchResult(Coin coin)
        {
            Name = coin.Name;
            Symbol = coin.Symbol;
        }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "symbol")]
        public string Symbol { get; set; }
    }
}
