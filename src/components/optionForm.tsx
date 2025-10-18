import React, { useState} from 'react'
import {FaUser, FaCalendarAlt, FaDotCircle} from 'react-icons/fa'

function optionForm() {
  const [passengers, setPassengers] = useState(1);
  const [open, setOpen] = useState(false);

  const increment = () => {
    setPassengers(passengers + 1);
  }
  const decrement = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
    else {
      setPassengers(1);
    }
  }


  return (
    <div className='flex items-center justify-between w-full px-4 py-2 border rounded-lg'>
      
    </div>
  )
}

export default optionForm
