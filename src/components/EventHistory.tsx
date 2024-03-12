import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


interface EventItem {
  id: number;
  record_id: number;
  type: string | null;
  summary: string | null;
  user: string;
  created_at: string;
}

interface EventHistoryProps {
  // Add any props if needed
}

const ITEMS_PER_PAGE = 10;

const EventHistory: React.FC<EventHistoryProps> = () => {
  const [data, setData] = useState<EventItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [sortColumn, sortOrder, currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/events?sort=${sortColumn}&order=${sortOrder}&page=${currentPage}&perPage=${ITEMS_PER_PAGE}`,
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
      console.error('Error fetching event data:', error.message);
    }
  };

  const handleExpand = (item: EventItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSort = (column: string) => {
    if (column !== sortColumn) {
      setSortOrder('asc');
    } else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
    setSortColumn(column);
    setCurrentPage(1); // Reset to the first page when sorting
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ));
  };

  const renderHeader = () => (
    <tr>
      <th onClick={() => handleSort('id')}>
        Event ID {renderSortIcon('id')}
      </th>
      <th onClick={() => handleSort('created_at')}>
        Created At {renderSortIcon('created_at')}
      </th>
      <th onClick={() => handleSort('record_id')}>
        Record ID {renderSortIcon('record_id')}
      </th>
      <th onClick={() => handleSort('type')}>
        Event Type {renderSortIcon('type')}
      </th>
      <th onClick={() => handleSort('user')}>
        User {renderSortIcon('user')}
      </th>
      <th>Summary</th>
    </tr>
  );

  const renderSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    } else {
      return <FontAwesomeIcon icon={faSort} />;
    }
  };


  const renderRows = () =>
    data.map((item, index) => (
      <tr
        key={item.id}
        onClick={() => handleExpand(item)}
        className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}
      >
        <td>{item.id}</td>
        <td>{item.created_at}</td>
        <td>{item.record_id}</td>
        <td>{item.type}</td>
        <td>{item.user}</td>
        <td>{item.summary && item.summary.length > 40 ? `${item.summary.substring(0, 40)}...` : item.summary}</td>
      </tr>
    ));

  return (
    <div>
      <h1>Event History</h1>
      <Table responsive bordered hover>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Pagination.Prev>

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Pagination.Next>

        
        {renderPageButtons()}
        <div className="pagination-info">
          Page {currentPage} of {totalPages} | Total of {totalItems} Records
        </div>



      </Pagination>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p>
                <strong>Event ID:</strong> {selectedItem.id}
              </p>
              <p>
                <strong>Created At:</strong> {selectedItem.created_at}
              </p>
              <p>
                <strong>Record ID:</strong> {selectedItem.record_id}
              </p>
              <p>
                <strong>Event Type:</strong> {selectedItem.type}
              </p>
              <p>
                <strong>User:</strong> {selectedItem.user}
              </p>
              <p>
                <strong>Summary:</strong> <pre>{selectedItem.summary}</pre>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventHistory;