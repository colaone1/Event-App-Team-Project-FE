import { render, screen, fireEvent } from '@testing-library/react';
import CreateEvent from '../app/create/page';

describe('CreateEvent form validation', () => {
  it('shows error messages when required fields are empty', () => {
    render(<CreateEvent />);
    fireEvent.click(screen.getByText(/Create Event/i));
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
  });
}); 