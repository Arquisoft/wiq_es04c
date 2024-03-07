import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i)).toBeInTheDocument();
  });
});
