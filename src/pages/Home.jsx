import { useEffect } from 'react'
import { useStore } from '../store/store'
import SearchBar from '../components/ui/SearchBar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import StockCard from '../components/market/StockCard' 
import Pagination from '../components/ui/Pagination'
import FundsBanner from '../components/ui/FundsBanner'

export default function Home() {
  const currentPage = useStore(state => state.currentPage);
  const fetchMarket = useStore(state => state.fetchMarket);
  const hasMore = useStore(state => state.hasMore);
  const loading = useStore(state => state.loading);
  const market = useStore(state => state.market);
  const error = useStore(state => state.error);

  useEffect(() => {
    fetchMarket();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [fetchMarket, currentPage]);

  console.log(error)

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-5'>
        <SearchBar />

        <div className='mt-5'>
          <FundsBanner />
        </div>

        { error ? (
          <p className='text-2xl md:text-4xl mt-10 text-center'>
            {error}
          </p>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className='mt-5 w-full md:w-[85%] grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10'>
            { market.map(coin => (
              <StockCard key={coin.symbol} coin={coin} />
            ))}
          </div>
        )}

        { market.length === 10 && !error && (
          <Pagination 
            currentPage={currentPage}
            hasMore={hasMore}
          />
        )}
      </div>
    </>
  )
}