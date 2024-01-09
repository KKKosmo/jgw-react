// src/components/MainFormSubmit.js
import React, { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';


const MainFormSubmit = (props: { user: string }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = props;

  // useEffect(() =>{

  //   if (user === '') {
  //     navigate('/login'); // Replace '/login' with the actual path to your login page
  //     return;
  //   }
  // })

  const [formData, setFormData] = useState({
    user: user,
    name: '',
    pax: 0,
    vehicle: 0,
    pets: false,
    videoke: false,
    partial_payment: 0.0,
    full_payment: 0.0,
    paid: false,
    checkIn: '',
    checkOut: '',
    room: '',
  });


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // if (type === 'number' && parseFloat(value) < 0) {
    //   e.target.value = '0';
    //   console.log(name);
    // }


    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (formData.room.trim() === '') {
    //   alert('A room must be selected.');
    //   return;
    // }

    // const checkInDate = new Date(formData.checkIn);
    // const checkOutDate = new Date(formData.checkOut);
    // if (checkInDate >= checkOutDate) {
    //   alert('Check-in date must come before Check-out date.');
    //   return;
    // }

    // if (formData.pax <= 0) {
    //   alert('Number of people must be more than 0.');
    //   return;
    // }

    // if (formData.partial_payment > formData.full_payment) {
    //   alert('Partial payment must be less or equal to full payment.');
    //   return;
    // }







    try {
      const response = await fetch('http://localhost:8000/api/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data);

      // setFormData({
      //   user: user,
      //   name: '',
      //   pax: 0,
      //   vehicle: 0,
      //   pets: false,
      //   videoke: false,
      //   partial_payment: 0.0,
      //   full_payment: 0.0,
      //   paid: false,
      //   checkIn: '',
      //   checkOut: '',
      //   room: '',
      // });
      if (data.message === "Record created successfully") {
        navigate('/');
      }

    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <div>
      <h2>Main Form</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label className="label">
          Name:
          <input className="input" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Pax:
          <input className="input" type="number" name="pax" value={formData.pax} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Vehicle:
          <input className="input" type="number" name="vehicle" value={formData.vehicle} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Pets:
          <input className="input" type="checkbox" name="pets" checked={formData.pets} onChange={handleInputChange} />
        </label>
        <label className="label">
          Videoke:
          <input className="input" type="checkbox" name="videoke" checked={formData.videoke} onChange={handleInputChange} />
        </label>
        <label className="label">
          Partial Payment:
          <input className="input" type="number" step="0.01" name="partial_payment" value={formData.partial_payment} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Full Payment:
          <input className="input" type="number" step="0.01" name="full_payment" value={formData.full_payment} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Check In:
          <input className="input" type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Check Out:
          <input className="input" type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Room:
          <input className="input" type="text" name="room" value={formData.room} onChange={handleInputChange} required />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MainFormSubmit;
