import { useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { formatCurrency, formatMarketCap, fromUSD } from "../../utils"
import { useStore } from "../../store/store"
import { toast } from "react-toastify";

export default function StockCard({ coin }) {
  const [amount, setAmount] = useState(0);

  const buyAsset = useStore(state => state.buyAsset);
  const displayCurrency = useStore(state => state.displayCurrency);

  const { id, name, symbol, image, current_price, market_cap, price_change_percentage_24h } = coin;
  const disableBtn = amount <= 0;

  const localizedCurrentPrice = fromUSD(current_price, displayCurrency);
  const localizedMarketCap = fromUSD(market_cap, displayCurrency);

  const handleChange = e => {
    const value = e.target.value;

    value === "" ? setAmount("") : setAmount(Number(value));
  }
  
  const handleSubmit = async e => {
    e.preventDefault();

    /** Empty Field Validation */
    if (amount <= 0) {
      toast.error("Invalid amount");
      setAmount(0);
      return
    }

    /** User Confirmation */
    const confirm = window.confirm("Are you sure you want to procede?");
    if (!confirm) {
      setAmount(0);
      return
    }

    /** Buy Assets */
    const data = { id, name, symbol }
    const result = await buyAsset(data, Number(amount))

    if (result.success) {
      toast.success(result.message);
      setAmount(0);
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div 
      className='bg-white p-5 rounded-lg shadow-md flex flex-col gap-3'
    >
      <div className='flex items-center justify-between'>
        <img 
          src={ image } 
          alt={ name }
          className='w-10 h-10' 
        />

        <div>
          <h2 className="font-semibold text-lg">
            {name}
          </h2>

          <p className="text-gray-500 uppercase text-sm text-right">
            {symbol}
          </p>
        </div>
      </div>

      <div>
        <p className='font-bold'>
          Market Cap: {''}
          <span className='font-normal text-gray-700'>{ formatMarketCap(localizedMarketCap, displayCurrency) }</span>
        </p>

        <p className='font-bold'>
          Current Price: {''}
          <span className='font-normal text-gray-700'>{ formatCurrency(localizedCurrentPrice, displayCurrency) }</span>
        </p>

        <p className='font-bold'>
          24H Change: {''}
          <span className='font-normal text-gray-700'>{ price_change_percentage_24h !== null 
            ? price_change_percentage_24h.toFixed(4) 
            : "0.00" }%
          </span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-3"
        >
            <label 
              htmlFor="amount"
              className="font-bold"
            >
              Amount:
            </label>

            <div className="flex items-center gap-3">
              <button
                  type="button"
                  disabled={disableBtn}
                  className="disabled:opacity-30 cursor-pointer"
                  onClick={() => setAmount(prev => Math.max(0, (prev || 0) - 1))}
                >
                  <MinusCircleIcon className="h-10 w-10 md:h-8 md:w-8 text-indigo-800" />
                </button>

              <input 
                type="number" 
                name="amount" 
                id="amount"
                min={0}
                step={1}
                onWheel={e => e.target.blur()}
                value={amount}
                onChange={handleChange}
                className="border border-slate-300 p-2 outline-none w-16 text-slate-800"
              />

              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setAmount(prev => prev === "" ? 1 : prev + 1)}
              >
                <PlusCircleIcon className="h-10 w-10 md:h-8 md:w-8 text-indigo-800" />
              </button>
            </div>

            <input 
              type="submit" 
              value="Buy Assets"
              disabled={disableBtn}
              className="w-full p-3 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold mt-3 cursor-pointer disabled:opacity-70"
            />
        </form>
      </div>
    </div>
  )
}