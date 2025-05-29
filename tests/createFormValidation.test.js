import { render, screen, fireEvent } from '@testing-library/react';
import CreateEvent from '../app/create/page';
import EventsPage from '../app/events/page';

describe('CreateEvent form validation', () => {
  it('shows error messages when required fields are empty', () => {
    render(<CreateEvent />);
    fireEvent.click(screen.getByText(/Create Event/i));
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
  });
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('../apiClient/apiClient', () => {
  return {
    ApiClient: jest.fn().mockImplementation(() => ({
      isLoggedIn: () => true,
      getEvents: () => Promise.resolve({ data: [
        { _id: '1', title: 'Event 1', description: 'Desc', location: 'Loc', date: '2024-06-01', time: '10:00', createdAt: new Date() },
        { _id: '2', title: 'Event 2', description: 'Desc', location: 'Loc', date: '2024-06-02', time: '11:00', createdAt: new Date() },
      ] })
    }))
  };
});

describe('EventsPage', () => {
  it('renders Delete button for each event', async () => {
    render(<EventsPage />);
    // Wait for the events to be rendered
    const deleteButtons = await screen.findAllByRole('button', { name: /delete event/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
}); 