import { renderWithTheme, screen, userEvent, fireEvent } from '../../test/test-utils';
import { DesktopIcon } from './DesktopIcon';

const defaultProps = {
  icon: 'test-icon.png',
  label: 'My Computer',
  onDoubleClick: vi.fn(),
};

describe('DesktopIcon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders label text', () => {
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    expect(screen.getByText('My Computer')).toBeInTheDocument();
  });

  it('renders icon image', () => {
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    // alt="" gives it role="presentation", query by tag instead
    const img = document.querySelector('img')!;
    expect(img).toHaveAttribute('src', 'test-icon.png');
  });

  it('calls onDoubleClick on double-click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    await user.dblClick(screen.getByText('My Computer'));
    expect(defaultProps.onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDoubleClick on Enter key', () => {
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    const container = screen.getByText('My Computer').closest('[tabindex]')!;
    fireEvent.keyDown(container, { key: 'Enter' });
    expect(defaultProps.onDoubleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire on single click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    await user.click(screen.getByText('My Computer'));
    expect(defaultProps.onDoubleClick).not.toHaveBeenCalled();
  });

  it('has tabIndex=0', () => {
    renderWithTheme(<DesktopIcon {...defaultProps} />);
    const container = screen.getByText('My Computer').closest('[tabindex]')!;
    expect(container).toHaveAttribute('tabindex', '0');
  });
});
