import React, { useEffect, useState } from 'react';

interface MainItem {
  id: number;
  dateInserted: string;
  name: string;
  pax: number;
  vehicle: number;
  pets: boolean;
  videoke: boolean;
  partial_payment: number;
  full_payment: number;
  paid: boolean;
  checkIn: string;
  checkOut: string;
  room: string;
  user: string;
}

interface HomeProps {
  user: string;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [data, setData] = useState<MainItem[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const defaultOrders: Record<string, 'asc' | 'desc'> = {
    id: 'asc',
    dateInserted: 'desc', // Set to 'desc' for dateInserted
    name: 'asc',
    pax: 'asc',
    vehicle: 'asc',
    pets: 'desc', // Set to 'desc' for pets
    videoke: 'desc', // Set to 'desc' for videoke
    partial_payment: 'asc',
    full_payment: 'asc',
    paid: 'asc',
    checkIn: 'desc', // Set to 'desc' for checkIn
    checkOut: 'desc', // Set to 'desc' for checkOut
    room: 'asc',
    user: 'asc',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/main?sort=${sortColumn}&order=${sortOrder}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result || []);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [sortColumn, sortOrder]);

  const handleSort = (column: string) => {
    if(column != sortColumn){
        setSortOrder(defaultOrders[column]);
    }
    else{
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
    setSortColumn(column);
  };

  const renderHeader = () => {
    return (
      <tr>
        <th onClick={() => handleSort('id')}>ID</th>
        <th onClick={() => handleSort('dateInserted')}>Date Inserted</th>
        <th onClick={() => handleSort('name')}>Name</th>
        <th onClick={() => handleSort('pax')}>Pax</th>
        <th onClick={() => handleSort('vehicle')}>Vehicle</th>
        <th onClick={() => handleSort('pets')}>Pets</th>
        <th onClick={() => handleSort('videoke')}>Videoke</th>
        <th onClick={() => handleSort('partial_payment')}>Partial Payment</th>
        <th onClick={() => handleSort('full_payment')}>Full Payment</th>
        <th onClick={() => handleSort('paid')}>Fully Paid</th>
        <th onClick={() => handleSort('checkIn')}>Check In</th>
        <th onClick={() => handleSort('checkOut')}>Check Out</th>
        <th onClick={() => handleSort('room')}>Room</th>
        <th onClick={() => handleSort('user')}>User</th>
      </tr>
    );
  };

  return (
    <div>
      {user ? 'Hi ' + user : 'You are not logged in'}
      <h1>Main List</h1>
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dateInserted}</td>
              <td>{item.name}</td>
              <td>{item.pax}</td>
              <td>{item.vehicle}</td>
              <td>{item.pets ? 'Yes' : 'No'}</td>
              <td>{item.videoke ? 'Yes' : 'No'}</td>
              <td>{item.partial_payment}</td>
              <td>{item.full_payment}</td>
              <td>{item.paid ? 'Yes' : 'No'}</td>
              <td>{item.checkIn}</td>
              <td>{item.checkOut}</td>
              <td>{item.room}</td>
              <td>{item.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
