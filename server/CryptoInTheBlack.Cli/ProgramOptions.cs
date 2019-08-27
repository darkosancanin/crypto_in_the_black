using CommandLine;

namespace CryptoInTheBlack.Cli
{
    [Verb("generatecoin", HelpText = "Generates the CoinData file from CoinGecko.")]
    public class GenerateCoinDataOptions
    {
        [Option('o', "output", Required = true, HelpText = "Sets the output file where to save the generated file.")]
        public string OutputFile { get; set; }
    }

    [Verb("sitemap", HelpText = "Generates the sitemap file.")]
    public class SitemapOptions
    {
        [Option('o', "output", Required = true, HelpText = "Sets the output file where to save the generated file.")]
        public string OutputFile { get; set; }
    }
}
