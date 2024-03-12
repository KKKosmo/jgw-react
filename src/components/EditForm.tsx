// src/components/MainFormSubmit.js
import React, { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from './Calendar';

interface CalendarData {
  dayNumber: string;
  data: string;
  availability: boolean;
}
const EditForm = (props: { user: string }) => {
  const navigate = useNavigate();
  const { user } = props;
  const { id } = useParams(); // Get the ID from the route parameters

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const [calendarData, setCalendarData] = useState<CalendarData[]>(() =>
    Array.from({ length: 42 }, (_, index) => ({
      dayNumber: String(index + 1),
      data: 'data,data,data,data,data,data,',
      availability: true,
    }))
  );

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


  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  interface ApiResponse {
    room: string;
    pets: boolean;
    videoke: boolean;
    // ... other properties
  }

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/main/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json() as ApiResponse;
        setFormData((prevData) => ({
          ...prevData,
          ...result,
          videoke: Boolean(result.videoke),
          pets: Boolean(result.pets),
        }));
        setSelectedRooms(result.room.split(',').map((room) => room.trim().toUpperCase()));

      


      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [id]);


  const [calendarMonth, setCalendarMonth] = useState<string>();

  useEffect(() => {
    setCalendarMonth(`${monthNames[currentDate.getMonth()]}`);

    getNewSet(currentDate.toDateString(), currentDate.toDateString());
    return () => {
    };
  }, [currentDate]);

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const checkForm = async (startDate: string, endDate: string, room: string): Promise<boolean> => {
    try {
      const link = `http://localhost:8000/api/main/checkEditForm?startDate=${startDate}&endDate=${endDate}&room=${room}&id=${id}`;
      console.log(link);
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (!response.ok) {

        const errorData = await response.json();
        const errorMessage = errorData.error;

        throw new Error(`${errorMessage}`);
      }

      const data = await response.json();

      if (data.available === 'true') {
        return true;
      } else if (data.available === 'false') {
        alert("Error: Room " + formData.room + " is/are not available for " + formData.checkIn + " to " + formData.checkOut);
        return false;
      } else {
        throw new Error(`Unexpected response: ${data.available}`);
      }

      // return data.available === 'true';
    } catch (error) {
      console.error('ERROR:', error);
      alert(error);
      return false;
    }
  };

  const getNewSet = async (startDate: string, endDate: string) => {
    try {
      const link = `http://localhost:8000/api/main/getNewSetEdit?startDate=${startDate}&endDate=${endDate}&id=${id}`;
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

      setCalendarData(prevCalendarData => {
        const updatedData = prevCalendarData.map((item, index) => {
          const dayNumber = jsonData.dayNumber[index] || '';
          const data = jsonData.data[index] || '';

          const blockData = data.split(',').map(item => item.trim());
          let isBlockDataValid = true;

          for (const element of selectedRooms) {
            if (!blockData.includes(element)) {
              isBlockDataValid = false;
              break;
            }
          }

          return {
            ...item,
            dayNumber,
            data,
            availability: isBlockDataValid,
          };
        });

        return updatedData;
      });

    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };

  useEffect(() => {
    if (formData.checkOut) { 
      const checkOutDate = new Date(formData.checkOut);
      if (!formData.checkIn || calendarMonth !== monthNames[checkOutDate.getMonth()]) {
        getNewSet(formData.checkOut, formData.checkOut);

        setCurrentDate(new Date(formData.checkOut));
      }
    }
  }, [formData.checkOut]);
  useEffect(() => {
    if (formData.checkIn) {
      const checkInDate = new Date(formData.checkIn);
      if (!formData.checkOut || calendarMonth !== monthNames[checkInDate.getMonth()]) {
        getNewSet(formData.checkIn, formData.checkIn);

        setCurrentDate(new Date(formData.checkIn));
      }
    }
  }, [formData.checkIn]);


  useEffect(() => {
    // if (formData.checkIn && formData.checkOut) {
    setCalendarData(prevCalendarData => {
      const updatedData = prevCalendarData.map(item => {
        const blockData = item.data.split(',').map(item => item.trim());
        let isBlockDataValid = true;

        for (const element of selectedRooms) {
          if (!blockData.includes(element)) {
            isBlockDataValid = false;
            break;
          }
        }

        return {
          ...item,
          availability: isBlockDataValid,
        };
      });
      return updatedData;
    });
    // }
  }, [selectedRooms]);

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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formattedRoom = selectedRooms.join(', ');
    formData.room = formattedRoom;

    try {
      if (await checkForm(formData.checkIn, formData.checkOut, formData.room)) {

        const response = await fetch(`http://localhost:8000/api/main/${id}`, {
          method: 'PUT', // Use PUT method for updating
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.message === 'Record updated successfully') {
          alert(data.message + '\n\nSummary:\n\n' + data.summary);
          navigate('/');
        }
        else if (data.message === 'No changes made'){
          alert(data.message);
          navigate('/');
        }
      }

    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div>
      <h2>Edit Form</h2>
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
          Update
        </button>
      </form>


      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <button onClick={handleNextMonth}>Next Month</button>
        <h1 id='calendarMonth'>
          <span>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</span>
        </h1>
      </div>

      <Calendar calendarData={calendarData} />
    </div>
  );
};

export default EditForm;
