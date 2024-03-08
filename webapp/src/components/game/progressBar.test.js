import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

jest.useFakeTimers();

describe('ProgressBar', () => {
    it('should start with correct remaining time', () => {
        const { getByTestId } = render(<ProgressBar totalTime={10} />);
        expect(getByTestId('remaining-time').textContent).toBe('10');
    });

    it('should decrease remaining time over time', () => {
        const { getByTestId } = render(<ProgressBar totalTime={10} />);
        act(() => {
            jest.advanceTimersByTime(5000); // Avanzamos 5 seg
        });
        expect(getByTestId('remaining-time').textContent).toBe('5');
    });

    it('should stop at 0 remaining time', () => {
        const { getByTestId } = render(<ProgressBar totalTime={3} />);
        act(() => {
            jest.advanceTimersByTime(3000); // Avanzamos 3 seg
        });
        expect(getByTestId('remaining-time').textContent).toBe('0');
    });
});