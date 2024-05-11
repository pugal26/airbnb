import React, { useEffect, useState } from 'react'
import { PhotosUploader } from '../PhotosUploader';
import { Perks } from '../Perks';
import { AccountNav } from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const PlacesFormPage = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        try {
        if (!id) {
            return;
        }
        axios.get('/places/'+id)
            .then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            });
        } catch (error) {
            console.error('Error fetching place:', error);
            // Handle error state here if needed
        }
    }, [id]);

    // This function generates a header element with the specified text.
    function inputHearder(text){
        return (
            <h2 className='text-xl mt-4'>{text}</h2>
        );
    }

    // This function generates a description paragraph element with the specified text.
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm mt-2'>{text}</p>
        );
    }

    // This function combines the inputHeader and inputDescription functions to display a header and description.
    function preInput(header,description) {
        return (
            <>
                {inputHearder(header)}
                {inputDescription(description)}
            </>
        );
    }

    // This function handles the submission of place data, either updating an existing place or creating a new one.
    async function savePlace(e) {
        e.preventDefault();
        const placeData = {title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData        
            });
            setRedirect(true);
        } else {
            //new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
        
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    
  return (
    <div>
        <AccountNav />
             <form onSubmit={savePlace}>
                {preInput('Title')}
                <input value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    type="text" placeholder='Title' />
                {preInput('Address')}
                <input value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    type="text" placeholder='Your Address' />
                {preInput('Photos')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
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
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
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
                    <div>
                        <h3 className='mt-2 -mb-1'>Price Per Night</h3>
                        <input type="number" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                {preInput('','Add check in and out times, remember to have some time window for cleaning the room between guests')}
                <button className='primary my-4'>Save</button>
             </form>
           </div>
  )
}
