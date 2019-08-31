using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Newtonsoft.Json;
using CryptoInTheBlack.Service;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
namespace CryptoInTheBlack.Function
{
    public class CoinFunctions
    {
        private const string SYMBOL_PARAM_NAME = "symbol";
        private const string SEARCH_TEXT_PARAM_NAME = "searchText";
        private readonly ICoinRepository _coinRepository;

        public CoinFunctions(ICoinRepository coinRepository)
        {
            _coinRepository = coinRepository;
        }

        public CoinFunctions()
        {
            _coinRepository = new CoinRepository();
        }

        public async Task<APIGatewayProxyResponse> Coin(APIGatewayProxyRequest request, ILambdaContext context)
        {
            if (request.PathParameters == null || !request.PathParameters.ContainsKey(SYMBOL_PARAM_NAME))
                return new APIGatewayProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest, Body = $"Missing required parameter {SYMBOL_PARAM_NAME}" };

            var symbol = HttpUtility.UrlDecode(request.PathParameters[SYMBOL_PARAM_NAME]);

            if (!_coinRepository.CoinExists(symbol))
                return new APIGatewayProxyResponse { StatusCode = (int)HttpStatusCode.NotFound, Body = $"Symbol not found: {symbol}" };

            var coinStats = await _coinRepository.GetCoinStats(symbol);
            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = JsonConvert.SerializeObject(coinStats),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };

            return response;
        }

        public APIGatewayProxyResponse Search(APIGatewayProxyRequest request, ILambdaContext context)
        {
            string searchText = null;
            if (request.PathParameters != null && request.PathParameters.ContainsKey(SEARCH_TEXT_PARAM_NAME))
                searchText = HttpUtility.UrlDecode(request.PathParameters[SEARCH_TEXT_PARAM_NAME]);

            var searchResults = _coinRepository.SearchForCoins(searchText);

            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = JsonConvert.SerializeObject(searchResults),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };
        }
    }
}
