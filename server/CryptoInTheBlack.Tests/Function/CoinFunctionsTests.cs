using System.Collections.Generic;
using System.Net;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
using CryptoInTheBlack.Function;
using CryptoInTheBlack.Service;
using Moq;
using Xunit;

namespace CryptoInTheBlack.Tests.Function
{
    public class CoinFunctionsTests
    {
        [Fact]
        public async void Coin_returns_bad_request_if_no_symbol_param_passed()
        {
            var coinFunctions = new CoinFunctions();

            var response = await coinFunctions.Coin(new APIGatewayProxyRequest(), new TestLambdaContext());

            Assert.Equal(response.StatusCode, (int) HttpStatusCode.BadRequest);
        }

        [Fact]
        public async void Coin_returns_404_if_symbol_not_found()
        {
            var coinRepository = new Mock<ICoinRepository>();
            coinRepository.Setup(x => x.CoinExists("btc")).Returns(false);
            var coinFunctions = new CoinFunctions(coinRepository.Object);
            var pathParams = new Dictionary<string, string> {{"symbol", "btc"}};

            var response = await coinFunctions.Coin(new APIGatewayProxyRequest{PathParameters = pathParams}, new TestLambdaContext());

            Assert.Equal(response.StatusCode, (int)HttpStatusCode.NotFound);
        }

        [Fact]
        public void Search_returns_bad_request_if_no_search_text_param_passed()
        {
            var coinFunctions = new CoinFunctions();

            var response = coinFunctions.Search(new APIGatewayProxyRequest(), new TestLambdaContext());

            Assert.Equal(response.StatusCode, (int)HttpStatusCode.BadRequest);
        }
    }
}
