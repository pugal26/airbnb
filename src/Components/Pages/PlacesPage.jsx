import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Perks } from '../Perks';
import axios from 'axios';

export const PlacesPage = () => {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);

    function inputHearder(text){
        return (
            <h2 className='text-xl mt-4'>{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm mt-2'>{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
                {inputHearder(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(e) {
        e.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos',files[i]);
        }
        axios.post('/upload',data, {
            headers: {'Content-Type':'multipart/from-data'}
        }).then(response => {
            const {data:filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }
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
                {preInput('Title')}
                <input value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    type="text" placeholder='Title' />
                {preInput('Address')}
                <input value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    type="text" placeholder='Your Address' />
                {preInput('Photos')}
                <div className='flex gap-2'>
                    <input value={photoLink} 
                        onChange={e => setPhotoLink(e.target.value)} 
                        type="text" placeholder={'Add using a link ...jpg'} />
                    <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp; Photo</button>
                </div>
                <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='h-32 flex'>
                        <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/'+link} alt="" />
                    </div>
                ))}
                    <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                    Upload here                    
                    </label>
                </div>
                {preInput('Description')}
                <textarea value={description} 
                    onChange={e => setDescription(e.target.value)} placeholder='Description of the place'/>
                {preInput('Perks')}
                <div className='grid mt-2 gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('','Select all the preks of your place')}
                {preInput('Extra Info')}
                <textarea value={extraInfo} 
                    onChange={e => setExtraInfo(e.target.value)} placeholder='House Rules and Etc.' />
                {preInput('Check in & out times, max guests')}
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" 
                            value={checkIn} 
                            onChange={e => setCheckIn(e.target.value)} 
                            placeholder='03.00 PM' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" 
                            value={checkOut} 
                            onChange={e => setCheckOut(e.target.value)} 
                            placeholder='11.00 AM' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" 
                            value={maxGuests} 
                            onChange={e => setMaxGuests(e.target.value)} />
                    </div>
                </div>
                {preInput('','Add check in and out times, remember to have some time window for cleaning the room between guests')}
                <button className='primary my-4'>Save</button>
             </form>
           </div>
        )}
    </div>
  );
}
