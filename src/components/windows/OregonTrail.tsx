import { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #000;
`;

const IframeContainer = styled.div`
  flex: 1;
  display: flex;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const BottomBar = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  padding: 4px 8px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  span {
    color: #000;
  }

  kbd {
    background: #dfdfdf;
    border: 1px solid;
    border-color: #fff #808080 #808080 #fff;
    padding: 1px 4px;
    font-family: 'ms_sans_serif', sans-serif;
    font-size: 11px;
  }
`;

export function OregonTrail() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleContainerClick = () => {
    iframeRef.current?.focus();
  };

  return (
    <Container>
      <IframeContainer onClick={handleContainerClick}>
        <iframe
          ref={iframeRef}
          src="https://archive.org/embed/msdos_Oregon_Trail_Deluxe_The_1992"
          title="The Oregon Trail"
          allow="autoplay"
        />
      </IframeContainer>
      <BottomBar>
        <span>Click the game to begin. Use keyboard and mouse to play.</span>
        <span>Press <kbd>esc</kbd> key to move mouse outside of the window.</span>
      </BottomBar>
    </Container>
  );
}
