import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import AccountMenu from './AccountMenu'
import BasicMenu from './BasicMenu'

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)



    useEffect(() => {
      const handleScroll = () => {
          if(window.scrollY > 0) {
              setIsScrolled(true)
          } else {
              setIsScrolled(false)
          }
      }
    
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            {/* Gives margin between the children */}
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <BasicMenu />
                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink"><Link href="/">Home</Link></li>
                    <li className="headerLink">TV Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink"><Link href="/myList">My List</Link></li>
                </ul>
            </div>

            <div className='flex items-center space-x-4 text-sm font-light'>
                <SearchIcon className='hidden sm:inline h-6 w-6 ' />
                <p className='hidden lg:inline'>Kid</p>
                <BellIcon className='h-6 w-6' />
                <AccountMenu />
            </div>
        </header>
    )
}

export default Header
