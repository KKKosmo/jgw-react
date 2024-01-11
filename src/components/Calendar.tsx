import React from 'react';

interface CalendarData {
  dayNumber: number;
  data: string;
  availability: boolean;
}

interface CalendarProps {
  calendarData: CalendarData[];
}

const Calendar: React.FC<CalendarProps> = ({ calendarData }) => {
  // Function to chunk the array into rows
  const chunkArray = (array: Array<CalendarData>, size: number) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );

  // Chunk the calendarData array into rows of 7 columns
  const calendarRows = chunkArray(calendarData, 7);

  return (
    <div className="container">
      <div className="row days-row">
        <div className="col">Sun</div>
        <div className="col">Mon</div>
        <div className="col">Tue</div>
        <div className="col">Wed</div>
        <div className="col">Thu</div>
        <div className="col">Fri</div>
        <div className="col">Sat</div>
      </div>

      {calendarRows.map((row, rowIndex) => (
        <div key={rowIndex} className="row" style={{ marginBottom: '10px' }}>
          {row.map((item, columnIndex) => (
            <div
              key={columnIndex}
              className={`col calendar-cell ${item.availability ? 'available' : 'unavailable'}`}
            >
              <div className="day-number-container">
                {item.dayNumber}
              </div>
              <div className="data">
                {item.data.split(',').map((word, wordIndex) => (
                  <div key={wordIndex} className="data-row">
                    {word.trim()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
