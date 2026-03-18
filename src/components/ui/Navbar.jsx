import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import { currencies } from "../../utils"
import { useStore } from "../../store/store";

export default function Navbar() {

  const setDisplayCurrency = useStore(state => state.setDisplayCurrency);
  const displayCurrency = useStore(state => state.displayCurrency);

  return (
    <div className='flex justify-between items-center text-white font-bold text-normal md:text-xl'>
      <Link
        to="/"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
          <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
        </svg>
      </Link>

      <div className="flex items-center gap-20">
        <div className="flex items-center gap-3">
          <label 
            htmlFor="preferredCurrency"
            className="font-normal text-xl"
          >
            Currency:
          </label>

          <select 
            name="preferredCurrency" 
            id="preferredCurrency"
            className="border border-slate-500 p-1 text-normal"
            value={displayCurrency}
            onChange={e => setDisplayCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option 
                key={currency.code} 
                value={currency.code} 
                className="text-black"
              >
                { currency.code }
              </option>
            ))}
          </select>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          <Link
            className="hover:text-blue-500"
            to="/"
          >
              Home
          </Link>

          <Link
            className="hover:text-blue-500"
            to="/stocks"
          >
              Stocks
          </Link>

          <Link
            className="hover:text-blue-500"
            to="/funds"
          >
              Fundings
          </Link>
        </nav>
      </div>
      
      <MobileMenu />
    </div>
  )
}