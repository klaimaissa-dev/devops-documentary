import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) })
);

test('renders navbar logo', () => {
  render(<App />);
  // getAllByText handles multiple matches — we just check at least one exists
  const matches = screen.getAllByText(/documentary/i);
  expect(matches.length).toBeGreaterThan(0);
});

test('shows intro page by default', () => {
  render(<App />);
  const matches = screen.getAllByText(/speed of/i);
  expect(matches.length).toBeGreaterThan(0);
});
