import React, { useEffect, useState, useContext } from "react";
import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";
import { CoinContext } from "./CoinContext";
import { Helmet } from "react-helmet";

const Cointainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;
const CoinParagraph = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 300;
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CoinLogoImg = styled.img`
  margin-bottom: 50px;
`;

export const CoinInfo = props => {
  const coinContext = useContext(CoinContext);

  if (!coinContext.symbol) {
    coinContext.setSymbol(props.match.params.symbol || "btc");
  }

  const [coin, setCoin] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onError = err => {
    console.log("Error", err);
    setHasError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (coinContext.symbol) {
      setCoin(undefined);
      setIsLoading(true);
      setHasError(false);
      fetch(`https://api.cryptointheblack.com/coin/${coinContext.symbol}`)
        .then(response => {
          response
            .json()
            .then(data => {
              setCoin(data);
              setIsLoading(false);
            })
            .catch(onError);
        })
        .catch(onError);
    }
  }, [coinContext.symbol]);

  const renderCustomPieChartLabel = e => {
    return (
      <text
        x={e.x}
        y={e.y}
        fill="#ffffff"
        textAnchor={e.x > e.cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {` ${e.value}% `}
      </text>
    );
  };

  const formatDate = dateValue => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let dateToFromat = new Date(dateValue);
    return `${dateToFromat.getDate()} ${
      months[dateToFromat.getMonth()]
    } ${dateToFromat.getFullYear()}`;
  };

  const Error = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: 300;
  `;

  return (
    <Cointainer>
      {hasError && <Error>Oops something went wrong. Please try again.</Error>}
      {isLoading && <img src="/loading.gif" alt="Loading..." />}
      {coin && (
        <>
          <Helmet>
            <title>{`Crypto In The Black - ${coin.name} (${coin.symbol})`}</title>
          </Helmet>
          {coin.image && <CoinLogoImg src={coin.image} title={coin.name} />}
          <CoinParagraph>
            It has been profitable to buy and hold {coin.name} for{" "}
            {coin.daysProfitable} out of the last {coin.totalDays} days (
            {coin.daysProfitablePercentage}%) since {formatDate(coin.sinceDate)}
            .
          </CoinParagraph>
          <GraphContainer>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                startAngle={0}
                endAngle={360}
                data={[
                  { name: "Profitable", value: coin.daysProfitablePercentage },
                  {
                    name: "Not Profitable",
                    value: coin.daysNotProfitablePercentage
                  }
                ]}
                cx={150}
                cy={150}
                outerRadius={80}
                fill="#EDDA36"
                unit="%"
                label={renderCustomPieChartLabel}
                isAnimationActive={false}
              >
                <Cell key={`1`} fill="#EDDA36" />
                <Cell key={`2`} fill="#EDDA360A" />
              </Pie>
            </PieChart>
          </GraphContainer>
          <CoinParagraph>
            It has not been profitable to buy and hold {coin.name} for{" "}
            {coin.daysNotProfitable} out of the last {coin.totalDays} days (
            {coin.daysNotProfitablePercentage}%).
          </CoinParagraph>
        </>
      )}
    </Cointainer>
  );
};
