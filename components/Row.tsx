import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DocumentData } from 'firebase/firestore'
import React, {useRef, useEffect, useState} from 'react'
import { Movie } from '../typing'
import Thumbnail from './Thumbnail'

interface Props {
    title: string,
    movies: Movie[] | DocumentData[],
}

function Row({title, movies}: Props) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        setIsMoved(true)

        
        if(rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth

            console.log(scrollTo)
            if(scrollTo === 0) {
                setIsMoved(false)
            }
            
            rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
        }
    }
  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
        <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl'>
            {title}
        </h2>
        <div className='group relative md:-ml-2'>
            <ChevronLeftIcon className={`rowButton left-2  
            ${!isMoved && 'hidden'}`} onClick={() => handleClick('left')}/>
           
           <div ref={rowRef} className=' flex items-center space-x-0.5 overflow-x-scroll 
           md:space-x-2.5 md:p-2 scrollbar-hide'> 
               {movies.map(movie => {
                   return <Thumbnail key={movie.id} movie={movie}/>
               })}
               
           </div>
            <ChevronRightIcon className={`rowButton right-2`} 
            onClick={() => handleClick('right')}/>
        </div>
    </div>
  )
}

export default Row
