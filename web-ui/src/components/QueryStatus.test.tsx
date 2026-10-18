import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { EmptyCatalog, MissingContent, QueryStatus } from './QueryStatus';

const ready = {
  status: 'ready' as const,
  data: null,
  error: null,
  retry: vi.fn(),
  source: 'sanity' as const,
};

describe('content states', () => {
  it('shows an error instead of an empty catalog', async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(
      <QueryStatus query={{ ...ready, status: 'error', error: new Error('down'), retry }}>
        <p>Catalog</p>
      </QueryStatus>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(/could not load/i);
    expect(screen.queryByText('Catalog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it('shows an empty catalog only after a successful query', () => {
    render(
      <QueryStatus query={ready}>
        <EmptyCatalog message="No tours are published yet." />
      </QueryStatus>,
    );
    expect(screen.getByText('No tours are published yet.')).toBeInTheDocument();
  });

  it('links a missing detail back to its listing', () => {
    render(
      <MemoryRouter>
        <MissingContent title="We could not find that tour" to="/tours" action="All tours" />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', { name: 'We could not find that tour' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All tours' })).toHaveAttribute('href', '/tours');
  });
});
