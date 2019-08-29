import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

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
`;

export const CoinInfo = () => {
  return (
    <Cointainer>
      <CoinParagraph>
        It has been profitable to buy and hold Ethereum for 333 out of the last
        435 days (76%) since 23 April 2012.
      </CoinParagraph>
      <GraphContainer>
        <Doughnut
          width={250}
          height={250}
          data={{
            datasets: [
              {
                data: [5, 95]
              }
            ],
            labels: ["Profitable", "Not Profitable"]
          }}
          options={{
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var currentValue = dataset.data[tooltipItem.index];
                  return " " + currentValue + "%";
                },
                title: function(tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
              }
            },
            maintainAspectRatio: false
          }}
        />
      </GraphContainer>
      <CoinParagraph>
        It has not been profitable to buy and hold Ethereum for 124 out of the
        last 435 days (24%).
      </CoinParagraph>
    </Cointainer>
  );
};
