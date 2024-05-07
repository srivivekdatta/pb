import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('handles sign in event', () => {
    const signInSpy = jest.fn();
    const { getByRole } = render(<App onSignIn={signInSpy} />);
    fireEvent.click(getByRole('button'));
    expect(signInSpy).toHaveBeenCalled();
  });

  it('handles sign up event', () => {
    const signUpSpy = jest.fn();
    const { getByRole } = render(<App onSignUp={signUpSpy} />);
    fireEvent.click(getByRole('button'));
    expect(signUpSpy).toHaveBeenCalled();
  });
});
