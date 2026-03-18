import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false)
        }
        
        if (isOpen) document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className='relative md:hidden' ref={ menuRef }>
            <button
                className='p-2'
                onClick={() => setIsOpen(prev => !prev)}
            >
                { isOpen ? (
                    <XMarkIcon className='h-8 w-8 pointer-events-none' />
                ) : (
                    <Bars3Icon className='h-8 w-8 pointer-events-none' />
                )}
            </button>

            <nav
                className={`
                    absolute right-0 mt-2 w-40 bg-slate-800 shadow-lg rounded-lg p-4 space-y-3 transition-all duration-200 origin-top-right

                    ${ isOpen 
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }
                `}
            >
                <Link
                    className='block'
                    to="/"
                    onClick={() => setIsOpen(false)}
                >
                    Home
                </Link>

                <Link
                    className='block'
                    to="/stocks"
                    onClick={() => setIsOpen(false)}
                >
                    Stocks
                </Link>

                <Link
                    className='block'
                    to="/funds"
                    onClick={() => setIsOpen(false)}
                >
                    Fundings
                </Link>
            </nav>
        </div>
    )
}