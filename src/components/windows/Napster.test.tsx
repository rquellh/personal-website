import { renderWithTheme, screen, userEvent } from '../../test/test-utils';
import Napster from './Napster';

describe('Napster', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with search tab active by default', () => {
    renderWithTheme(<Napster />);
    expect(screen.getByText('Artist:')).toBeInTheDocument();
    expect(screen.getByText('Find It!')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    renderWithTheme(<Napster />);
    await user.click(screen.getByText('Transfer'));
    expect(screen.getByText(/Concurrent Downloads/)).toBeInTheDocument();
  });

  it('shows placeholder for unimplemented tabs', async () => {
    renderWithTheme(<Napster />);
    await user.click(screen.getByText('Chat'));
    expect(
      screen.getByText('Search and Transfer work. What more do you want?')
    ).toBeInTheDocument();
  });

  it('filters results by artist', async () => {
    renderWithTheme(<Napster />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Metallica');
    await user.click(screen.getByText('Find It!'));
    expect(screen.getByText(/Returned \d+ results/)).toBeInTheDocument();
  });

  it('filters results by song title', async () => {
    renderWithTheme(<Napster />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[1], 'Enter Sandman');
    await user.click(screen.getByText('Find It!'));
    expect(screen.getByText('Returned 1 results')).toBeInTheDocument();
  });

  it('respects max results limit', async () => {
    renderWithTheme(<Napster />);
    const inputs = screen.getAllByRole('textbox');
    await user.clear(inputs[2]);
    await user.type(inputs[2], '5');
    await user.click(screen.getByText('Find It!'));
    expect(screen.getByText('Returned 5 results')).toBeInTheDocument();
  });

  it('clears fields on Clear Fields click', async () => {
    renderWithTheme(<Napster />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Metallica');
    await user.type(inputs[1], 'Sandman');
    await user.click(screen.getByText('Clear Fields'));
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
  });

  it('double-click adds to downloads', async () => {
    renderWithTheme(<Napster />);
    const row = screen.getByText('Metallica - Enter Sandman.mp3').closest('tr')!;
    await user.dblClick(row);
    expect(screen.getByText(/Concurrent Downloads/)).toBeInTheDocument();
  });

  it('renders progress bars for transfers', async () => {
    renderWithTheme(<Napster />);
    await user.click(screen.getByText('Transfer'));
    expect(screen.getAllByText(/%/).length).toBeGreaterThan(0);
  });
});
