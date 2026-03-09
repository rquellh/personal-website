import { screen, renderWithTheme, userEvent, createWindowState, createMockWindowManager } from '../../test/test-utils';
import { Window } from './Window';

// Mock react-rnd to just render children
vi.mock('react-rnd', () => ({
  Rnd: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock useWindowManager
const mockManager = createMockWindowManager();
vi.mock('./WindowManager', () => ({
  useWindowManager: () => mockManager,
}));

function renderWindow(overrides = {}, children: React.ReactNode = <div>Window Content</div>) {
  return renderWithTheme(<Window windowState={createWindowState(overrides)}>{children}</Window>);
}

describe('Window', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders window title', () => {
    renderWindow({ title: 'My Window' });
    expect(screen.getByText('My Window')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWindow({}, <div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('returns null when isMinimized is true', () => {
    const { container } = renderWindow({ isMinimized: true });
    expect(container.innerHTML).toBe('');
  });

  it('calls closeWindow on close button click', async () => {
    const user = userEvent.setup();
    renderWindow({ id: 'win1' });
    const buttons = screen.getAllByRole('button');
    const closeBtn = buttons[buttons.length - 1];
    await user.click(closeBtn);
    expect(mockManager.closeWindow).toHaveBeenCalledWith('win1');
  });

  it('calls minimizeWindow on minimize button click', async () => {
    const user = userEvent.setup();
    renderWindow({ id: 'win1' });
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(mockManager.minimizeWindow).toHaveBeenCalledWith('win1');
  });

  it('calls maximizeWindow on max button when not maximized', async () => {
    const user = userEvent.setup();
    renderWindow({ id: 'win1', isMaximized: false });
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(mockManager.maximizeWindow).toHaveBeenCalledWith('win1');
  });

  it('calls restoreWindow on max button when already maximized', async () => {
    const user = userEvent.setup();
    renderWindow({ id: 'win1', isMaximized: true });
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(mockManager.restoreWindow).toHaveBeenCalledWith('win1');
  });
});
