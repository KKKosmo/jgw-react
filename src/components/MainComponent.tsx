// src/components/MainsComponent.tsx

import React, { useState, useEffect } from 'react';

const MainsComponent: React.FC = () => {
  const [mains, setMains] = useState([]);

  useEffect(() => {
    const fetchMains = async () => {
      try {
        const response = await fetch('/api/mains');
        const data = await response.json();
        setMains(data);
      } catch (error) {
        console.error('Error fetching mains:', error);
      }
    };

    fetchMains();
  }, []);

  return (
    <div>
      <h2>Mains Component</h2>
      <ul>
        {mains.map((main: any) => (
          <li key={main.id}>{main.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainsComponent;
