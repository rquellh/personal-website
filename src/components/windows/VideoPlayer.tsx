import styled from 'styled-components';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

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

const StatusBar = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  padding: 2px 4px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
  display: flex;
  align-items: center;

  span {
    border: 1px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    padding: 1px 4px;
    flex: 1;
  }
`;

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <Container>
      <IframeContainer>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </IframeContainer>
      <StatusBar>
        <span>Now Playing: {title}</span>
      </StatusBar>
    </Container>
  );
}
