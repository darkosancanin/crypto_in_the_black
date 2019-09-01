using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;
using CryptoInTheBlack.Model.Generated;

namespace CryptoInTheBlack.Cli
{
    public class SitemapGenerator
    {
        public void GenerateSitemapFile(string fileLocation)
        {
            Console.WriteLine($"Generating new sitemap file at '{fileLocation}'.");
            var coins = CoinData.GetAllCoins();
            var sitemap = new Sitemap { UrlSet = coins.Select(x => new SitemapUrl(x)).ToList()};
            var serializer = new System.Xml.Serialization.XmlSerializer(typeof(Sitemap));
            using (var writer = new StreamWriter(fileLocation))
            {
                serializer.Serialize(writer, sitemap);
            }

            Console.WriteLine($"Completed generating new sitemap file at '{fileLocation}'.");
        }
    }

    [XmlRoot("urlset", Namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")]
    public class Sitemap
    {
        [XmlElement("url")]
        public List<SitemapUrl> UrlSet { get; set; }
    }

    public class SitemapUrl
    {
        public SitemapUrl()
        {
        }

        public SitemapUrl(Model.Coin coin)
        {
            Location = $"https://www.cryptointheblack.com/{coin.Symbol.ToLower()}";
            LastModified = DateTime.Now.ToString("yyyy-MM-dd");
            ChangeFrequency = "daily";
            Priority = "1.0";
        }

        [XmlElement(ElementName = "loc")]
        public string Location { get; set; }

        [XmlElement(ElementName = "lastmod")]
        public string LastModified { get; set; }

        [XmlElement(ElementName = "changefreq")]
        public string ChangeFrequency { get; set; }

        [XmlElement(ElementName = "priority")]
        public string Priority { get; set; }
    }
}
