import {FaCoins} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Navbar = () => {
  {/* Wrap Navbar in Link to send back to home page */}
  return (
    <Link to="/" className='no-underline'>
        <div className="Logo text-4xl font-bold flex justify-center items-center p-6 gap-3 ">
          <FaCoins className='text-[#6900ff] w-8'/>
          <h1>Coin<span className="text-[#6900ff]"> Search</span></h1>
        </div>
    </Link>
  )
}

export default Navbar