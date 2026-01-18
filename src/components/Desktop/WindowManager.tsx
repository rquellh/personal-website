import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { WindowState } from './types';

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}

interface WindowManagerProviderProps {
  children: ReactNode;
}

export function WindowManagerProvider({ children }: WindowManagerProviderProps) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openWindow = useCallback((window: Omit<WindowState, 'zIndex'>) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === window.id);
      if (existing) {
        // Window already open, just focus it
        return prev.map((w) =>
          w.id === window.id
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        );
      }
      return [...prev, { ...window, zIndex: maxZIndex + 1 }];
    });
    setMaxZIndex((prev) => prev + 1);
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: true } : w))
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w
      )
    );
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
  }, [maxZIndex]);

  const focusWindow = useCallback((id: string) => {
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
  }, [maxZIndex]);

  const updateWindowPosition = useCallback(
    (id: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  const updateWindowSize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, size } : w))
      );
    },
    []
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
