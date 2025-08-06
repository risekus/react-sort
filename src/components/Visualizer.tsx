import React, { useEffect, useState } from 'react';
import ArrayBars from './ArrayBars.tsx';
import { generateRandomArray } from '../utils/generateRandomArray.ts';
import { SortGenerator } from '../algorithms/types.ts';
import Controls from './Controls.tsx';

interface VisualizerProps {
  handleFlag: () => {};
  sharedArray: number[];
  flag: number;
}

const Visualizer: React.FC<VisualizerProps> = ({handleFlag, sharedArray, flag}) => {
  const [array, setArray] = useState<number[]>([]);
  // const [original, setOriginal] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  const isPauseRef = React.useRef(isPaused);
  const isCancelled = React.useRef(false);
	
  useEffect(() => {
    const run = async () => {
      if (flag === 1 && sharedArray) {
        await resetArray();
        setArray(sharedArray);
        handleFlag(0);
      } else if (flag === 3) {
        pauseSort();
        handleFlag(0);
      }
    };
    run();
  }, [flag]);
	
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = generateRandomArray(50, 10, 100);
    if (sorting) {
      isCancelled.current = true;
      setSorting(false);
      setIsPaused(false);
      isPauseRef.current = false;
    }
    setArray(newArray);
  };


  const startSort = async (algorithm: SortGenerator) => {
    isCancelled.current = false;
    setSorting(true);
    const generator = algorithm([...array]);
    
    for (let step of generator) {
      if (isCancelled.current) {
        break;
      };
      while (isPauseRef.current) {
        if (isCancelled.current) break;
        await new Promise((r) => setTimeout(r, 100));
      }
      setArray(step.array);
      setCompareCount(step.compareCount);
      await new Promise((r) => setTimeout(r, 20));
    }
    
    setSorting(false);
  };

  const pauseSort = () => {
    isPauseRef.current = !isPaused;
    setIsPaused(isPauseRef.current);
  }

  return (
    <div className="visualizer">
      <Controls 
      onStart={startSort} 
      onReset={resetArray} 
      onPause={pauseSort} 
      isPaused={isPaused} 
      disabled={sorting} 
      compareCount={compareCount}
      flag={flag}
      />
      <ArrayBars array={array} />
    </div>
  );
};

export default Visualizer;