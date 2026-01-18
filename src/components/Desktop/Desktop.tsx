import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { WindowManagerProvider, useWindowManager } from './WindowManager';
import { Window } from './Window';
import { TaskBar } from './TaskBar';
import { DesktopIcon } from './DesktopIcon';
import { AboutMe } from '../windows/AboutMe';
import type { WindowState } from './types';

const GlobalStyles = createGlobalStyle`
  ${styleReset}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'ms_sans_serif', sans-serif;
    overflow: hidden;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('https://unpkg.com/react95@4.0.0/dist/fonts/ms_sans_serif.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('https://unpkg.com/react95@4.0.0/dist/fonts/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #008080;
  position: relative;
  overflow: hidden;
`;

const DesktopArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  padding: 16px;
`;

const IconGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 16px;
  left: 16px;
`;

const WindowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

// Window content registry
const windowContent: Record<string, React.ComponentType> = {
  'about-me': AboutMe,
};

function DesktopContent() {
  const { windows, openWindow } = useWindowManager();

  const handleOpenAboutMe = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'about-me',
      title: 'About Me',
      icon: '👤',
      position: { x: 100, y: 50 },
      size: { width: 450, height: 400 },
      minSize: { width: 300, height: 250 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
  };

  return (
    <DesktopContainer>
      <DesktopArea>
        <IconGrid>
          <DesktopIcon
            icon="/icons/user_card.png"
            label="About Me"
            onDoubleClick={handleOpenAboutMe}
          />
        </IconGrid>
        <WindowContainer>
          {windows.map((windowState) => {
            const ContentComponent = windowContent[windowState.id];
            if (!ContentComponent) return null;
            return (
              <Window key={windowState.id} windowState={windowState}>
                <ContentComponent />
              </Window>
            );
          })}
        </WindowContainer>
      </DesktopArea>
      <TaskBar />
    </DesktopContainer>
  );
}

export function Desktop() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <WindowManagerProvider>
        <DesktopContent />
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
