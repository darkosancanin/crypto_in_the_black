using Newtonsoft.Json;

namespace CryptoInTheBlack.Model
{
    public class CoinGeckoCoin
    {
        public CoinGeckoCoin()
        {
        }

        public CoinGeckoCoin(string id, string name, string symbol)
        {
            Id = id;
            Name = name;
            Symbol = symbol;
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "symbol")]
        public string Symbol { get; set; }
    }
}
