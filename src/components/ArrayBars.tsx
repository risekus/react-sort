import React from 'react';

interface ArrayBarsProps {
  array: number[];
}

const ArrayBars: React.FC<ArrayBarsProps> = ({ array }) => {
  return (
    <div className="bar-container">
      {array.map((value, idx) => (
        <div
            key={idx}
            style={{ 
                height: `${value * 3}px`,
                backgroundColor: `hsl(${(value / array.length) * 180}, 80%, 50%)`
            }}
            className="bar"
        />
      ))}
    </div>
  );
};

export default ArrayBars;