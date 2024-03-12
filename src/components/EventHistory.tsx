import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events', {
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

      setData(result.data || []);
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

  const renderHeader = () => {
    return (
      <tr>
        <th>Event ID</th>
        <th>Created At</th>
        <th>Record ID</th>
        <th>Event Type</th>
        <th>User</th>
        <th>Summary</th>
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
        <td>{item.id}</td>
        <td>{item.created_at}</td>
        <td>{item.record_id}</td>
        <td>{item.type}</td>
        <td>{item.user}</td>
        <td>{item.summary && item.summary.length > 40 ? `${item.summary.substring(0, 40)}...` : item.summary}</td>


      </tr>
    ));
  };

  return (
    <div>
      <h1>Event History</h1>
      <Table responsive bordered hover>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p><strong>Event ID:</strong> {selectedItem.id}</p>
              <p><strong>Created At:</strong> {selectedItem.created_at}</p>
              <p><strong>Record ID:</strong> {selectedItem.record_id}</p>
              <p><strong>Event Type:</strong> {selectedItem.type}</p>
              <p><strong>User:</strong> {selectedItem.user}</p>
              <p><strong>Summary:</strong> <pre>{selectedItem.summary}</pre></p>
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
