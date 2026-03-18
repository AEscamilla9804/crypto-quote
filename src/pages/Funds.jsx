import { useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { formatCurrency, fromUSD } from '../utils';
import FundsForm from '../components/funds/FundsForm';

export default function Funds() {
  const displayCurrency = useStore(state => state.displayCurrency);
  const usdBalance = useStore(state => state.usdBalance);
  const resetPortfolio = useStore(state => state.resetPortfolio);
  
  const localizedFunds = useMemo(() => fromUSD(usdBalance, displayCurrency), [displayCurrency, usdBalance]);
  const [mode, setMode] = useState(null);

  const handleClick = () => {
    const confirm = window.confirm("Do you wish to reset the app?");

    if (!confirm) return

    resetPortfolio();
  }
    
  return (
    <div className='w-full md:w-[50%] flex flex-col gap-5 mx-auto'>
      <div className='flex items-center pb-5 border-b border-slate-500'>
        <h1 className='w-full text-left font-bold text-2xl md:text-3xl'>
          Fundings
        </h1>

        <button 
          className='w-48 md:w-36 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold cursor-pointer'
          onClick={handleClick}
        >
          Reset App
        </button>
      </div>

      <div className='bg-white rounded-lg shadow mx-auto w-full p-5 flex flex-col gap-5 md:flex-row md:justify-between md:items-center'>
        <p className='font-bold text-xl text-center md:text-left'>
          Available Funds: {''}
          <span className='font-normal'>{ formatCurrency(localizedFunds, displayCurrency) }</span>
        </p>

        <div className='flex items-center justify-center gap-3'>
          <button
            onClick={() => setMode("deposit")}
            className='w-36 py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white uppercase font-bold cursor-pointer'
          >
            Deposit
          </button>

          <button
            onClick={() => setMode('withdraw')}
            className='w-36 py-2 px-3 bg-green-700 hover:bg-green-800 text-white uppercase font-bold cursor-pointer'
          >
            Withdraw
          </button>
        </div>
      </div>

      { mode && (
        <FundsForm key={mode} mode={mode} setMode={setMode} />
      )}
    </div>
  )
}