import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AddressLink } from '../AddressLink';
import { PlaceGallery } from '../PlaceGallery';
import { BookingDates } from '../BookingDates';

export const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        try {
            if (id) {
                axios.get('/bookings')
                    .then(response => {
                        const foundBooking = response.data.find(({ _id }) => _id === id);
                        if (foundBooking) {
                            setBooking(foundBooking);
                        }
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        } catch (error) {
            console.error('Error fetching booking:', error);
            // Handle error state here if needed
        }
    }, [id]);

    if (!booking) {
        return '';
    }
  return (
    <div className='mt-8'>
        <h1 className='text-3xl'>{booking.place.title}</h1>
        <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
                <h2 className='text-2xl mb-4'>Your Booking Information</h2>
                <BookingDates booking={booking}  />
            </div>
            <div>
            <div className='bg-primary p-6 text-white rounded-2xl'>
                <div>Total Price</div>
                <div className='text-3xl'>${booking.price}</div>   
            </div>
            </div>
        </div>


        <PlaceGallery place={booking.place} />
    </div>
  )
}
