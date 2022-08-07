import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {FaArrowAltCircleRight} from 'react-icons/fa';
import { Link } from "react-router-dom";

const CoinPage = () => {

  const [coin, setCoin] = useState({});
  // Pull this out the route path in order to display more details about the selected
  // coin.
  const {coinId} = useParams();
  let reqURL = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  useEffect(() => {
    axios.get(reqURL).then((res) => {
      setCoin(res.data)
    }).catch((err) => {
      console.log(err);
    })

  }, [coin])

  return (
    <div className="coin-container max-w-[1200px] mx-auto">
      {/* COIN NAME HEADER SECTION */}
      <div className="coin-name-header text-center font-bold text-4xl drop-shadow-lg shadow-xl py-8">
        <h1>{coin.name}</h1>
      </div>

      {/* COIN RANKING & PRICE SECTION & ACCESS CHART */}
      <div className="drop-shadow-lg shadow-xl py-8 px-16">
        <div className="ranking mb-6">
          <span className="bg-[#6900ff] p-1 rounded-md">Rank # {coin.coingecko_rank}</span>
        </div>
        <div className="price-section-container flex justify-between font-medium">
          <div className="image-name-container flex items-center -ml-1">
            {<img src={coin.image?.small} alt='' className="mr-4"/>}
            <p>{coin.name} <span className="uppercase">({coin.symbol}/usd)</span></p>
          </div>
          <div className="coin-price self-end font-bold sm:text-4xl text-3xl">
            {/* Must check response for truthy or else we can't display the data */}
            {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
          </div>
        </div>
        <div className="access-chart ml-[50px] -mt-2 font-medium">
              <Link to={`/chart/${coinId}`} className="no-underline hover:underline">
                <div className="flex items-center ml-3 gap-2">
                  <p>Access Chart</p>
                  <FaArrowAltCircleRight className="w-6 h-6"/>
                </div>
              </Link>
            </div>
      </div>

      {/* PRICE OVER TIME SECTION */}
      <div className="price-over-time drop-shadow-lg shadow-xl py-8 px-16">
        <div className="font-bold text-lg flex gap-1 text-center">
          <p className="bg-[#333] flex-1 p-2">1h</p>
          <p className="bg-[#333] flex-1 p-2">24h</p>
          <p className="bg-[#333] flex-1 p-2">7d</p>
          <p className="bg-[#333] flex-1 p-2">14d</p>
          <p className="bg-[#333] flex-1 p-2">30d</p>
          <p className="bg-[#333] flex-1 p-2">1y</p>
        </div>
        <div className="price-over-time-percentages mt-2">
          <div className="flex text-lg text-center">
            <p className="w-full">{coin.market_data?.price_change_percentage_1h_in_currency.usd.toLocaleString().slice(0,4)}%</p>
            <p className="w-full">{coin.market_data?.price_change_percentage_24h_in_currency.usd.toLocaleString().slice(0,4)}%</p>
            <p className="w-full">{coin.market_data?.price_change_percentage_7d_in_currency.usd.toLocaleString().slice(0,4)}%</p>
            <p className="w-full">{coin.market_data?.price_change_percentage_14d_in_currency.usd.toLocaleString().slice(0,4)}%</p>
            <p className="w-full">{coin.market_data?.price_change_percentage_30d_in_currency.usd.toLocaleString().slice(0,4)}%</p>
            <p className="w-full">{coin.market_data?.price_change_percentage_1y_in_currency.usd.toLocaleString().slice(0,5)}%</p>
          </div>
        </div>
      </div>

      {/* ADDITIONAL DETAILS SECTION */}
          <div className="additional-details drop-shadow-lg shadow-xl py-8 px-16 text-md md:text-lg flex flex-col sm:flex-row justify-between gap-10">
            <div className="w-full">
              <div className="border-b-2 flex justify-between">
                <p className="font-bold">24 Hour Low</p>
                <p>${coin.market_data?.low_24h.usd.toLocaleString()}</p>
              </div>
              <div className="border-b-2 flex justify-between mt-4">
                <p className="font-bold">24 Hour High</p>
                <p>${coin.market_data?.high_24h.usd.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="border-b-2 flex justify-between">
                <p className="font-bold">Market Cap</p>
                <p>${coin.market_data?.market_cap.usd.toLocaleString()}</p>
              </div>
              <div className="border-b-2 flex justify-between mt-4">
                <p className="font-bold">Circulating Supply</p>
                <p>${coin.market_data?.circulating_supply.toLocaleString()}</p>
              </div>
            </div>
          </div>


      {/* ABOUT SECTION */}
      <div className="about-section drop-shadow-lg shadow-xl py-8 px-16 text-lg">
        <p className="font-bold text-3xl mb-3">About</p>
        <p dangerouslySetInnerHTML={{__html: coin.description ? coin.description.en : '',}}></p>
        {/* <p>{coin.description ? coin.description.en : null}</p> */}
      </div>

    </div>
  )
}

export default CoinPage