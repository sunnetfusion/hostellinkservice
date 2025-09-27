
import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders the navbar', () => {
    render(<Navbar />);
    const logo = screen.getByText('HostelLink');
    expect(logo).toBeInTheDocument();
  });
});
