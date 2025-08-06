import React from 'react';
import Visualizer from './components/Visualizer.tsx';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>정렬 알고리즘 시각화</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
        <Visualizer />
        <Visualizer />
      </div>
    </div>
  );
};

export default App;
