import React from 'react'

export const PlaceImg = ({place,index=0,className=null}) => {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }
  return (
        <img className={className} src={'https://airbnb-api-sjve.onrender.com/uploads/'+place.photos[index]} alt="" />
   
  )
}
