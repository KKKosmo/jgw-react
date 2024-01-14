// src/components/MainFormSubmit.js
import React, { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';

interface CalendarData {
  dayNumber: string;
  data: string;
  availability: boolean;
}

const MainFormSubmit = (props: { user: string }) => {
  const navigate = useNavigate();
  const { user } = props;

  const [calendarData, setCalendarData] = useState<CalendarData[]>(() =>
    Array.from({ length: 42 }, (_, index) => ({
      dayNumber: String(index + 1),
      data: 'data,data,data,data,data,data,',
      availability: index % 2 === 0,
    }))
  );

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

  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === 'e' && checked) {
      setSelectedRooms(['E']);
    } else {
      setSelectedRooms((prevRooms) => {
        if (checked) {
          return [...prevRooms.filter((room) => room !== 'E'), name.toUpperCase()];
        } else {
          return prevRooms.filter((room) => room !== name.toUpperCase());
        }
      });
    }
  };

  useEffect(() => {
    formData.room = selectedRooms.join(',');

    if (formData.checkIn && formData.checkOut && formData.room) {
      console.log(formData.room);
       console.log(checkForm(formData.checkIn, formData.checkOut, formData.room));
    }
  }, [selectedRooms, formData.checkIn, formData.checkOut]);

  const checkForm = async (startDate: string, endDate: string, room: string): Promise<boolean> => {
    try {
      const link = `http://localhost:8000/api/main/checkForm?startDate=${startDate}&endDate=${endDate}&room=${room}`;
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

      if (data.available === 'true') {
        return true;
      } else if (data.available === 'false') {
        return false;
      } else {
        throw new Error(`Unexpected response: ${data.available}`);
      }

      // return data.available === 'true';
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      return false; // Return false in case of an error
    }
  };
  






  const getNewSet = async (startDate: string, endDate: string) => {
    try {
      const link = `http://localhost:8000/api/main/getNewSet?startDate=${startDate}&endDate=${endDate}`;
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

      interface ApiResponse {
        dayNumber: string[];
        data: string[];
      }

      const jsonData: ApiResponse = await response.json();
      
      const updatedCalendarData = calendarData.map((item, index) => {
        const dayNumber = jsonData.dayNumber[index] || '';
        const data = jsonData.data[index] || '';
        
        return {
          dayNumber,
          data,
          availability: item.availability,
        };
      });
      
      setCalendarData(updatedCalendarData);

    console.log(jsonData);

    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };


  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
       getNewSet(formData.checkIn, formData.checkOut);
    }
  }, [formData.checkIn, formData.checkOut]);








  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formattedRoom = selectedRooms.join(',');
    console.log(formattedRoom);
    formData.room = formattedRoom;

    try {
      if(await checkForm(formData.checkIn, formData.checkOut, formData.room)){
        console.log("here1");
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
      }
      else{
        console.log("here2");
        alert("not available");
      }
    } catch (error) {
      console.error('Error creating record:', error);
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
            name="e"
            checked={selectedRooms.includes('E')}
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
