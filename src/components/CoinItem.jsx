import React from 'react'

const CoinItem = ({coin}) => {
  return (
      <div className='coinItem max-w-[1200px] mx-auto hover:cursor-pointer hover:transition ease-in-out delay-150 hover:scale-[1.04]'>
        <ul className='w-full flex justify-between drop-shadow-lg shadow-xl text-md py-4 px-4 rounded-md mb-2 hover:underline'>
          <li className="flex-1">{coin.market_cap_rank}</li>
          <div className='img-symbol flex items-center flex-1'>
              <img src={coin.image} alt='tickerImg' className='w-8 h-8 mr-2'/>
              <li className='uppercase'>{coin.symbol}</li>
          </div>
          <li className="flex-1">${coin.current_price.toLocaleString()}</li>
          <li className="flex-1 -mr-10">{String(coin.price_change_percentage_24h).slice(0,4)}%</li>
          <li className="hidden md:flex flex-1">${coin.total_volume.toLocaleString()}</li>
          <li className="hidden md:flex flex-1">${coin.market_cap.toLocaleString()}</li>
        </ul>
      </div>
  )
}

export default CoinItem