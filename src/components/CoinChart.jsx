import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CoinChart = () => {

  const {coinId} = useParams();
  const [historicData, setHistoricData] = useState([]);
  // Ask why it was this
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  let historicDataURL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  let coinDataURL = `https://api.coingecko.com/api/v3/coins/${coinId}`;


// Could be that you were not using async await before but .then, ask Damien
// Mention you think issue is because of unmounting
  useEffect(() => {
    let isMounted = true;
    const fetchHistoricData = async () => {
        try {
          const {data} = await axios.get(historicDataURL);
          if(isMounted) {
            setHistoricData(data.prices);
          }
        } catch(err) {
          if(isMounted) {
            setHistoricData([]);
            console.log(err.message);
          }
        } finally {
          isMounted && setIsLoading(false);
        }
    }
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(coinDataURL);
        if(isMounted) {
          setCoin(response.data);
          // console.log(coin)
        }
      } catch(err) {
        console.log(err.message)
        setCoin({});
      } finally {
        isMounted && setIsLoading(false);
      }
    }
    fetchHistoricData();
    fetchCoinData();

    const cleanUp = () => {
      isMounted = false;
    }
    return cleanUp;

  }, [historicDataURL, coinDataURL])

  const alterDays = (event) => {
    const innerText = event.target.innerHTML;
    const updatedDays = innerText.match(/\d/g).join("");
    setDays(updatedDays);
  }
  return (
    <div className="max-w-[1200px] mx-auto mt-14">
      {(!historicData | isLoading) ? <>Loading</> : (
      <div className="flex flex-col lg:flex-row">
        {/* COIN SIDE SECTION */}
        <div className="side-section lg:w-[30%] lg: border-r-2 p-4">
          <div className="image-title-section flex flex-col gap-4 justify-center items-center">
            {(coin.image) ? <img src={coin.image.large} alt='' className="h-36"/> : null}
            <h1 className="font-extrabold text-5xl">{coin.name}</h1>
          </div>

          {/* Inquire About description being too long*/}
          <div className="extra-details-section mt-4 flex flex-col gap-4 items-center lg:items-start">
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en.slice(0,188) : ''),}}></p>
            <p className="text-xl"><span className="font-bold">Rank:</span> {coin.coingecko_rank}</p>
            <div className="flex gap-1 text-xl">
              <span className="font-bold">Current Price:</span>
              <p>{coin.market_data?.current_price ? <p>${coin.market_data.current_price.usd.toLocaleString()}</p> : null}</p>
            </div>
            <p className="text-xl"><span className="font-bold">Market Cap: </span>${coin.market_data?.market_cap.usd.toLocaleString()}</p>

          </div>
        </div>

        {/* CHART */}
        <div className="chart-section lg:w-[70%] py-6 px-8">
        <Line
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                ? `${(date.getHours() - 12)}:${String(date.getMinutes()).padStart(2,'0')} PM`
                : `${(date.getHours() - 12) == 0 || date.getHours() == 0 ? 12 : date.getHours()}:${String(date.getMinutes()).padStart(2,'0')} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData?.map((coin) => coin[1]),
                label: `Price (Past ${days} days) $USD`,
                borderColor: "#6900ff"
              }
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 2,
              },
            },
          }}
        />
        {/* BUTTONS */}
        <div className="day-selectors flex justify-between mt-4 ">
          <button onClick={alterDays} className="rounded-md bg-[#6900ff] py-2 px-4">7D</button>
          <button onClick={alterDays} className="rounded-md bg-[#6900ff] py-2 px-4">14D</button>
          <button onClick={alterDays} className="rounded-md bg-[#6900ff] py-2 px-4">30D</button>
          <form onSubmit={(e) => e.preventDefault()}>
            <input onChange={(e) => e.target.value ? setDays(e.target.value) : setDays(1)} type="text" className="rounded-md bg-[#6900ff] py-2 px-4 w-[120px]"
                placeholder='Enter Days'/>
          </form>
        </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default CoinChart