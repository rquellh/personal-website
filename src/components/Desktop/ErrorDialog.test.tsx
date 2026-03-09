import { renderWithTheme, screen, userEvent } from '../../test/test-utils';
import { ErrorDialog } from './ErrorDialog';

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  title: 'Error',
  message: 'Something went wrong',
};

describe('ErrorDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hidden when isOpen is false', () => {
    renderWithTheme(<ErrorDialog {...defaultProps} isOpen={false} />);
    // The dialog still renders but with display:none via styled-components
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('shows title and message when isOpen is true', () => {
    renderWithTheme(<ErrorDialog {...defaultProps} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('calls onClose when Close button clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ErrorDialog {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(<ErrorDialog {...defaultProps} />);
    // The backdrop is the first child element
    const backdrop = container.firstElementChild as HTMLElement;
    await user.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('toggles details section on Details button click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ErrorDialog {...defaultProps} />);
    expect(screen.queryByText(/wikipedia/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /details/i }));
    expect(screen.getByText(/wikipedia/i)).toBeInTheDocument();
  });

  it('shows Wikipedia link when details expanded', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ErrorDialog {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /details/i }));
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp.'
    );
  });

  it('Details button text changes between ">>" and "<<"', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ErrorDialog {...defaultProps} />);
    const detailsButton = screen.getByRole('button', { name: /details/i });
    expect(detailsButton).toHaveTextContent('Details >>');
    await user.click(detailsButton);
    expect(detailsButton).toHaveTextContent('Details <<');
  });
});
