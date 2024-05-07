import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Make your life happier by staying simple ❤️ !!!')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const fireEventSpy = jest.fn();
    const { getByRole } = render(<Footer onClick={fireEventSpy} />);
    fireEvent.click(getByRole('button'));
    expect(fireEventSpy).toHaveBeenCalled();
  });
});
