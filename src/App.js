import {useState, useEffect} from 'react';
import axios from "axios";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinSection from "./components/CoinSection";
import CoinPage from "./components/CoinPage";
import CoinChart from "./components/CoinChart";

function App() {
  const [coins, setCoins] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false';
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="App w-full mx-auto p-4 max-w-[1200px]">
      <Navbar/>
      <Routes>
        <Route path="/" element={<CoinSection coins={coins}/>}/>
        <Route path="/coin/:coinId" element={<CoinPage coins={coins}/>}/>
        <Route path="/chart/:coinId" element={<CoinChart coins={coins}/>}/>

      </Routes>
    </div>
  );
}

export default App;
