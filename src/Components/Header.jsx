import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

export const Header = () => {
  const {user} = useContext(UserContext);
  return (
    <header className='flex justify-between'>
        <Link to={'/'} href="" className="flex items-center gap-1">
          <img className='w-8 h-8 ' src="https://cdn.iconscout.com/icon/free/png-512/free-airbnb-12-735046.png?f=webp&w=256" alt="" />
        <span className='font-bold text-xl'>airbnb</span>
        </Link>
        <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
          <div>Any where</div>
          <div className='border-l border-gray-300'></div>
          <div>Any week</div>
          <div className='border-l border-gray-300'></div>
          <div>Add guests</div>
          <button className='bg-primary text-white p-2 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        <Link to={user?'/account':'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='text-gray rounded-full overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
  )
}
