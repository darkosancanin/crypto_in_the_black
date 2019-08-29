import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
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
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

export const CoinInfo = () => {
  const data = [
    { name: "Profitable", value: 76 },
    { name: "Not Profitable", value: 24 }
  ];
  const renderCustomBarLabel = e => {
    console.log(e);
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

  return (
    <Cointainer>
      <CoinParagraph>
        It has been profitable to buy and hold Ethereum for 333 out of the last
        435 days (76%) since 23 April 2012.
      </CoinParagraph>
      <GraphContainer>
        <PieChart width={250} height={200}>
          <Pie
            dataKey="value"
            startAngle={0}
            endAngle={360}
            data={data}
            cx={100}
            cy={100}
            outerRadius={80}
            fill="#EDDA36"
            unit="%"
            label={renderCustomBarLabel}
          />
        </PieChart>
      </GraphContainer>
      <CoinParagraph>
        It has not been profitable to buy and hold Ethereum for 124 out of the
        last 435 days (24%).
      </CoinParagraph>
    </Cointainer>
  );
};
