import React, { useEffect, useState } from "react";
import { PieChart, Pie } from "recharts";
import styled from "styled-components";

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

export const CoinInfo = props => {
  const [coin, setCoin] = useState(undefined);

  useEffect(() => {
    if (props.match.params.symbol) {
      fetch(
        `https://api.cryptointheblack.com/coin/${props.match.params.symbol}`
      ).then(response => {
        response.json().then(data => {
          setCoin(data);
        });
      });
    }
  }, [props.match.params.symbol]);

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
  const formatDate = dateValue => {
    let dateToFromat = new Date(dateValue);
    return `${dateToFromat.getDate()} ${
      months[dateToFromat.getMonth()]
    } ${dateToFromat.getFullYear()}`;
  };

  if (!coin) return <>test</>;
  console.log("coin", coin);
  return (
    <Cointainer>
      <CoinParagraph>
        It has been profitable to buy and hold {coin.name} for{" "}
        {coin.daysProfitable} out of the last {coin.totalDays} days (
        {coin.daysProfitablePercentage}%) since {formatDate(coin.sinceDate)}.
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
          />
        </PieChart>
      </GraphContainer>
      <CoinParagraph>
        It has not been profitable to buy and hold {coin.name} for{" "}
        {coin.daysNotProfitable} out of the last {coin.totalDays} days (
        {coin.daysNotProfitablePercentage}%).
      </CoinParagraph>
    </Cointainer>
  );
};
