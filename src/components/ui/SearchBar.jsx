import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useStore } from '../../store/store';

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const fetchCryptoId = useStore(state => state.fetchCryptoId);

  const handleSubmit = async e => {
    e.preventDefault();
    
    /** Empty Field Validation */
    if (!query.trim()) return

    try {
      const id = await fetchCryptoId(query);
      if (!id) return
      navigate(`/coin/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form 
      onSubmit={ handleSubmit }
      className='w-full md:w-96 bg-white flex gap-2 p-2 focus-within:ring-2 focus-within:ring-slate-500 shadow'
    >
      <input 
        type="text"
        className='flex-1 outline-none bg-transparent' 
        placeholder='Search'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button type="submit">
        <MagnifyingGlassIcon className='text-gray-400 w-6 h-6 cursor-pointer'/>
      </button>
    </form>
  )
}