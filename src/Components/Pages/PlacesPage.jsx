import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const PlacesPage = () => {
    const {action} = useParams();

  return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
                <Link className=' inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
        )}
        {action === 'new' && (
           <div>
             <form>
                <h2 className='text-xl mt-4'>Title</h2>
                <input type="text" placeholder='Your Place Title' />
                <p></p>
                <h2 className='text-xl mt-4'>Address</h2>
                <input type="text" placeholder='Your Address' />
                <h2 className='text-xl mt-4'>Photos</h2>
             </form>
           </div>
        )}
    </div>
  );
}
