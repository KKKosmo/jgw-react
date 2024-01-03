// src/components/ReportsComponent.tsx

import React, { useState, useEffect } from 'react';

const ReportsComponent: React.FC = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports Component</h2>
      <ul>
        {reports.map((report: any) => (
          <li key={report.id}>{report.dateInserted}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsComponent;
