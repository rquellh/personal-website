import { act, renderHook } from '@testing-library/react';
import { renderHookWithProviders } from '../../test/test-utils';
import { useWindowManager } from './WindowManager';

const baseWindow = {
  id: 'test',
  title: 'Test Window',
  icon: 'test.png',
  position: { x: 100, y: 100 },
  size: { width: 400, height: 300 },
  isMinimized: false,
  isMaximized: false,
};

describe('WindowManager', () => {
  it('starts with empty windows array', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    expect(result.current.windows).toEqual([]);
  });

  it('openWindow adds a window with zIndex', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    expect(result.current.windows).toHaveLength(1);
    expect(result.current.windows[0]).toMatchObject({
      id: 'test',
      title: 'Test Window',
    });
    expect(result.current.windows[0].zIndex).toBeGreaterThan(0);
  });

  it('openWindow with duplicate id focuses existing window', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() =>
      result.current.openWindow({ ...baseWindow, id: 'other', title: 'Other' })
    );
    const zBefore = result.current.windows.find((w) => w.id === 'test')!.zIndex;
    act(() => result.current.openWindow(baseWindow));
    expect(result.current.windows).toHaveLength(2);
    const zAfter = result.current.windows.find((w) => w.id === 'test')!.zIndex;
    expect(zAfter).toBeGreaterThan(zBefore);
  });

  it('openWindow with duplicate id un-minimizes a minimized window', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.minimizeWindow('test'));
    expect(result.current.windows[0].isMinimized).toBe(true);
    act(() => result.current.openWindow(baseWindow));
    expect(result.current.windows[0].isMinimized).toBe(false);
  });

  it('closeWindow removes the window', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.closeWindow('test'));
    expect(result.current.windows).toHaveLength(0);
  });

  it('minimizeWindow sets isMinimized to true', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.minimizeWindow('test'));
    expect(result.current.windows[0].isMinimized).toBe(true);
  });

  it('maximizeWindow sets isMaximized to true', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.maximizeWindow('test'));
    expect(result.current.windows[0].isMaximized).toBe(true);
  });

  it('restoreWindow clears isMinimized and isMaximized', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.minimizeWindow('test'));
    act(() => result.current.maximizeWindow('test'));
    act(() => result.current.restoreWindow('test'));
    expect(result.current.windows[0].isMinimized).toBe(false);
    expect(result.current.windows[0].isMaximized).toBe(false);
  });

  it('focusWindow updates zIndex to highest', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() =>
      result.current.openWindow({ ...baseWindow, id: 'second', title: 'Second' })
    );
    const zBefore = result.current.windows.find((w) => w.id === 'test')!.zIndex;
    act(() => result.current.focusWindow('test'));
    const zAfter = result.current.windows.find((w) => w.id === 'test')!.zIndex;
    expect(zAfter).toBeGreaterThan(zBefore);
  });

  it('updateWindowPosition updates position', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.updateWindowPosition('test', { x: 200, y: 300 }));
    expect(result.current.windows[0].position).toEqual({ x: 200, y: 300 });
  });

  it('updateWindowSize updates size', () => {
    const { result } = renderHookWithProviders(() => useWindowManager());
    act(() => result.current.openWindow(baseWindow));
    act(() => result.current.updateWindowSize('test', { width: 800, height: 600 }));
    expect(result.current.windows[0].size).toEqual({ width: 800, height: 600 });
  });

  it('useWindowManager throws outside provider', () => {
    expect(() => {
      renderHook(() => useWindowManager());
    }).toThrow('useWindowManager must be used within a WindowManagerProvider');
  });
});
