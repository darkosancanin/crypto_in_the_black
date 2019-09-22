using System;

namespace CryptoInTheBlack.Service
{
    public interface ICoinLogger
    {
        void Log(string message);
    }

    public class CoinLogger : ICoinLogger
    {
        public void Log(string message)
        {
            Console.WriteLine(message);
        }
    }
}
