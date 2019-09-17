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
                { x: 0, y: 0.7 },
                { x: 1, y: 0.9 },
                { x: 2, y: 0.8 },
                { x: 3, y: 0.6 },
                { x: 4, y: 0.3 },
                { x: 5, y: 0 },
                { x: 6, y: null },
                { x: 7, y: null },
                { x: 8, y: null },
                { x: 9, y: null },
                { x: 10, y: null },
                { x: 11, y: 0 },
                { x: 12, y: 0.4 },
                { x: 13, y: 0.6 },
                { x: 14, y: 0.5 },
                { x: 15, y: 0.3 },
                { x: 16, y: 0.4 },
                { x: 17, y: 0 }
              ]
            },
            {
              id: "negative :(",
              data: [
                { x: 5, y: 0 },
                { x: 6, y: -0.3 },
                { x: 7, y: -0.5 },
                { x: 8, y: -0.9 },
                { x: 9, y: -0.2 },
                { x: 10, y: -0.4 },
                { x: 11, y: 0 },
                { x: 12, y: null },
                { x: 13, y: null },
                { x: 14, y: null },
                { x: 15, y: null },
                { x: 16, y: null },
                { x: 17, y: 0 },
                { x: 18, y: -0.4 },
                { x: 19, y: -0.2 },
                { x: 20, y: -0.1 },
                { x: 21, y: -0.6 }
              ]
            }
          ]}
          curve="monotoneX"
          enablePointLabel={true}
          pointSize={4}
          pointBorderWidth={1}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]]
          }}
          pointLabelYOffset={-20}
          enableGridX={false}
          colors={["rgb(97, 205, 187)", "rgb(244, 117, 96)"]}
          xScale={{
            type: "linear"
          }}
          yScale={{
            type: "linear",
            stacked: false,
            min: -1,
            max: 1
          }}
          enableArea={true}
          areaOpacity={0.14}
          enableSlices={false}
          useMesh={true}
          crosshairType="cross"
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
          <CoinParagraph>
            It has been profitable to buy and hold {coin.name} for{" "}
            {coin.daysProfitable} out of the last {coin.totalDays} days (
            {coin.daysProfitablePercentage}%) since {formatDate(coin.sinceDate)}
            .
          </CoinParagraph>
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
