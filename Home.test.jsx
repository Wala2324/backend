import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Pages/Home';
// import debounce from 'lodash/debounce';

jest.mock('lodash/debounce', (fn) => fn);

test('debounce category search input', () => {
  render(<Home />);
  
  const searchInput = screen.getByPlaceholderText('Search categories...');
  
  fireEvent.change(searchInput, { target: { value: 'cha' } });
  expect(searchInput.value).toBe('cha');
  
  fireEvent.change(searchInput, { target: { value: 'chair' } });
  expect(searchInput.value).toBe('chair');
});
