import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CoinContext } from "./CoinContext";
import { Helmet } from "react-helmet";
import { API_BASE_URL } from "./Api";
import { Line, ResponsiveLine } from "@nivo/line";
import { ResponsivePieCanvas } from "@nivo/pie";

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
      fetch(`${API_BASE_URL}/coin/${coinContext.symbol}`)
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

  const Error = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: 300;
  `;

  const PieContainer = styled.div`
    width: 400px;
    height: 350px;
  `;

  const LineContainer = styled.div`
    width: 700px;
    height: 400px;
  `;

  return (
    <Cointainer>
      <LineContainer>
        <ResponsiveLine
          animate={true}
          margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
          data={[
            {
              id: "positive :)",
              data: [
                { x: "2018-01-01", y: 0.7 },
                { x: "2018-01-02", y: 0.9 },
                { x: "2018-01-03", y: 0.8 },
                { x: "2018-01-04", y: 0.6 },
                { x: "2018-01-05", y: 0.3 },
                { x: "2018-01-06", y: 0 },
                { x: "2018-01-07", y: null },
                { x: "2018-01-08", y: null },
                { x: "2018-01-09", y: null },
                { x: "2018-01-10", y: null },
                { x: "2018-01-11", y: null },
                { x: "2018-01-12", y: 0 },
                { x: "2018-01-13", y: 0.4 },
                { x: "2018-01-14", y: 0.6 },
                { x: "2018-01-15", y: 0.5 },
                { x: "2018-01-16", y: 0.3 },
                { x: "2018-01-17", y: 0.4 },
                { x: "2018-01-18", y: 0 }
              ]
            },
            {
              id: "negative :(",
              data: [
                { x: "2018-01-01", y: null },
                { x: "2018-01-02", y: null },
                { x: "2018-01-03", y: null },
                { x: "2018-01-04", y: null },
                { x: "2018-01-05", y: null },
                { x: "2018-01-06", y: 0 },
                { x: "2018-01-07", y: -0.3 },
                { x: "2018-01-08", y: -0.5 },
                { x: "2018-01-09", y: -0.9 },
                { x: "2018-01-10", y: -0.2 },
                { x: "2018-01-11", y: -0.4 },
                { x: "2018-01-12", y: 0 },
                { x: "2018-01-13", y: null },
                { x: "2018-01-14", y: null },
                { x: "2018-01-15", y: null },
                { x: "2018-01-16", y: null },
                { x: "2018-01-17", y: null },
                { x: "2018-01-18", y: 0 },
                { x: "2018-01-19", y: -0.4 },
                { x: "2018-01-20", y: -0.2 },
                { x: "2018-01-21", y: -0.1 },
                { x: "2018-01-22", y: -0.6 }
              ]
            }
          ]}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            precision: "day"
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            min: -1,
            max: 1
          }}
          axisLeft={{
            legend: "linear scale"
            //legendOffset: 12
          }}
          axisBottom={{
            format: "%b %d",
            tickValues: "every 2 days",
            legend: "time scale"
            //legendOffset: -12
          }}
          curve={"monotoneX"}
          enableArea={true}
          areaBaselineValue={0.2}
          colors={["rgb(97, 205, 187)", "rgb(244, 117, 96)"]}
          enablePointLabel={true}
          pointSize={16}
          pointBorderWidth={1}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]]
          }}
          pointLabelYOffset={-20}
          useMesh={true}
          enableSlices={false}
        />
      </LineContainer>

      {hasError && <Error>Oops something went wrong. Please try again.</Error>}
      {isLoading && <img src="/loading.gif" alt="Loading..." />}
      {coin && (
        <>
          <Helmet>
            <title>{`Crypto In The Black - ${coin.name} (${coin.symbol})`}</title>
          </Helmet>
          {coin.image && <CoinLogoImg src={coin.image} title={coin.name} />}
          <CoinParagraph>{coin.profitableDescription}</CoinParagraph>
          <GraphContainer>
            <PieContainer>
              <ResponsivePieCanvas
                data={[
                  {
                    id: "profitable",
                    label: `Profitable`,
                    value: coin.daysProfitablePercentage
                  },
                  {
                    id: "not-profitable",
                    label: `Not Profitable`,
                    value: coin.daysNotProfitablePercentage
                  }
                ]}
                margin={{ top: 75, right: 100, bottom: 75, left: 100 }}
                pixelRatio={1}
                innerRadius={0.5}
                padAngle={2.5}
                cornerRadius={3}
                colors={["#e8d73b", "#e8d73b0F"]}
                borderWidth={1}
                borderColor={"#FFFFFF"}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#FFFFFF"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={8}
                radialLabelsLinkHorizontalLength={8}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: "color" }}
                sliceLabel={d => `${d.value}%`}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#FFFFFF"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </PieContainer>
          </GraphContainer>
          <CoinParagraph>{coin.notProfitableDescription}</CoinParagraph>
          {console.log(coin.chart.profitable)}
          {console.log(coin.chart.notProfitable)}
          <LineContainer>
            <ResponsiveLine
              animate={true}
              margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
              data={[
                {
                  id: "profitable",
                  data: coin.chart.profitable
                },
                {
                  id: "notProfitable",
                  data: coin.chart.notProfitable
                }
              ]}
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
                precision: "day"
              }}
              xFormat="time:%Y-%m-%d"
              yScale={{
                type: "linear",
                min: 0,
                max: coin.allTimeHighPrice
              }}
              axisBottom={{
                format: "%b %y",
                tickValues: "every 6 months"
              }}
              curve={"monotoneX"}
              enableArea={true}
              areaBaselineValue={coin.latestPrice}
              colors={["rgb(73, 105, 99)", "rgb(244, 117, 96)"]}
              enablePointLabel={false}
              pointSize={1}
              pointBorderWidth={1}
              pointBorderColor={{
                from: "color",
                modifiers: [["darker", 0.3]]
              }}
              pointLabelYOffset={-20}
              useMesh={true}
              enableSlices={false}
            />
          </LineContainer>
        </>
      )}
    </Cointainer>
  );
};
