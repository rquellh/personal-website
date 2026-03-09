import { render, renderHook, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { WindowManagerProvider } from '../components/Desktop/WindowManager';
import type { WindowState } from '../components/Desktop/types';
import type { ReactElement, ReactNode } from 'react';

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={original}>
      <WindowManagerProvider>{children}</WindowManagerProvider>
    </ThemeProvider>
  );
}

function ThemeOnly({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={original}>{children}</ThemeProvider>;
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export function renderHookWithProviders<T>(hook: () => T) {
  return renderHook(hook, { wrapper: AllProviders });
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: ThemeOnly, ...options });
}

export function createMockWindowManager() {
  return {
    windows: [] as WindowState[],
    openWindow: vi.fn(),
    closeWindow: vi.fn(),
    minimizeWindow: vi.fn(),
    maximizeWindow: vi.fn(),
    restoreWindow: vi.fn(),
    focusWindow: vi.fn(),
    updateWindowPosition: vi.fn(),
    updateWindowSize: vi.fn(),
  };
}

export function createWindowState(overrides: Partial<WindowState> = {}): WindowState {
  return {
    id: 'test-window',
    title: 'Test Window',
    icon: 'test-icon.png',
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    minSize: { width: 200, height: 150 },
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    ...overrides,
  };
}

export { render, userEvent };
export { screen, within, waitFor, act, fireEvent } from '@testing-library/react';
