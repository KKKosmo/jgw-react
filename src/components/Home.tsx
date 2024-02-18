import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'react-bootstrap';

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
  balance: number;
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
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MainItem | null>(null); // Track selected item for modal
  const [showModal, setShowModal] = useState(false);

  const handleExpand = (item: MainItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
    balance: 'desc',
    paid: 'asc',
    checkIn: 'desc', // Set to 'desc' for checkIn
    checkOut: 'desc', // Set to 'desc' for checkOut
    room: 'asc',
    user: 'asc',
  };

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

  useEffect(() => {
    // Call fetchData when the component mounts or when sortColumn/sortOrder changes
    fetchData();
  }, [sortColumn, sortOrder]);


  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/main/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Response:', data);

      // Reload data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleSort = (column: string) => {
    if (column != sortColumn) {
      setSortOrder(defaultOrders[column]);
    }
    else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
    setSortColumn(column);
  };



  const renderHeader = () => {
    return (
      <tr>
        <th onClick={() => handleSort('id')} className="header-cell">ID</th>
        <th onClick={() => handleSort('dateInserted')} className="header-cell">Date Inserted</th>
        <th onClick={() => handleSort('name')} className="header-cell">Name</th>
        <th onClick={() => handleSort('pax')} className="header-cell">Pax</th>
        <th onClick={() => handleSort('room')} className="header-cell">Room</th>
        <th onClick={() => handleSort('vehicle')} className="header-cell">Vehicle</th>
        <th onClick={() => handleSort('pets')} className="header-cell">Pets</th>
        <th onClick={() => handleSort('videoke')} className="header-cell">Videoke</th>
        <th onClick={() => handleSort('partial_payment')} className="header-cell">Partial Payment</th>
        <th onClick={() => handleSort('full_payment')} className="header-cell">Full Payment</th>
        <th onClick={() => handleSort('balance')} className="header-cell">Balance</th>
        <th onClick={() => handleSort('paid')} className="header-cell">Fully Paid</th>
        <th onClick={() => handleSort('checkIn')} className="header-cell">Check In</th>
        <th onClick={() => handleSort('checkOut')} className="header-cell">Check Out</th>
        <th onClick={() => handleSort('user')} className="header-cell">User</th>
      </tr>
    );
  };



  const renderRows = () => {
    return data.map((item, index) => (
      <tr
        key={item.id}
        onClick={() => handleExpand(item)}
        className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}
      >
        <td style={{ whiteSpace: 'nowrap' }}>{item.id}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.dateInserted}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.name}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.pax}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.room}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.vehicle}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.pets ? 'Yes' : 'No'}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.videoke ? 'Yes' : 'No'}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.partial_payment}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.full_payment}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.balance}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.paid ? 'Yes' : 'No'}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.checkIn}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.checkOut}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.user}</td>
      </tr>
    ));
  };



  return (
    <div>
      {user ? 'Hi ' + user : 'You are not logged in'}
      <h1>Main List</h1>
      <Table responsive striped bordered hover>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      {/* Modal for expanded view */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render details of the selected item here */}
          {selectedItem && (
            <>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Date Inserted:</strong> {selectedItem.dateInserted}</p>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Pax:</strong> {selectedItem.pax}</p>
              <p><strong>Room:</strong> {selectedItem.room}</p>
              <p><strong>Vehicle:</strong> {selectedItem.vehicle}</p>
              <p><strong>Pets:</strong> {selectedItem.pets ? 'Yes' : 'No'}</p>
              <p><strong>Videoke:</strong> {selectedItem.videoke ? 'Yes' : 'No'}</p>
              <p><strong>Partial Payment:</strong> {selectedItem.partial_payment}</p>
              <p><strong>Full Payment:</strong> {selectedItem.full_payment}</p>
              <p><strong>Balance:</strong> {selectedItem.balance}</p>
              <p><strong>Fully Paid:</strong> {selectedItem.paid ? 'Yes' : 'No'}</p>
              <p><strong>Check In:</strong> {selectedItem.checkIn}</p>
              <p><strong>Check Out:</strong> {selectedItem.checkOut}</p>
              <p><strong>User:</strong> {selectedItem.user}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleEdit(selectedItem?.id ?? 0)}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(selectedItem?.id ?? 0)}>Delete</Button>

          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;