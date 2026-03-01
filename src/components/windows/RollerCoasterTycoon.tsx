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

  a {
    color: #000080;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #ff0000;
    }
  }
`;

export function RollerCoasterTycoon() {
  return (
    <Container>
      <IframeContainer>
        <iframe
          src="https://www.youtube.com/embed/uizLqffPdSM?autoplay=0&rel=0"
          title="RollerCoaster Tycoon"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </IframeContainer>
      <BottomBar>
        Play now at&nbsp;
        <a href="https://openrct2.io/" target="_blank" rel="noopener noreferrer">
          openrct2.io
        </a>
      </BottomBar>
    </Container>
  );
}
