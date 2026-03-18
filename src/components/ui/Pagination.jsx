import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { useStore } from "../../store/store"

export default function Pagination({ currentPage, hasMore }) {
    const prevPage = useStore(state => state.prevPage); 
    const nextPage = useStore(state => state.nextPage);

    return (
        <div className="flex justify-center items-center gap-5 mb-10">
            <button
                className="p-2 rounded-[50%] border border-slate-400 bg-white cursor-pointer hover:ring-2 hover:ring-blue-400 disabled:opacity-50 disabled:ring-0"
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
                className="p-2 rounded-[50%] border border-slate-400 bg-white cursor-pointer hover:ring-2 hover:ring-blue-400 disabled:opacity-50 disabled:ring-0"
                onClick={nextPage}
                disabled={!hasMore}
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    )
}