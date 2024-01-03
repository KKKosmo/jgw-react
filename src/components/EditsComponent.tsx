// src/components/EditsComponent.tsx

import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

interface Edit {
  id: number;
  summary: string;
  user: string;
  edit_timestamp: string;
  record_id: string;
}

const EditsComponent: React.FC = () => {
  const [edits, setEdits] = useState<Edit[]>([]);

  useEffect(() => {
    const fetchEdits = async () => {
      // console.log("key = " + process.env.REACT_APP_PUSHER_APP_KEY);
      // console.log("cluster = " + process.env.REACT_APP_PUSHER_APP_CLUSTER);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/edits');
        const data = await response.json();
        setEdits(data);
      } catch (error) {
        console.error('Error fetching edits:', error);
      }
    };

    fetchEdits();

    
    // Pusher.logToConsole = true;

    var pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || "", {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('edits');
    channel.bind('App\\Events\\EditCreated', (event: { edit: Edit }) => {
        console.log('EditCreated event received:', event);
        setEdits((prevEdits) => [...prevEdits, event.edit]);

      });

    return () => {
      pusher.unsubscribe('edits');
    };
  }, []);

  return (
    <div>
      <h2>Edits Component</h2>
      {edits.length > 0 ? (
        <ul>
          {edits.map((edit) => (
            <li key={edit.id}>
            <strong>Edit ID:</strong> {edit.id}<br />
              <strong>Record_ID:</strong> {edit.record_id}<br />
              <strong>Summary:</strong> {edit.summary}<br />
              <strong>User:</strong> {edit.user}<br />
              <strong>Created At:</strong> {edit.edit_timestamp}<br /><br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No edits available.</p>
      )}
    </div>
  );
};

export default EditsComponent;
