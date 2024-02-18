import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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

const ITEMS_PER_PAGE = 10;

const Home: React.FC<HomeProps> = ({ user }) => {
  const [data, setData] = useState<MainItem[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MainItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // State for total items
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [nameFilter, setNameFilter] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  




  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = event.target.value;

  // Extract month and year separately
  const [numericMonth, year] = selectedValue.split(' ');

  // Convert numeric month to month name
  const monthName = new Date(`${year}-${numericMonth}-01`).toLocaleDateString('en-US', {
    month: 'short', // Use 'short' for abbreviated month name (MMM)
  });

  console.log('Selected Month:', monthName);
  console.log('Selected Year:', year);

  // Automatically set start and end dates based on the selected month
  const selectedStartDate = new Date(`${year}-${numericMonth}-01`).toISOString().split('T')[0];
  const lastDayOfMonth = new Date(parseInt(year), parseInt(numericMonth, 10), 0).getDate();
  const selectedEndDate = new Date(`${year}-${numericMonth}-${lastDayOfMonth}`).toISOString().split('T')[0];

  // Update the state with the selected month
  setSelectedMonth(`${numericMonth} ${year}`);

  // Update the start and end dates
  setStartDate(selectedStartDate);
  setEndDate(selectedEndDate);

  // Other logic...
};






  const generateMonthOptions = () => {
    const options = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
  
    const startYear = 2023;
    const startMonth = 12;
  
    // Calculate the difference in months between the current date and December 2023
    const monthsDifference = (currentYear - startYear) * 12 + currentMonth - startMonth + 1;
  
    for (let i = 0; i < monthsDifference + 3; i++) {
      const monthValue = (startMonth + i) % 12 || 12; // Ensure values are between 1 and 12
      const year = startYear + Math.floor((startMonth + i - 1) / 12);
  
      const optionValue = `${monthValue} ${year}`;
  
      options.push(
        <option key={`${year}-${monthValue}`} value={optionValue}>
          {new Date(year, monthValue - 1, 1).toLocaleDateString('en-US', {
            month: 'short', // Use 'short' for abbreviated month name (MMM)
            year: 'numeric',
          })}
        </option>
      );
    }
  
    return options;
  };
  
  


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
  useEffect(() => {
    fetchData();
  }, [sortColumn, sortOrder, currentPage]);


  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/main?sort=${sortColumn}&order=${sortOrder}&page=${currentPage}&perPage=${ITEMS_PER_PAGE}&name=${nameFilter}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setData(result.data || []);
      setTotalItems(result.total || 0);
      setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };


  
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



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  const handleFilter = () => {
    // Trigger fetching data with the updated name filter
    fetchData();
  };
  const renderSortIcon = (column: string) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    } else {
      return <FontAwesomeIcon icon={faSort} />;
    }
  };

  const renderHeader = () => {
    return (
      <tr>
        <th onClick={() => handleSort('id')} className="header-cell">
          ID {renderSortIcon('id')}
        </th>
        <th onClick={() => handleSort('dateInserted')} className="header-cell">
          Date Inserted {renderSortIcon('dateInserted')}
        </th>
        <th onClick={() => handleSort('name')} className="header-cell">
          Name {renderSortIcon('name')}
        </th>
        <th onClick={() => handleSort('pax')} className="header-cell">
          Pax {renderSortIcon('pax')}
        </th>
        <th onClick={() => handleSort('room')} className="header-cell">
          Room {renderSortIcon('room')}
        </th>
        <th onClick={() => handleSort('vehicle')} className="header-cell">
          Vehicle {renderSortIcon('vehicle')}
        </th>
        <th onClick={() => handleSort('pets')} className="header-cell">
          Pets {renderSortIcon('pets')}
        </th>
        <th onClick={() => handleSort('videoke')} className="header-cell">
          Videoke {renderSortIcon('videoke')}
        </th>
        <th onClick={() => handleSort('partial_payment')} className="header-cell">
          Partial Payment {renderSortIcon('partial_payment')}
        </th>
        <th onClick={() => handleSort('full_payment')} className="header-cell">
          Full Payment {renderSortIcon('full_payment')}
        </th>
        <th onClick={() => handleSort('balance')} className="header-cell">
          Balance {renderSortIcon('balance')}
        </th>
        <th onClick={() => handleSort('paid')} className="header-cell">
          Fully Paid {renderSortIcon('paid')}
        </th>
        <th onClick={() => handleSort('checkIn')} className="header-cell">
          Check In {renderSortIcon('checkIn')}
        </th>
        <th onClick={() => handleSort('checkOut')} className="header-cell">
          Check Out {renderSortIcon('checkOut')}
        </th>
        <th onClick={() => handleSort('user')} className="header-cell">
          User {renderSortIcon('user')}
        </th>
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
        <td className="table-cell">{item.id}</td>
        <td className="table-cell">{item.dateInserted}</td>
        <td className="table-cell">{item.name}</td>
        <td className="table-cell">{item.pax}</td>
        <td className="table-cell">{item.room}</td>
        <td className="table-cell">{item.vehicle}</td>
        <td className="table-cell">{item.pets ? 'Yes' : 'No'}</td>
        <td className="table-cell">{item.videoke ? 'Yes' : 'No'}</td>
        <td className="table-cell">{item.partial_payment}</td>
        <td className="table-cell">{item.full_payment}</td>
        <td className="table-cell">{item.balance}</td>
        <td className="table-cell">{item.paid ? 'Yes' : 'No'}</td>
        <td className="table-cell">{item.checkIn}</td>
        <td className="table-cell">{item.checkOut}</td>
        <td className="table-cell">{item.user}</td>
      </tr>
    ));
  };


  return (
    <div>
      {user ? 'Hi ' + user : 'You are not logged in'}
      <h1>Main List</h1>








      {/* Add the filter box */}
      <div className="filter-box">
        <h2>Filter Check-in Date</h2>
        <div className="filter-container">
          <label htmlFor="nameFilter">Name:</label>
          <input
            type="text"
            id="nameFilter"
            value={nameFilter}
            onChange={handleNameChange}
          />

          {/* Add the month selector dropdown */}
          <label htmlFor="monthSelector">Select Month:</label>
          <select
            id="monthSelector"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="" disabled>Select Month</option>
            {generateMonthOptions()}
          </select>

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />

          <button onClick={handleFilter}>Apply Filters</button>
        </div>
      </div>





















      <Table responsive bordered hover>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />

        <div className="pagination-info">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </Pagination>



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