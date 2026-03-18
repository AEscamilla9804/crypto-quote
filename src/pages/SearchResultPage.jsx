import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../store/store'
import SearchBar from '../components/ui/SearchBar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import StockCard from '../components/market/StockCard'

export default function SearchResultPage() {
    const { id } = useParams();
    const loading = useStore(state => state.loading);
    const coinData = useStore(state => state.coinData);
    const fetchCoinById = useStore(state => state.fetchCoinById);
    
    useEffect(() => {
        if (!id) return
        fetchCoinById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className='mx-auto md:w-[75%] flex flex-col justify-center items-center gap-10'>
            <SearchBar />

            { loading && <LoadingSpinner />}

            { coinData && <StockCard coin={coinData} /> }
        </div>
    )
}