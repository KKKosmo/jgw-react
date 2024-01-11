// src/components/MainFormSubmit.js
import React, { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';

interface CalendarData {
  dayNumber: number;
  data: string;
  availability: boolean;
}

// interface dataSet{
//   checkIn: string;
//   checkOut: string;
//   room: Array<String>;
// }


const MainFormSubmit = (props: { user: string }) => {
  const navigate = useNavigate();
  const { user } = props;
  const [calendarData, setCalendarData] = useState<CalendarData[]>(() =>
    Array.from({ length: 42 }, (_, index) => ({
      dayNumber: index + 1,
      data: 'data,data,data,data,data,data,',
      availability: index % 2 === 0,
    }))
  );
  const [currentSet, setCurrentSet] = useState<Array<String>>();



  const [formData, setFormData] = useState({
    user: user,
    name: '',
    pax: 0,
    vehicle: 0,
    pets: null,
    videoke: null,
    partial_payment: 0.0,
    full_payment: 0.0,
    paid: false,
    checkIn: '',
    checkOut: '',
    room: '',
  });

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value === 'true' : value,
    }));

// AND BOTH ARE NOT EMPTY
    if(type === 'date'){
    
      if(formData.checkIn && formData.checkOut && formData.room){
        console.log(formData.checkIn);
        console.log(formData.checkOut);
        console.log(formData.room);
        checkForm(formData.checkIn, formData.checkOut, formData.room);
      }
    }
  };


  const checkForm = async (startDate: string, endDate: string, room: string) => {
    try {
      const link = `http://localhost:8000/api/main/checkForm?startDate=${startDate}&endDate=${endDate}&room=${room}`;
      // console.log(link);
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // setCurrentSet(data.message.room);
      // setCurrentSet(data);
      console.log(data.available);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };



  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
  
    if (name === 'exclusive' && checked) {
      setSelectedRooms(['EXCLUSIVE']);
    } else {
      setSelectedRooms((prevRooms) => {
        if (checked) {
          return [...prevRooms.filter((room) => room !== 'EXCLUSIVE'), name.toUpperCase()];
        } else {
          return prevRooms.filter((room) => room !== name.toUpperCase());
        }
      });
    }
    console.log("formatted = " + selectedRooms)
    formData.room = selectedRooms.join(',');

    
    if(formData.checkIn && formData.checkOut && formData.room){
      console.log(formData.checkIn);
      console.log(formData.checkOut);
      console.log(formData.room);
      checkForm(formData.checkIn, formData.checkOut, formData.room);
    }
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formattedRoom = selectedRooms.join(',');
    console.log(formattedRoom);

    try {
      formData.room = formattedRoom;
      formData.user = user;
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

      if (data.message === 'Record created successfully') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/main`);
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };  
  



  const getNewSet = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/main/getNewSet?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // setCurrentSet(data.message.room);
      // setCurrentSet(data);
      console.log(data[0].room);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };
  


  return (
    <div>
      <h2>Main Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Name:
          <input className="input" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Pax:
          <input className="input" type="number" name="pax" min="0" value={formData.pax} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Vehicle:
          <input className="input" type="number" name="vehicle" min="0" value={formData.vehicle} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Pets:
          <input
            className="input"
            type="radio"
            name="pets"
            value="true"
            checked={formData.pets === true}
            onChange={handleInputChange}
          /> Yes
          <input
            className="input"
            type="radio"
            name="pets"
            value="false"
            checked={formData.pets === false}
            onChange={handleInputChange}
          /> No
        </label>
        <label className="label">
          Videoke:
          <input
            className="input"
            type="radio"
            name="videoke"
            value="true"
            checked={formData.videoke === true}
            onChange={handleInputChange}
          /> Yes
          <input
            className="input"
            type="radio"
            name="videoke"
            value="false"
            checked={formData.videoke === false}
            onChange={handleInputChange}
          /> No
        </label>
        <label className="label">
          Partial Payment:
          <input className="input" type="number" step="0.01" min="0" name="partial_payment" value={formData.partial_payment} onChange={handleInputChange} required />
        </label>
        <label className="label">
          Full Payment:
          <input className="input" type="number" step="0.01" min="0" name="full_payment" value={formData.full_payment} onChange={handleInputChange} required />
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
          <input
            className="input"
            type="checkbox"
            name="J"
            checked={selectedRooms.includes('J')}
            onChange={handleCheckboxChange}
          />
          J
          <input
            className="input"
            type="checkbox"
            name="G"
            checked={selectedRooms.includes('G')}
            onChange={handleCheckboxChange}
          />
          G
          <input
            className="input"
            type="checkbox"
            name="a"
            checked={selectedRooms.includes('A')}
            onChange={handleCheckboxChange}
          />
          ATTIC
          <input
            className="input"
            type="checkbox"
            name="k1"
            checked={selectedRooms.includes('K1')}
            onChange={handleCheckboxChange}
          />
          KUBO 1
          <input
            className="input"
            type="checkbox"
            name="k2"
            checked={selectedRooms.includes('K2')}
            onChange={handleCheckboxChange}
          />
          KUBO 2
          <input
            className="input"
            type="checkbox"
            name="exclusive"
            checked={selectedRooms.includes('EXCLUSIVE')}
            onChange={handleCheckboxChange}
          />
          EXCLUSIVE
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <Calendar calendarData={calendarData} />

    </div>
  );
};

export default MainFormSubmit;
