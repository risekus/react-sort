import React from 'react';
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
    isPaused: boolean;
    disabled: boolean;
    compareCount: number | null;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onReset, onPause, isPaused, disabled, compareCount }) => {
    const [selected, setSelected] = React.useState<string>('bubble');
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    }

    const handleStart = () => {
        const algoMap: Record<string, SortGenerator> = {
            bubble: bubbleSort,
            insertion: insertionSort,
            merge: mergeSort,
            quick: quickSort,
            selection: selectionSort,
        };
        onStart(algoMap[selected]);
    };

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
            </div>
            <div className="compareCount">
                {compareCount !== null ? `비교 횟수(Comparisons): ${compareCount}` : 'Comparisons: 0'}
            </div>
        </div>
    );
};

export default Controls;
