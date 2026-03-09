import { renderWithProviders, screen, userEvent, act, fireEvent } from '../../test/test-utils';
import { TaskBar } from './TaskBar';
import { useWindowManager } from './WindowManager';

// Helper that opens windows and renders TaskBar
function TestWithWindows() {
  const { openWindow } = useWindowManager();
  return (
    <>
      <button
        onClick={() =>
          openWindow({
            id: 'test-win',
            title: 'Test Window',
            position: { x: 0, y: 0 },
            size: { width: 400, height: 300 },
            isMinimized: false,
            isMaximized: false,
          })
        }
      >
        Open Test Window
      </button>
      <TaskBar />
    </>
  );
}

describe('TaskBar', () => {
  it('renders Start button', () => {
    renderWithProviders(<TaskBar />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('toggles start menu on Start click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskBar />);
    expect(screen.queryByText('Programs')).not.toBeInTheDocument();
    await user.click(screen.getByText('Start'));
    expect(screen.getByText('Programs')).toBeInTheDocument();
    await user.click(screen.getByText('Start'));
    expect(screen.queryByText('Programs')).not.toBeInTheDocument();
  });

  it('closes start menu on outside click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskBar />);
    await user.click(screen.getByText('Start'));
    expect(screen.getByText('Programs')).toBeInTheDocument();
    await act(async () => {
      fireEvent.mouseDown(document.body);
    });
    expect(screen.queryByText('Programs')).not.toBeInTheDocument();
  });

  it('shows Programs submenu on hover', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskBar />);
    await user.click(screen.getByText('Start'));
    expect(screen.queryByText('Napster')).not.toBeInTheDocument();
    await user.hover(screen.getByText('Programs'));
    expect(screen.getByText('Napster')).toBeInTheDocument();
  });

  it('renders window buttons for open windows', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestWithWindows />);
    await user.click(screen.getByText('Open Test Window'));
    expect(screen.getByText('Test Window')).toBeInTheDocument();
  });

  it('renders clock', () => {
    renderWithProviders(<TaskBar />);
    const clock = screen.getByText(/\d{1,2}:\d{2}/);
    expect(clock).toBeInTheDocument();
  });

  it('calls onOpenIE from menu', async () => {
    const user = userEvent.setup();
    const onOpenIE = vi.fn();
    renderWithProviders(<TaskBar onOpenIE={onOpenIE} />);
    await user.click(screen.getByText('Start'));
    const programsItem = screen.getByText('Programs').closest('[class]')!;
    fireEvent.mouseEnter(programsItem);
    await user.click(screen.getByText('Internet Explorer'));
    expect(onOpenIE).toHaveBeenCalledTimes(1);
  });
});
