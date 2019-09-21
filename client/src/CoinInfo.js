import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CoinContext } from "./CoinContext";
import { Helmet } from "react-helmet";
import { API_BASE_URL } from "./Api";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePieCanvas } from "@nivo/pie";

const CoinParagraph = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 300;
  margin: 25px 0 25px 0;
`;

const CenteringDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CoinLogoImg = styled.img`
  margin: 25px 0 25px 0;
`;

const LoadingImg = styled.img`
  margin: 25px 0 25px 0;
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
    margin: 25px 0 25px 0;
  `;

  const PieContainer = styled.div`
    width: 450px;
    height: 250px;
  `;

  const LineContainer = styled.div`
    width: 800px;
    height: 400px;
    @media (max-width: 1000px) {
      width: 650px;
      height: 325px;
    }
    @media (max-width: 750px) {
      width: 350px;
      height: 175px;
    }
  `;

  return (
    <div>
      {hasError && <Error>Oops something went wrong. Please try again.</Error>}
      {isLoading && <LoadingImg src="/loading.gif" alt="Loading..." />}
      {coin && (
        <>
          <Helmet>
            <title>{`Crypto In The Black - ${coin.name} (${coin.symbol})`}</title>
          </Helmet>
          {coin.image && <CoinLogoImg src={coin.image} title={coin.name} />}
          <CoinParagraph>{coin.profitableDescription}</CoinParagraph>
          <CenteringDiv>
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
                margin={{ top: 25, right: 100, bottom: 25, left: 100 }}
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
          </CenteringDiv>
          <CoinParagraph>{coin.notProfitableDescription}</CoinParagraph>
          <CenteringDiv>
            <LineContainer>
              <ResponsiveLine
                animate={true}
                margin={{ top: 25, right: 50, bottom: 25, left: 50 }}
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
                axisBottom={null}
                curve={"monotoneX"}
                enableArea={true}
                areaBaselineValue={coin.latestPrice}
                colors={["rgb(73, 105, 99)", "rgb(244, 117, 96)"]}
                enablePointLabel={false}
                pointSize={1}
                pointBorderWidth={1}
                pointLabelYOffset={-20}
                useMesh={true}
                enableSlices={false}
              />
            </LineContainer>
          </CenteringDiv>
          <CoinParagraph>{coin.allTimeHighDescription}</CoinParagraph>
        </>
      )}
    </div>
  );
};
