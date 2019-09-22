using System;
using Newtonsoft.Json;

namespace CryptoInTheBlack.Model.Response
{
    public class PokeResponse
    {
        public PokeResponse()
        {
            ResponseDate = DateTime.Now;
        }

        [JsonProperty(PropertyName = "responseDate")]
        public DateTime ResponseDate { get; set; }
    }
}
