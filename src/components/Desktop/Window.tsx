import { type ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import {
  Window as Win95Window,
  WindowHeader,
  WindowContent,
  Button,
} from 'react95';
import styled from 'styled-components';
import { useWindowManager } from './WindowManager';
import type { WindowState } from './types';

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleBarControls = styled.div`
  display: flex;
  gap: 2px;
`;

const TitleBarButton = styled(Button)`
  padding: 0;
  width: 20px;
  height: 20px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

const TitleText = styled.span`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledWindowContent = styled(WindowContent)`
  overflow: auto;
  height: calc(100% - 33px);
`;

interface WindowProps {
  windowState: WindowState;
  children: ReactNode;
}

export function Window({ windowState, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const { id, title, position, size, minSize, isMinimized, isMaximized, zIndex } = windowState;

  if (isMinimized) {
    return null;
  }

  const handleDragStop = (_e: unknown, data: { x: number; y: number }) => {
    updateWindowPosition(id, { x: data.x, y: data.y });
  };

  const handleResizeStop = (
    _e: unknown,
    _direction: unknown,
    ref: HTMLElement,
    _delta: unknown,
    position: { x: number; y: number }
  ) => {
    updateWindowSize(id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    updateWindowPosition(id, position);
  };

  const handleMaximizeClick = () => {
    if (isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  const maximizedStyle = isMaximized
    ? {
        position: { x: 0, y: 0 },
        size: { width: window.innerWidth, height: window.innerHeight - 40 },
      }
    : { position, size };

  return (
    <Rnd
      position={maximizedStyle.position}
      size={maximizedStyle.size}
      minWidth={minSize?.width ?? 200}
      minHeight={minSize?.height ?? 150}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={() => focusWindow(id)}
      dragHandleClassName="window-title-bar"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      style={{ zIndex }}
      bounds="parent"
    >
      <Win95Window style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <StyledWindowHeader className="window-title-bar">
          <TitleText>{title}</TitleText>
          <TitleBarControls>
            <TitleBarButton onClick={() => minimizeWindow(id)}>_</TitleBarButton>
            <TitleBarButton onClick={handleMaximizeClick}>
              {isMaximized ? '❐' : '□'}
            </TitleBarButton>
            <TitleBarButton onClick={() => closeWindow(id)}>×</TitleBarButton>
          </TitleBarControls>
        </StyledWindowHeader>
        <StyledWindowContent>{children}</StyledWindowContent>
      </Win95Window>
    </Rnd>
  );
}
