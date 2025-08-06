import React,{ useState, useCallback, useRef } from 'react';
import Visualizer from './components/Visualizer.tsx';
import { generateRandomArray } from './utils/generateRandomArray.ts';

const App: React.FC = () => {
  const [array, setArray] = useState<number[] | null>(null)
  const [flag, setFlag] = useState<number>(0)
  const [visualizers, setVisualizers] = useState<number[]>([0, 1]); // visualizer id 목록
  const [arrayLength, setArrayLength] = useState<number>(50);
  let nextId = useRef(2); // 새 visualizer id를 위한 ref

  const resetAllArray = () => {
    const newArray = generateRandomArray(arrayLength, 10);
    setArray(newArray);
    setFlag(1);
  };

  const startAll = () => {
    setFlag(2);
  };
  
  const pauseAll = () => {
    setFlag(3);
  }

  const createNewVisualizer = () => {
    setVisualizers(prev => [...prev, nextId.current++]);
  };

  const deleteVisualizer = () => {
    setVisualizers(prev => (prev.length > 1 ? prev.slice(0, -1) : prev)); // 최소 1개 유지
  };

  
  const handleFlag = useCallback((v: number) => {
    setFlag(v);
  },[])

  return (
    <div className="container">
      <h1>정렬 알고리즘 시각화</h1>
      <div className="global-btns">
        <button onClick={resetAllArray}>Reset All array</button>
        <button onClick={startAll} >start All</button>
        <button onClick={pauseAll} >pause All</button>
        <button onClick={createNewVisualizer}>+</button>
        <button onClick={deleteVisualizer}>-</button>
        <input type="number" min="0" max="500" value={arrayLength} onChange = {(e) => setArrayLength(Number(e.target.value))} style={{width:'60px'}} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        justifyContent: 'center',
      }}>
        {visualizers.map(id => (
          <Visualizer key={id} sharedArray={array} flag={flag} handleFlag={handleFlag} />
        ))}
      </div>
    </div>
  );
};

export default App;