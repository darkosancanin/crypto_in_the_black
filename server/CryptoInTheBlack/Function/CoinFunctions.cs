using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using CryptoInTheBlack.Model.Response;
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
        private readonly ICoinLogger _logger;

        public CoinFunctions(ICoinRepository coinRepository, ICoinLogger logger)
        {
            _coinRepository = coinRepository;
            _logger = logger;
        }

        public CoinFunctions()
        {
            _coinRepository = new CoinRepository();
            _logger = new CoinLogger();
        }

        public async Task<APIGatewayProxyResponse> Coin(APIGatewayProxyRequest request, ILambdaContext context)
        {
            _logger.Log($"{nameof(Coin)} API called.");

            if (request.PathParameters == null || !request.PathParameters.ContainsKey(SYMBOL_PARAM_NAME))
                return new APIGatewayProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest, Body = $"Missing required parameter {SYMBOL_PARAM_NAME}" };

            var symbol = HttpUtility.UrlDecode(request.PathParameters[SYMBOL_PARAM_NAME]);

            if (!_coinRepository.CoinExists(symbol))
                return new APIGatewayProxyResponse { StatusCode = (int)HttpStatusCode.NotFound, Body = $"Symbol not found: {symbol}" };

            var coinStats = await _coinRepository.GetCoinStats(symbol);

            return CreateAPIGatewayProxyResponse(coinStats);
        }

        public APIGatewayProxyResponse Search(APIGatewayProxyRequest request, ILambdaContext context)
        {
            _logger.Log($"{nameof(Search)} API called.");

            string searchText = null;
            if (request.PathParameters != null && request.PathParameters.ContainsKey(SEARCH_TEXT_PARAM_NAME))
                searchText = HttpUtility.UrlDecode(request.PathParameters[SEARCH_TEXT_PARAM_NAME]);

            var searchResults = _coinRepository.SearchForCoins(searchText);

            return CreateAPIGatewayProxyResponse(searchResults);
        }

        public APIGatewayProxyResponse Poke(APIGatewayProxyRequest request, ILambdaContext context)
        {
            _logger.Log($"{nameof(Poke)} API called.");

            return CreateAPIGatewayProxyResponse(new PokeResponse());
        }

        private APIGatewayProxyResponse CreateAPIGatewayProxyResponse(object body)
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = JsonConvert.SerializeObject(body),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };
        }
    }
}
