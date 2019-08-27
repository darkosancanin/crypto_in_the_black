namespace CryptoInTheBlack.Model
{
    public class Coin
    {
        public Coin(string id, string name, string symbol, string description, string homepage, string thumbImage, string smallImage, string largeImage, int marketCapRank)
        {
            Id = id;
            Name = name;
            Symbol = symbol;
            Description = description;
            Homepage = homepage;
            ThumbImage = thumbImage;
            SmallImage = smallImage;
            LargeImage = largeImage;
            MarketCapRank = marketCapRank;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Symbol { get; set; }

        public string Description { get; set; }

        public string Homepage { get; set; }

        public string ThumbImage { get; set; }

        public string SmallImage { get; set; }

        public string LargeImage { get; set; }

        public int MarketCapRank { get; set; }
    }
}
