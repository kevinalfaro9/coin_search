import CoinItem from "./CoinItem"
import { Link } from "react-router-dom"
const CoinSection = ({coins}) => {

  return (
    <div className="CoinSection max-w-[1200px] mx-auto">
          <ul className="topList w-full flex justify-between drop-shadow-lg shadow-xl font-bold py-4 px-4 rounded-md">
            <li className="flex-1">#</li>
            <li className="flex-1">Coin</li>
            <li className="flex-1">Price</li>
            <li className="flex-1">Change (24h)</li>
            <li className="hidden md:flex flex-1">Volume</li>
            <li className="hidden md:flex flex-1">Mkt Cap</li>
          </ul>
          {coins.map(coin => (
              <Link to={`/coin/${coin.id}`} key={coin.id} className='no-underline'>
                <CoinItem coin={coin}/>
             </Link>
          ))}
    </div>
  )
}

export default CoinSection