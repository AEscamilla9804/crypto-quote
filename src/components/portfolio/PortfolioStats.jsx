import { useStore } from '../../store/store'
import { formatCurrency, fromUSD } from '../../utils';
import FundsBanner from '../ui/FundsBanner'
import AllocationChart from './AllocationChart';

export default function PortfolioStats() {
    const portfolio = useStore(state => state.portfolio);
    const prices = useStore(state => state.prices);
    const displayCurrency = useStore(state => state.displayCurrency);
    const error = useStore(state => state.error)

    const assets = Object.values(portfolio);

    const portfolioValue = assets.reduce((total, asset) => {
        const price = prices[asset.id] || 0
        return total + asset.quantity * price
    }, 0);

    const totalInvestedCapital = assets.reduce((total, asset) => {
        return total + asset.quantity * asset.averagePrice
    }, 0);

    const pnl = portfolioValue - totalInvestedCapital || 0
    const pnlPercentage = 
        totalInvestedCapital > 0
            ? (pnl / totalInvestedCapital) * 100
            : 0
    const pnlColor = pnl >= 0 ? "text-green-500" : "text-red-500"; 

    /** Localization */
    const localizedPortfolioValue = fromUSD(portfolioValue, displayCurrency);
    const localizedPnl = fromUSD(pnl, displayCurrency);

    return (
        <>
            <h2 className='w-full md:w-[85%] text-center md:text-left font-bold text-3xl pb-5 border-b border-slate-500'>
                Summary
            </h2>

            <div className='w-full md:w-[85%] bg-white p-5 rounded-md shadow flex flex-col md:flex-row justify-between gap-3'>
                <FundsBanner />

                <p className='text-xl font-bold'>
                    Portfolio Value: {''}
                    <span className='font-normal text-gray-700'>
                        { formatCurrency(localizedPortfolioValue, displayCurrency) }
                    </span>
                </p>

                <p className='text-xl font-bold'>
                    PnL: {''}
                    <span 
                        className={`font-normal ${ pnlColor }`}
                    >
                        {pnl >= 0 ? "+" : ""}{ formatCurrency(localizedPnl, displayCurrency) } ({pnlPercentage.toFixed(2)}%)
                    </span>
                </p>
            </div>

            { error ? (
                <p className="bg-white w-full md:w-[85%] rounded-lg shadow p-5 text-red-500 font-semibold text-center">
                    {error}
                </p>
            ) : (
                <AllocationChart portfolio={assets} prices={prices} />
            )}
        </>
    )
}