import { useEffect } from 'react'
import { useStore } from '../store/store'
import PortfolioCard from '../components/portfolio/PortfolioCard'
import PortfolioStats from '../components/portfolio/PortfolioStats';

export default function Stocks() {
  const portfolio = useStore(state => state.portfolio);
  const fetchPortfolioPrices = useStore(state => state.fetchPortfolioPrices);
  
  const portfolioEmpty = Object.values(portfolio).length === 0;

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
        if (isMounted) fetchPortfolioPrices();
    };

    fetchData();

    const interval = setInterval(fetchData, 120000);

    return () => {
        isMounted = false;
        clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-5'>
        <PortfolioStats />

        <h2 
          className='w-full md:w-[85%] text-center md:text-left font-bold text-3xl pb-5 border-b border-slate-500 mt-5'
        >
          Assets
        </h2>

        { !portfolioEmpty ? (
          <div className='w-full md:w-[85%] grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10'>
            { Object.values(portfolio).map(coin => (
              <PortfolioCard 
                key={coin.id}
                coin={coin}
              />
            ))}
          </div>
        ) : <p className='text-center md:font-semibold text-3xl mt-5'>There are no assets to display</p> }
      </div>
    </>
  )
}