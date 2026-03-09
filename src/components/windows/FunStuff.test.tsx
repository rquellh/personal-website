import { renderWithProviders, screen, userEvent } from '../../test/test-utils';
import { FunStuff } from './FunStuff';
import { useWindowManager } from '../Desktop/WindowManager';

function TestHarness() {
  const { windows } = useWindowManager();
  return (
    <>
      <FunStuff />
      <div data-testid="open-windows">
        {windows.map((w) => (
          <span key={w.id}>{w.id}</span>
        ))}
      </div>
    </>
  );
}

describe('FunStuff', () => {
  it('renders video file list', () => {
    renderWithProviders(<TestHarness />);
    expect(screen.getByText('Buddy Holly - Weezer')).toBeInTheDocument();
    expect(screen.getByText('Good Times - Edie Brickell')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('shows address bar with path', () => {
    renderWithProviders(<TestHarness />);
    expect(screen.getByText(/C:\\Fun Stuff/)).toBeInTheDocument();
  });

  it('double-clicking a file opens a video window', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestHarness />);
    const row = screen.getByText('Buddy Holly - Weezer').closest('div[class]')!;
    await user.dblClick(row);
    const openWindows = screen.getByTestId('open-windows');
    expect(openWindows).toHaveTextContent('video-buddy-holly');
  });
});
