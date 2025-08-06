import React, {useEffect} from 'react';
import { SortGenerator } from '../algorithms/types.ts';
import { bubbleSort } from '../algorithms/bubbleSort.ts';
import { insertionSort } from '../algorithms/insertionSort.ts';
import { mergeSort } from '../algorithms/mergeSort.ts';
import { quickSort } from '../algorithms/quickSort.ts';
import { selectionSort } from '../algorithms/selectionSort.ts';

interface ControlsProps {
    onStart: (algorithm: SortGenerator) => void;
    onReset: () => void;
    onPause: () => void;
    setArrayLength: () => {};
    isPaused: boolean;
    disabled: boolean;
    compareCount: number | null;
    flag: number;
    arrayLength: number;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onReset, 
    onPause, isPaused, disabled, compareCount, flag, arrayLength, setArrayLength }) => {
    const [selected, setSelected] = React.useState<string>('bubble');
    
    const algoMap: Record<string, SortGenerator> = {
        bubble: bubbleSort,
        insertion: insertionSort,
        merge: mergeSort,
        quick: quickSort,
        selection: selectionSort,
    };

    const handleStart = () => {
        onStart(algoMap[selected]);
    };

    useEffect(() => {
			const run = async () => {
        if (flag === 2) {
					console.log("전체실행")
          await onStart(algoMap[selected]);
        }
			}
			run();
    }, [flag]);
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    }


    return (
        <div>
            <div className="controls">
                <select onChange={handleSelectChange} value={selected} disabled={disabled}>
                    <option value="bubble">버블 정렬(Bubble Sort)</option>
                    <option value="insertion">삽입 정렬(Insertion Sort)</option>
                    <option value="merge">병합 정렬(Merge Sort)</option>
                    <option value="quick">퀵 정렬(Quick Sort)</option>
                    <option value="selection">선택 정렬(Selection Sort)</option>
                </select>
                <button onClick={onReset}>
                    Reset
                </button>
                <button onClick={handleStart} disabled={disabled}>start</button>
                <button onClick={onPause} disabled={!disabled}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <input type="number" min="0" max="500" value={arrayLength} onChange = {(e) => setArrayLength(Number(e.target.value))} style={{width:'60px'}} />
            </div>
            <div className="compareCount">
                {compareCount !== null ? `비교 횟수(Comparisons): ${compareCount}` : 'Comparisons: 0'}
            </div>
        </div>
    );
};

export default Controls;