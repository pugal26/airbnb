import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from "date-fns"
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

export const BookingWidget = ({ place }) => {
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [contact,setContact] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 1;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    //Booking function
    async function bookThisPlace() {
        try {
            const response = await axios.post('/bookings', {
                checkIn, checkOut, numberOfGuests, name, contact,
                place: place._id, price: numberOfNights * place.price,
            });
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            console.error('Error during booking:', error);
            // Handle error state here if needed
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    
  return (
    <div className="bg-white shadow  p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price: ${place.price} / Per Night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className='py-3 px-4'>
                                <label>Check In:</label>
                                <input type="date" 
                                    value={checkIn} 
                                    onChange={e => setCheckIn(e.target.value)}/>
                            </div>
                            <div className='py-3 px-4 border-l'>
                                <label>Check Out:</label>
                                <input type="date" 
                                    value={checkOut} 
                                    onChange={e => setCheckOut(e.target.value)} />
                            </div>
                        </div>
                        <div className='py-3 px-4 border-t'>
                                <label>Number of Guests:</label>
                                <input type="number" 
                                    value={numberOfGuests} 
                                    onChange={e => setNumberOfGuests(e.target.value)}/>
                        </div>
                        {numberOfNights > 0 && (
                            <div className='py-3 px-4 border-t'>
                                <label>Your Full Name:</label>
                                <input type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}/>
                                <label>Contact No:</label>
                                <input type="tel" 
                                    value={contact} 
                                    onChange={e => setContact(e.target.value)}/>
                            </div>
                        )}
                    </div>                
                    <button onClick={bookThisPlace} className='primary mt-4'>
                        Book Here
                        {numberOfNights > 0 && (
                            <span> ${numberOfNights * place.price}</span>
                        )}
                    </button>
                </div>
  )
}
