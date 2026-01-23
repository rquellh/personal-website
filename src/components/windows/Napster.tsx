import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react95';

// Types
interface Song {
  id: string;
  filename: string;
  filesize: string;
  bitrate: string;
  frequency: string;
  length: string;
  user: string;
  lineSpeed: string;
  ping: string;
  status: 'green' | 'yellow' | 'red';
}

interface Download {
  id: string;
  filename: string;
  filesize: string;
  user: string;
  status: string;
  speed: string;
  progress: number;
  rate: string;
  timeLeft: string;
}

interface Upload {
  id: string;
  filename: string;
  filesize: string;
  user: string;
  status: string;
  speed: string;
  progress: number;
  rate: string;
  timeLeft: string;
}

type TabType = 'chat' | 'library' | 'search' | 'hotlist' | 'transfer';

// Sample songs data - Mixed artists including Metallica
const ROLLING_STONES_SONGS: Song[] = [
  { id: '1', filename: 'Metallica - Enter Sandman.mp3', filesize: '5,123,456', bitrate: '128', frequency: '44100', length: '5:31', user: 'metalfan99', lineSpeed: 'T1', ping: '145', status: 'green' },
  { id: '2', filename: 'Metallica - Master of Puppets.mp3', filesize: '8,456,789', bitrate: '128', frequency: '44100', length: '8:35', user: 'thrash_lord', lineSpeed: 'Cable', ping: '98', status: 'green' },
  { id: '3', filename: 'Metallica - One.mp3', filesize: '7,234,567', bitrate: '128', frequency: '44100', length: '7:26', user: 'jammaster', lineSpeed: 'DSL', ping: '176', status: 'yellow' },
  { id: '4', filename: 'Metallica - Nothing Else Matters.mp3', filesize: '6,543,210', bitrate: '128', frequency: '44100', length: '6:28', user: 'rockstar88', lineSpeed: 'T1', ping: '132', status: 'green' },
  { id: '5', filename: 'Metallica - Fade to Black.mp3', filesize: '6,789,123', bitrate: '128', frequency: '44100', length: '6:57', user: 'fade2blk', lineSpeed: 'Cable', ping: '89', status: 'green' },
  { id: '6', filename: 'Metallica - The Unforgiven.mp3', filesize: '6,234,890', bitrate: '128', frequency: '44100', length: '6:27', user: 'unforgiven1', lineSpeed: 'DSL', ping: '201', status: 'yellow' },
  { id: '7', filename: 'Metallica - Seek and Destroy.mp3', filesize: '6,890,456', bitrate: '128', frequency: '44100', length: '6:55', user: 'thrashking', lineSpeed: 'T1', ping: '118', status: 'green' },
  { id: '8', filename: 'Metallica - For Whom the Bell Tolls.mp3', filesize: '5,678,912', bitrate: '128', frequency: '44100', length: '5:09', user: 'bellringer', lineSpeed: '56k Modem', ping: '423', status: 'red' },
  { id: '9', filename: 'Metallica - Creeping Death.mp3', filesize: '6,456,789', bitrate: '128', frequency: '44100', length: '6:36', user: 'creeper666', lineSpeed: 'Cable', ping: '112', status: 'green' },
  { id: '10', filename: 'Metallica - Battery.mp3', filesize: '5,234,678', bitrate: '128', frequency: '44100', length: '5:13', user: 'energized', lineSpeed: 'DSL', ping: '188', status: 'yellow' },
  { id: '11', filename: 'Metallica - Sad But True.mp3', filesize: '5,456,789', bitrate: '128', frequency: '44100', length: '5:24', user: 'sadtruths', lineSpeed: 'T1', ping: '156', status: 'green' },
  { id: '12', filename: 'Metallica - Wherever I May Roam.mp3', filesize: '6,789,234', bitrate: '128', frequency: '44100', length: '6:44', user: 'wanderer99', lineSpeed: '56k Modem', ping: '389', status: 'red' },
  { id: '13', filename: 'Metallica - Welcome Home (Sanitarium).mp3', filesize: '6,456,123', bitrate: '128', frequency: '44100', length: '6:27', user: 'sanitarium', lineSpeed: 'Cable', ping: '134', status: 'green' },
  { id: '14', filename: 'Metallica - The Memory Remains.mp3', filesize: '4,567,890', bitrate: '128', frequency: '44100', length: '4:39', user: 'memory_lane', lineSpeed: 'DSL', ping: '167', status: 'yellow' },
  { id: '15', filename: 'Metallica - Whiskey in the Jar.mp3', filesize: '5,012,345', bitrate: '128', frequency: '44100', length: '5:04', user: 'whiskeyjack', lineSpeed: 'Cable', ping: '94', status: 'green' },
  { id: '16', filename: 'Metallica - Until It Sleeps.mp3', filesize: '4,890,123', bitrate: '128', frequency: '44100', length: '4:29', user: 'sleepless', lineSpeed: 'T1', ping: '142', status: 'green' },
  { id: '17', filename: 'Metallica - Hero of the Day.mp3', filesize: '5,234,567', bitrate: '128', frequency: '44100', length: '4:21', user: 'hero1996', lineSpeed: 'DSL', ping: '215', status: 'yellow' },
  { id: '18', filename: 'Metallica - King Nothing.mp3', filesize: '6,123,456', bitrate: '128', frequency: '44100', length: '5:28', user: 'kingnada', lineSpeed: 'Cable', ping: '103', status: 'green' },
  { id: '19', filename: 'Metallica - Fuel.mp3', filesize: '5,678,901', bitrate: '128', frequency: '44100', length: '4:29', user: 'speedfreak', lineSpeed: 'T1', ping: '129', status: 'green' },
  { id: '20', filename: 'Metallica - The Unforgiven II.mp3', filesize: '6,789,012', bitrate: '128', frequency: '44100', length: '6:36', user: 'unforgiven2', lineSpeed: 'Cable', ping: '88', status: 'green' },
  { id: '21', filename: 'Metallica - Better Than You.mp3', filesize: '5,456,890', bitrate: '128', frequency: '44100', length: '5:21', user: 'betterfan', lineSpeed: 'DSL', ping: '198', status: 'yellow' },
  { id: '22', filename: 'Metallica - The Day That Never Comes.mp3', filesize: '7,890,123', bitrate: '128', frequency: '44100', length: '7:56', user: 'neverday', lineSpeed: 'T1', ping: '151', status: 'green' },
  { id: '23', filename: 'Metallica - All Nightmare Long.mp3', filesize: '7,456,789', bitrate: '128', frequency: '44100', length: '7:57', user: 'nightmare88', lineSpeed: 'Cable', ping: '96', status: 'green' },
  { id: '24', filename: 'Metallica - Cyanide.mp3', filesize: '6,234,567', bitrate: '128', frequency: '44100', length: '6:39', user: 'cyanideX', lineSpeed: 'DSL', ping: '203', status: 'yellow' },
  { id: '25', filename: 'Metallica - My Apocalypse.mp3', filesize: '5,890,123', bitrate: '128', frequency: '44100', length: '5:01', user: 'apocalypse', lineSpeed: 'T1', ping: '138', status: 'green' },
  { id: '26', filename: 'Metallica - Hardwired.mp3', filesize: '3,456,789', bitrate: '320', frequency: '44100', length: '3:09', user: 'hardwired16', lineSpeed: 'Cable', ping: '79', status: 'green' },
  { id: '27', filename: 'Metallica - Atlas, Rise!.mp3', filesize: '6,890,234', bitrate: '128', frequency: '44100', length: '6:28', user: 'atlas2016', lineSpeed: 'T1', ping: '144', status: 'green' },
  { id: '28', filename: 'Metallica - Moth Into Flame.mp3', filesize: '6,123,890', bitrate: '128', frequency: '44100', length: '5:50', user: 'mothflame', lineSpeed: 'DSL', ping: '189', status: 'yellow' },
  { id: '29', filename: 'Metallica - Spit Out the Bone.mp3', filesize: '7,567,890', bitrate: '128', frequency: '44100', length: '7:09', user: 'bonespitter', lineSpeed: 'Cable', ping: '102', status: 'green' },
  { id: '30', filename: 'Metallica - Blackened (Live).mp3', filesize: '7,234,890', bitrate: '128', frequency: '44100', length: '6:40', user: 'livemetal99', lineSpeed: '56k Modem', ping: '456', status: 'red' },
  { id: '31', filename: 'Metallica - The Four Horsemen.mp3', filesize: '7,123,456', bitrate: '128', frequency: '44100', length: '7:13', user: 'horsemen4', lineSpeed: 'T1', ping: '163', status: 'green' },
  { id: '32', filename: 'Metallica - Trapped Under Ice.mp3', filesize: '4,567,234', bitrate: '128', frequency: '44100', length: '4:04', user: 'icetrap', lineSpeed: 'Cable', ping: '91', status: 'green' },
  { id: '33', filename: 'Metallica - Fight Fire With Fire.mp3', filesize: '5,234,789', bitrate: '128', frequency: '44100', length: '4:45', user: 'firefight', lineSpeed: 'DSL', ping: '224', status: 'yellow' },
  { id: '34', filename: 'Metallica - Ride the Lightning.mp3', filesize: '6,678,901', bitrate: '128', frequency: '44100', length: '6:36', user: 'lightning84', lineSpeed: 'T1', ping: '148', status: 'green' },
  { id: '35', filename: 'Metallica - Damage Inc.mp3', filesize: '5,789,456', bitrate: '128', frequency: '44100', length: '5:29', user: 'damageinc', lineSpeed: 'Cable', ping: '85', status: 'green' },
];

const USERNAMES = ['muffin41', 'amws', 'LUVY4U', 'rocknroll65', 'vegasx2', 'chrisNJ', 'fabio kurt fli', 'EdmondF', 'Yoda0134x', 'abcde49', 'TIL1RED4x', 'yoda0134x'];
const LINE_SPEEDS = ['T1', 'Cable', '56k Modem', 'DSL', 'T3 or Grea...', 'Unknown'];

// Styled Components
const NapsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
`;

const Toolbar = styled.div`
  display: flex;
  background: #c0c0c0;
  padding: 2px;
  border-bottom: 1px solid #808080;
  gap: 2px;
  align-items: center;
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

  &:active {
    border: 1px inset;
    border-color: #000000 #ffffff #ffffff #000000;
  }
`;

const TabBar = styled.div`
  display: flex;
  background: #c0c0c0;
  padding: 2px;
  border-bottom: 1px solid #808080;
  gap: 2px;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#ffffff' : '#c0c0c0'};
  border: 2px solid;
  border-color: ${props => props.$active ? '#808080 #ffffff #ffffff #808080' : '#ffffff #808080 #808080 #ffffff'};
  padding: 4px 12px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: ${props => props.$active ? '#ffffff' : '#dfdfdf'};
  }

  &:active {
    border-color: #808080 #ffffff #ffffff #808080;
    background: #ffffff;
  }
`;

const TabContent = styled.div`
  flex: 1;
  background: #ffffff;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const StatusBar = styled.div`
  background: #c0c0c0;
  border-top: 1px solid #ffffff;
  padding: 2px 4px;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
`;

const SearchFields = styled.div`
  padding: 8px;
  background: #c0c0c0;
  border-bottom: 2px groove #808080;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
`;

const Label = styled.label`
  min-width: 60px;
  font-size: 11px;
`;

const Input = styled.input`
  border: 2px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 2px 4px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 11px;
  flex: 1;
  max-width: 200px;
`;

const StyledButton = styled(Button)`
  font-size: 11px;
  padding: 3px 12px;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: #ffffff;
  border: 2px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  margin: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
`;

const Th = styled.th`
  background: #c0c0c0;
  border: 1px outset;
  border-color: #ffffff #000000 #000000 #ffffff;
  padding: 2px 4px;
  text-align: left;
  font-weight: bold;
  position: sticky;
  top: 0;
  cursor: default;
`;

const Td = styled.td`
  padding: 2px 4px;
`;

const FilenameTd = styled(Td)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusIndicator = styled.div<{ $status: 'green' | 'yellow' | 'red' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$status) {
      case 'green': return '#00aa00';
      case 'yellow': return '#cccc00';
      case 'red': return '#cc0000';
    }
  }};
  border: 1px solid #000000;
  flex-shrink: 0;
`;

const Tr = styled.tr`
  &:hover {
    background: #000080;
    color: #ffffff;
  }

  cursor: default;
`;

const ButtonRow = styled.div`
  padding: 4px 8px;
  display: flex;
  gap: 8px;
  background: #c0c0c0;
`;

const TransferContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  padding: 4px;
`;

const TransferSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const SectionLabel = styled.div`
  font-weight: bold;
  padding: 4px;
  background: #c0c0c0;
`;

const ProgressBarCell = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  position: relative;
`;

const ProgressBarBg = styled.div`
  width: 80px;
  height: 14px;
  background: #c0c0c0;
  border: 1px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  position: relative;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $progress: number; $isUpload?: boolean }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: ${props => {
    if (props.$isUpload) {
      return 'linear-gradient(to bottom, #ffff00 0%, #cccc00 50%, #ffff00 100%)';
    }
    return 'linear-gradient(to bottom, #0000ff 0%, #0000cc 50%, #0000ff 100%)';
  }};
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: bold;
  color: #000000;
  text-shadow: 1px 1px 0 #ffffff;
`;

const TransferStatusBar = styled.div`
  background: #808080;
  padding: 4px;
  border: 2px groove #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 4px;
`;

const Footer = styled.div`
  background: #c0c0c0;
  padding: 4px;
  font-size: 10px;
  display: flex;
  gap: 8px;
`;

const FooterBox = styled.div`
  flex: 1;
  background: #c0c0c0;
  border: 2px inset;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 2px 4px;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #c0c0c0;
  color: #000000;
  font-size: 14px;
`;

// Main Component
const Napster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [searchArtist, setSearchArtist] = useState('');
  const [searchSong, setSearchSong] = useState('');
  const [maxResults, setMaxResults] = useState('100');
  const [searchResults, setSearchResults] = useState<Song[]>(ROLLING_STONES_SONGS);
  const [downloads, setDownloads] = useState<Download[]>([
    { id: 'd1', filename: 'Metallica - Master of Puppets.mp3', filesize: '8,456,789', user: 'thrash_lord', status: 'Downloading...', speed: 'Cable', progress: 12.5, rate: '7.33 k/s', timeLeft: '00:19' },
    { id: 'd2', filename: 'Metallica - Enter Sandman.mp3', filesize: '5,123,456', user: 'metalfan99', status: 'Downloading...', speed: 'T1', progress: 45.2, rate: '5.60 k/s', timeLeft: '00:08' },
    { id: 'd3', filename: 'Metallica - Nothing Else Matters.mp3', filesize: '6,543,210', user: 'rockstar88', status: 'Downloading...', speed: 'Cable', progress: 8.9, rate: '4.14 k/s', timeLeft: '00:24' },
    { id: 'd4', filename: 'Metallica - One.mp3', filesize: '7,234,567', user: 'jammaster', status: 'Downloading...', speed: 'DSL', progress: 67.3, rate: '7.91 k/s', timeLeft: '00:04' },
    { id: 'd5', filename: 'Metallica - Fade to Black.mp3', filesize: '6,789,123', user: 'fade2blk', status: 'Downloading...', speed: 'Cable', progress: 23.8, rate: '5.83 k/s', timeLeft: '00:14' },
    { id: 'd6', filename: 'Metallica - The Unforgiven.mp3', filesize: '6,234,890', user: 'unforgiven1', status: 'Downloading...', speed: 'DSL', progress: 34.1, rate: '4.80 k/s', timeLeft: '00:11' },
  ]);
  const [uploads, setUploads] = useState<Upload[]>([
    { id: 'u1', filename: 'Metallica - Seek and Destroy (Live).mp3', filesize: '7,725,888 at 3,709,456', user: 'cybersonic', status: 'Uploading', speed: '56k', progress: 7.8, rate: '1.56 k/s', timeLeft: '00:10' },
    { id: 'u2', filename: 'Metallica - Whiskey in the Jar.mp3', filesize: '5,789,403', user: 'EdmondF', status: 'File Complete!', speed: '56k', progress: 100, rate: '', timeLeft: '00:00' },
    { id: 'u3', filename: 'Metallica - Sanitarium (Welcome Home).mp3', filesize: '6,406,976 at 2,756,736', user: 'oldschool', status: 'Uploading', speed: '56k', progress: 51.1, rate: '1.49 k/s', timeLeft: '00:15:30' },
    { id: 'u4', filename: 'Metallica - Harvester of Sorrow.mp3', filesize: '5,921,141', user: 'fearfan', status: 'File Complete!', speed: '', progress: 100, rate: '', timeLeft: '00:00' },
    { id: 'u5', filename: 'Metallica - Master of Puppets (Live).mp3', filesize: '9,796,251', user: 'livemetal', status: 'File Complete!', speed: '', progress: 100, rate: '', timeLeft: '00:00' },
    { id: 'u6', filename: 'Metallica - Blackened.mp3', filesize: '6,675,840 at 1,179,264', user: 'TYLER354x', status: 'Uploading', speed: '14.4', progress: 28.0, rate: '7.33 k/s', timeLeft: '00:02:31' },
    { id: 'u7', filename: 'Metallica - The Four Horsemen.mp3', filesize: '7,209,600', user: 'folkfan88', status: 'Waiting', speed: '', progress: 0, rate: '', timeLeft: '--:--' },
  ]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  useEffect(() => {
    // Update downloads and uploads progress
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(download => {
        if (download.status === 'Queued') {
          return {
            ...download,
            status: 'Downloading...',
          };
        } else if (download.status === 'Downloading...' && download.progress < 95) {
          const increment = Math.random() * 0.5;
          const newProgress = Math.min(95, download.progress + increment);
          const filesizeNum = parseInt(download.filesize.replace(/,/g, ''));
          const remaining = filesizeNum * (100 - newProgress) / 100;
          const speed = parseFloat(download.rate);
          const timeLeftSec = remaining / (speed * 1024);

          return {
            ...download,
            progress: newProgress,
            timeLeft: formatTime(timeLeftSec),
          };
        }
        return download;
      }));

      setUploads(prev => prev.map(upload => {
        if (upload.status === 'Uploading' && upload.progress < 95) {
          const increment = Math.random() * 0.3;
          const newProgress = Math.min(95, upload.progress + increment);
          const filesizeStr = upload.filesize.split(' at ')[0];
          const filesizeNum = parseInt(filesizeStr.replace(/,/g, ''));
          const remaining = filesizeNum * (100 - newProgress) / 100;
          const speed = parseFloat(upload.rate);
          const timeLeftSec = remaining / (speed * 1024);

          return {
            ...upload,
            progress: newProgress,
            timeLeft: formatTime(timeLeftSec),
          };
        }
        return upload;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSearch = () => {
    let results = ROLLING_STONES_SONGS;

    if (searchArtist || searchSong) {
      results = results.filter(song => {
        const matchArtist = !searchArtist || song.filename.toLowerCase().includes(searchArtist.toLowerCase());
        const matchSong = !searchSong || song.filename.toLowerCase().includes(searchSong.toLowerCase());
        return matchArtist && matchSong;
      });
    }

    const limit = parseInt(maxResults) || 100;
    setSearchResults(results.slice(0, limit));
  };

  const handleClearFields = () => {
    setSearchArtist('');
    setSearchSong('');
    setMaxResults('100');
    setSearchResults(ROLLING_STONES_SONGS);
  };

  const handleAddToDownloads = (song: Song) => {
    // Check if already downloading
    if (downloads.find(d => d.id === song.id)) {
      return;
    }

    const lineSpeed = LINE_SPEEDS[Math.floor(Math.random() * LINE_SPEEDS.length)];
    const username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
    const speed = lineSpeed.includes('T1') || lineSpeed.includes('T3') || lineSpeed.includes('Cable') || lineSpeed.includes('DSL')
      ? (Math.random() * 100 + 50).toFixed(1)
      : (Math.random() * 8 + 2).toFixed(1);

    const download: Download = {
      id: song.id,
      filename: song.filename,
      filesize: song.filesize,
      user: username,
      status: 'Queued',
      speed: lineSpeed,
      progress: 0,
      rate: speed + ' k/s',
      timeLeft: '--:--',
    };

    setDownloads(prev => [...prev, download]);
  };

  const handleRowDoubleClick = (song: Song) => {
    handleAddToDownloads(song);
    setActiveTab('transfer');
  };

  const handleGetSelected = () => {
    if (selectedSong) {
      const song = searchResults.find(s => s.id === selectedSong);
      if (song) {
        handleAddToDownloads(song);
        setActiveTab('transfer');
      }
    }
  };

  const activeDownloads = downloads.filter(d => d.status === 'Downloading...' || d.status === 'Queued').length;

  return (
    <NapsterContainer>
      <Toolbar>
        <MenuButton>File</MenuButton>
        <MenuButton>Actions</MenuButton>
        <MenuButton>Help</MenuButton>
      </Toolbar>

      <TabBar>
        <Tab $active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>Chat</Tab>
        <Tab $active={activeTab === 'library'} onClick={() => setActiveTab('library')}>Library</Tab>
        <Tab $active={activeTab === 'search'} onClick={() => setActiveTab('search')}>Search</Tab>
        <Tab $active={activeTab === 'hotlist'} onClick={() => setActiveTab('hotlist')}>Hot List</Tab>
        <Tab $active={activeTab === 'transfer'} onClick={() => setActiveTab('transfer')}>Transfer</Tab>
      </TabBar>

      <TabContent>
        {activeTab === 'search' && (
          <SearchContainer>
            <SearchFields>
              <FieldRow>
                <Label>Artist:</Label>
                <Input
                  value={searchArtist}
                  onChange={(e) => setSearchArtist(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Label>Song Title:</Label>
                <Input
                  value={searchSong}
                  onChange={(e) => setSearchSong(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Label>Max Results:</Label>
                <Input
                  value={maxResults}
                  onChange={(e) => setMaxResults(e.target.value)}
                  style={{ maxWidth: '60px' }}
                />
              </FieldRow>
              <FieldRow>
                <StyledButton onClick={handleClearFields}>Clear Fields</StyledButton>
                <StyledButton onClick={handleSearch}>Find It!</StyledButton>
              </FieldRow>
            </SearchFields>

            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Filename</Th>
                    <Th>Filesize</Th>
                    <Th>Bitrate</Th>
                    <Th>Freq</Th>
                    <Th>Length</Th>
                    <Th>User</Th>
                    <Th>Line Speed</Th>
                    <Th>Ping</Th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map(song => (
                    <Tr
                      key={song.id}
                      onClick={() => setSelectedSong(song.id)}
                      onDoubleClick={() => handleRowDoubleClick(song)}
                      style={{ background: selectedSong === song.id ? '#000080' : 'transparent', color: selectedSong === song.id ? '#ffffff' : '#000000' }}
                    >
                      <FilenameTd>
                        <StatusIndicator $status={song.status} />
                        {song.filename}
                      </FilenameTd>
                      <Td>{song.filesize}</Td>
                      <Td>{song.bitrate}</Td>
                      <Td>{song.frequency}</Td>
                      <Td>{song.length}</Td>
                      <Td>{song.user}</Td>
                      <Td>{song.lineSpeed}</Td>
                      <Td>{song.ping}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>

            <ButtonRow>
              <StyledButton onClick={handleGetSelected}>Get Selected Song(s)</StyledButton>
              <StyledButton>Add Selected User to Hot List</StyledButton>
            </ButtonRow>

            <StatusBar>
              <span>Returned {searchResults.length} results</span>
            </StatusBar>
          </SearchContainer>
        )}

        {activeTab === 'transfer' && (
          <TransferContainer>
            <TransferSection>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th>Filename</Th>
                      <Th>File Size</Th>
                      <Th>User</Th>
                      <Th>Status</Th>
                      <Th>Speed</Th>
                      <Th>Progress</Th>
                      <Th>Rate</Th>
                      <Th>Time Left</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloads.map(download => (
                      <tr key={download.id}>
                        <Td>{download.filename}</Td>
                        <Td>{download.filesize}</Td>
                        <Td>{download.user}</Td>
                        <Td>{download.status}</Td>
                        <Td>{download.speed}</Td>
                        <Td>
                          <ProgressBarCell>
                            <ProgressBarBg>
                              <ProgressBarFill $progress={download.progress} />
                              <ProgressText>{download.progress.toFixed(1)} %</ProgressText>
                            </ProgressBarBg>
                          </ProgressBarCell>
                        </Td>
                        <Td>{download.rate}</Td>
                        <Td>{download.timeLeft}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </TransferSection>

            <TransferSection>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th>Filename</Th>
                      <Th>File Size</Th>
                      <Th>User</Th>
                      <Th>Status</Th>
                      <Th>Speed</Th>
                      <Th>Progress</Th>
                      <Th>Rate</Th>
                      <Th>Time Left</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploads.map(upload => (
                      <tr key={upload.id}>
                        <Td>{upload.filename}</Td>
                        <Td>{upload.filesize}</Td>
                        <Td>{upload.user}</Td>
                        <Td>{upload.status}</Td>
                        <Td>{upload.speed}</Td>
                        <Td>
                          <ProgressBarCell>
                            <ProgressBarBg>
                              <ProgressBarFill $progress={upload.progress} $isUpload={true} />
                              <ProgressText>{upload.progress.toFixed(1)} %</ProgressText>
                            </ProgressBarBg>
                          </ProgressBarCell>
                        </Td>
                        <Td>{upload.rate}</Td>
                        <Td>{upload.timeLeft}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            </TransferSection>

            <TransferStatusBar>
              <span>Concurrent Downloads: {activeDownloads}</span>
              <span>Concurrent Uploads: {uploads.filter(u => u.status === 'Uploading').length}</span>
            </TransferStatusBar>

            <Footer>
              <FooterBox>Online (DownloadACar475): Sharing 2703 files.</FooterBox>
              <FooterBox>Currently 526,599 files (2,245 gigabytes) available in 6,411 libraries.</FooterBox>
            </Footer>
          </TransferContainer>
        )}

        {(activeTab === 'chat' || activeTab === 'library' || activeTab === 'hotlist') && (
          <Placeholder>
            Search and Transfer work. What more do you want?
          </Placeholder>
        )}
      </TabContent>
    </NapsterContainer>
  );
};

export default Napster;
