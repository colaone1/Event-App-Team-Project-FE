import { render, screen, fireEvent } from '@testing-library/react';
import CreateAd from '../app/create/page';

describe('CreateAd form validation', () => {
  it('shows error messages when required fields are empty', () => {
    render(<CreateAd />);
    fireEvent.click(screen.getByText(/Create Ad/i));
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
  });
}); 