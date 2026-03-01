import styled from 'styled-components';
import { useWindowManager } from '../Desktop/WindowManager';
import type { WindowState } from '../Desktop/types';
import folderIcon from '../../assets/icons/directory_closed_cool-0.png';
import videoIcon from '../../assets/icons/video_-2.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
`;

const MenuBar = styled.div`
  display: flex;
  background: #c0c0c0;
  padding: 2px;
  border-bottom: 1px solid #808080;
  gap: 2px;
`;

const MenuButton = styled.button`
  background: #c0c0c0;
  border: 1px solid transparent;
  padding: 3px 6px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    border: 1px outset;
    border-color: #ffffff #000000 #000000 #ffffff;
  }
`;

const AddressBar = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
  gap: 4px;
`;

const AddressLabel = styled.span`
  font-size: 11px;
  white-space: nowrap;
`;

const AddressField = styled.div`
  flex: 1;
  background: #fff;
  border: 2px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 1px 4px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AddressIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const FileList = styled.div`
  flex: 1;
  background: #fff;
  border: 2px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  margin: 4px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const ColumnHeaders = styled.div`
  display: flex;
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
  position: sticky;
  top: 0;
`;

const ColumnHeader = styled.div<{ $width?: string }>`
  padding: 2px 8px;
  font-weight: bold;
  font-size: 11px;
  border: 1px outset;
  border-color: #ffffff #000000 #000000 #ffffff;
  background: #c0c0c0;
  width: ${props => props.$width || 'auto'};
  flex: ${props => props.$width ? 'none' : '1'};
  cursor: default;
`;

const FileRow = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 8px;
  cursor: default;

  &:hover {
    background: #000080;
    color: #fff;
  }
`;

const FileIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileName = styled.div`
  flex: 1;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileType = styled.div`
  width: 100px;
  font-size: 11px;
  flex-shrink: 0;
`;

const FileSize = styled.div`
  width: 80px;
  font-size: 11px;
  flex-shrink: 0;
  text-align: right;
`;

const StatusBar = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #fff;
  padding: 2px 4px;
  font-size: 11px;
  display: flex;

  span {
    border: 1px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    padding: 1px 4px;
    flex: 1;
  }
`;

const VideoIconImg = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const videos = [
  { id: 'video-buddy-holly', name: 'Buddy Holly - Weezer', videoId: 'kemivUKb4f4', size: '15,234 KB' },
  { id: 'video-good-times', name: 'Good Times - Edie Brickell', videoId: 'iqL1BLzn3qc', size: '12,876 KB' },
  { id: 'video-welcome', name: 'Welcome', videoId: '7ob7EEr3t8k', size: '10,452 KB' },
];

export function FunStuff() {
  const { openWindow } = useWindowManager();

  const handleOpenVideo = (video: typeof videos[number]) => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: video.id,
      title: video.name,
      icon: videoIcon.src,
      position: { x: 180 + Math.random() * 40, y: 60 + Math.random() * 40 },
      size: { width: 640, height: 480 },
      minSize: { width: 320, height: 240 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
  };

  return (
    <Container>
      <MenuBar>
        <MenuButton>File</MenuButton>
        <MenuButton>Edit</MenuButton>
        <MenuButton>View</MenuButton>
        <MenuButton>Help</MenuButton>
      </MenuBar>
      <AddressBar>
        <AddressLabel>Address</AddressLabel>
        <AddressField>
          <AddressIcon src={folderIcon.src} alt="" />
          C:\Fun Stuff\
        </AddressField>
      </AddressBar>
      <FileList>
        <ColumnHeaders>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader $width="100px">Type</ColumnHeader>
          <ColumnHeader $width="80px">Size</ColumnHeader>
        </ColumnHeaders>
        {videos.map((video) => (
          <FileRow key={video.id} onDoubleClick={() => handleOpenVideo(video)}>
            <FileIcon><VideoIconImg src={videoIcon.src} alt="" /></FileIcon>
            <FileName>{video.name}</FileName>
            <FileType>Video Clip</FileType>
            <FileSize>{video.size}</FileSize>
          </FileRow>
        ))}
      </FileList>
      <StatusBar>
        <span>3 object(s)</span>
      </StatusBar>
    </Container>
  );
}
