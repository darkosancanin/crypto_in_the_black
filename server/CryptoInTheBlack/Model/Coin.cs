namespace CryptoInTheBlack.Model
{
    public class Coin
    {
        public Coin(string id, string name, string symbol, string homepage, string smallImage, int marketCapRank)
        {
            Id = id;
            Name = name;
            Symbol = symbol;
            Homepage = homepage;
            SmallImage = smallImage;
            MarketCapRank = marketCapRank;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Symbol { get; set; }

        public string Homepage { get; set; }

        public string SmallImage { get; set; }

        public int MarketCapRank { get; set; }
    }
}
