import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) })
);

test('renders navbar logo', () => {
  render(<App />);
  expect(screen.getByText(/documentary/i)).toBeInTheDocument();
});

test('shows intro page by default', () => {
  render(<App />);
  expect(screen.getByText(/speed of/i)).toBeInTheDocument();
});
