import { useState } from 'react'
import { useStore } from '../../store/store'
import { formatCurrency, fromUSD } from '../../utils'
import ActionForm from './ActionForm'

export default function PortfolioCard({ coin }) {
    const [mode, setMode] = useState(null);

    const price = useStore(state => state.prices[coin.id]);
    const displayCurrency = useStore(state => state.displayCurrency);

    const { name, symbol, averagePrice, quantity } = coin;

    console.log(averagePrice)

    const value = quantity * price;
    const pnl = (price - averagePrice) * quantity;
    const pnlPercentage = 
        averagePrice > 0 
            ? ((price - averagePrice) / averagePrice) * 100 || 0
            : 0
    const pnlColor = pnl >= 0 ? "text-green-500" : "text-red-500"; 

    /** Localization */
    const localizedAverage = fromUSD(averagePrice, displayCurrency) || 0;
    const localizedPrice = fromUSD(price, displayCurrency) || 0;
    const localizedValue = fromUSD(value, displayCurrency) || 0;
    const localizedPnl = fromUSD(pnl, displayCurrency) || 0;

    return (
        <div className='bg-white p-5 rounded-lg shadow-md flex flex-col gap-3 h-fit'>
            <h2 className='text-xl font-bold'>
                {name} {''}
                <span className='uppercase font-normal'>({ symbol })</span>
            </h2>

            <div className='flex flex-col'>
                <p className='font-bold'>
                    Owned: {''}
                    <span className='font-normal text-gray-700'>{ quantity }</span>
                </p>

                <p className='font-bold'>
                    Average Price: {''}
                    <span className='font-normal text-gray-700'>{ formatCurrency(localizedAverage, displayCurrency) }</span>
                </p>

                <p className='font-bold'>
                    Market Price: {''}
                    <span className='font-normal text-gray-700'>{ formatCurrency(localizedPrice, displayCurrency) }</span>
                </p>

                <p className='font-bold'>
                    Position Value: {''}
                    <span className='font-normal text-gray-700'>{ formatCurrency(localizedValue, displayCurrency) }</span>
                </p>

                <p className='font-bold'>
                    PnL: {''}
                    <span 
                        className={`font-normal ${ pnlColor }`}
                    >
                        {pnl >= 0 ? "+" : ""}{ formatCurrency(localizedPnl, displayCurrency) } ({pnlPercentage.toFixed(2)}%)
                    </span>
                </p>

                <div className='flex items-center gap-2 mt-5  border-t'>
                    <button
                        onClick={() => setMode("buy")}
                        className='w-full p-2 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold mt-3 cursor-pointer'
                    >
                        Buy
                    </button>

                    <button
                        onClick={() => setMode("sell")}
                        className='w-full p-2 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold mt-3 cursor-pointer'
                    >
                        Sell
                    </button>
                </div>

                { mode && (
                    <ActionForm key={mode} coin={coin} mode={mode} setMode={setMode} />
                )}
            </div>
        </div>
    )
}
