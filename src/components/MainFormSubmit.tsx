// src/components/MainFormSubmit.js
import React, { useState } from 'react';

const MainFormSubmit = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    user: '',
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your Laravel API endpoint
      const response = await fetch('http://127.0.0.1:8000/api/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('Response:', data);

      setFormData({
        user: '',
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
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <div>
      <h2>Main Form</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label className="label">
          User:
          <input className="input" type="text" name="user" value={formData.user} onChange={handleInputChange} />
        </label>
        <label className="label">
          Name:
          <input className="input" type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label className="label">
          Pax:
          <input className="input" type="number" name="pax" value={formData.pax} onChange={handleInputChange} />
        </label>
        <label className="label">
          Vehicle:
          <input className="input" type="number" name="vehicle" value={formData.vehicle} onChange={handleInputChange} />
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
          <input className="input" type="number" step="0.01" name="partial_payment" value={formData.partial_payment} onChange={handleInputChange} />
        </label>
        <label className="label">
          Full Payment:
          <input className="input" type="number" step="0.01" name="full_payment" value={formData.full_payment} onChange={handleInputChange} />
        </label>
        <label className="label">
          Check In:
          <input className="input" type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} />
        </label>
        <label className="label">
          Check Out:
          <input className="input" type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} />
        </label>
        <label className="label">
          Room:
          <input className="input" type="text" name="room" value={formData.room} onChange={handleInputChange} />
        </label>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MainFormSubmit;
