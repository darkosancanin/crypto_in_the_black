using System.Collections.Generic;
using Newtonsoft.Json;

namespace CryptoInTheBlack.Model
{
    public class CoinGeckoCoinDetail : CoinGeckoCoin
    {
        [JsonProperty(PropertyName = "description")]
        public GeckoCoinDescription Description { get; set; }

        [JsonProperty(PropertyName = "links")]
        public GeckoCoinLink Links { get; set; }

        [JsonProperty(PropertyName = "image")]
        public GeckoCoinImage Images { get; set; }

        [JsonProperty(PropertyName = "market_cap_rank")]
        public int? MarketCapRank { get; set; }
    }

    public class GeckoCoinDescription
    {
        [JsonProperty(PropertyName = "en")]
        public string English { get; set; }
    }

    public class GeckoCoinLink
    {
        [JsonProperty(PropertyName = "homepage")]
        public List<string> Homepage { get; set; }
    }

    public class GeckoCoinImage
    {
        [JsonProperty(PropertyName = "thumb")]
        public string Thumb { get; set; }

        [JsonProperty(PropertyName = "small")]
        public string Small { get; set; }

        [JsonProperty(PropertyName = "large")]
        public string Large { get; set; }
    }
}
