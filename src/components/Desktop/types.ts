export interface WindowState {
  id: string;
  title: string;
  icon?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface DesktopIconConfig {
  id: string;
  title: string;
  icon: string;
  windowId: string;
}
