using System.Net.Http;
using CommandLine;
using CryptoInTheBlack.Service;

namespace CryptoInTheBlack.Cli
{
    class Program
    {
        static void Main(string[] args)
        {
            Parser.Default.ParseArguments<GenerateCoinDataOptions, SitemapOptions>(args)
                .WithParsed<GenerateCoinDataOptions>(o =>
                {
                    new CoinDataGenerator(new CoinGeckoClient(new HttpClient())).GenerateCoinDataFile(o.OutputFile).Wait(); 
                })
                .WithParsed<SitemapOptions>(o =>
                {
                    new SitemapGenerator().GenerateSitemapFile(o.OutputFile);
                });
        }
    }
}
