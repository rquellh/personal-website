import { useState } from 'react';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { WindowManagerProvider, useWindowManager } from './WindowManager';
import { Window } from './Window';
import { TaskBar } from './TaskBar';
import { DesktopIcon } from './DesktopIcon';
import { ErrorDialog } from './ErrorDialog';
import { AboutMe } from '../windows/AboutMe';
import Napster from '../windows/Napster';
import { FunStuff } from '../windows/FunStuff';
import { VideoPlayer } from '../windows/VideoPlayer';
import { RollerCoasterTycoon } from '../windows/RollerCoasterTycoon';
import { Pinball } from '../windows/Pinball';
import { OregonTrail } from '../windows/OregonTrail';
import type { WindowState } from './types';
import userCardIcon from '../../assets/icons/user_card.png';
import ieIcon from '../../assets/icons/internet_explorer.webp';
const BuddyHollyVideo = () => <VideoPlayer videoId="kemivUKb4f4" title="Buddy Holly - Weezer" />;
const GoodTimesVideo = () => <VideoPlayer videoId="iqL1BLzn3qc" title="Good Times - Edie Brickell" />;
const WelcomeVideo = () => <VideoPlayer videoId="7ob7EEr3t8k" title="Welcome" />;

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
  'napster': Napster,
  'fun-stuff': FunStuff,
  'video-buddy-holly': BuddyHollyVideo,
  'video-good-times': GoodTimesVideo,
  'video-welcome': WelcomeVideo,
  'roller-coaster-tycoon': RollerCoasterTycoon,
  'pinball': Pinball,
  'oregon-trail': OregonTrail,
};

function DesktopContent() {
  const { windows, openWindow } = useWindowManager();
  const [showIEError, setShowIEError] = useState(false);

  const handleOpenAboutMe = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'about-me',
      title: 'About Me',
      icon: userCardIcon.src,
      position: { x: 100, y: 30 },
      size: { width: 500, height: 520 },
      minSize: { width: 350, height: 300 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
  };

  const handleOpenIE = () => {
    setShowIEError(true);
  };

  return (
    <DesktopContainer>
      <DesktopArea>
        <IconGrid>
          <DesktopIcon
            icon={userCardIcon.src}
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
      <TaskBar onOpenIE={handleOpenIE} />
      <ErrorDialog
        isOpen={showIEError}
        onClose={() => setShowIEError(false)}
        title="Setup"
        message="This program has performed an illegal operation and will be shut down.

If the problem persists, contact the program vendor."
      />
    </DesktopContainer>
  );
}

// Props used internally by react95 that shouldn't be forwarded to the DOM
const REACT95_PROPS = new Set([
  'active',
  'fixed',
  'position',
  'noPadding',
  'fullWidth',
  'primary',
  'square',
  'variant',
  'shadow',
]);

function shouldForwardProp(prop: string) {
  if (REACT95_PROPS.has(prop)) return false;
  return isPropValid(prop);
}

export function Desktop() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={original}>
        <GlobalStyles />
        <WindowManagerProvider>
          <DesktopContent />
        </WindowManagerProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
