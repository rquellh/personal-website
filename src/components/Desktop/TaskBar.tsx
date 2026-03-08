import { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Button, Separator } from 'react95';
import styled from 'styled-components';
import { useWindowManager } from './WindowManager';
import type { WindowState } from './types';

// Icon imports
import windowsIcon from '../../assets/icons/windows-0.png';
import programsIcon from '../../assets/icons/directory_program_group.png';
import documentsIcon from '../../assets/icons/directory_open_file_mydocs-0.png';
import settingsIcon from '../../assets/icons/settings_gear-0.png';
import findIcon from '../../assets/icons/winrep_mag_glass.png';
import helpIcon from '../../assets/icons/help_book_big-0.png';
import runIcon from '../../assets/icons/application_hourglass_small-0.png';
import shutdownIcon from '../../assets/icons/shut_down_normal-0.png';
import napsterIcon from '../../assets/icons/napster.png';
import ieIcon from '../../assets/icons/internet_explorer.webp';
import folderIcon from '../../assets/icons/directory_closed_cool-0.png';
import rctIcon from '../../assets/icons/rtc.ico';
import pinballIcon from '../../assets/icons/pinball.png';
import oregonTrailIcon from '../../assets/icons/oregon_trail.ico';

const StyledAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  position: fixed;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SystemTrayIcon = styled.img`
  width: 18px;
  height: 18px;
  image-rendering: pixelated;
  cursor: pointer;
  margin-right: 8px;
  display: block;

  &:hover {
    opacity: 0.8;
  }
`;

const StartMenuContainer = styled.div`
  position: relative;
`;

const StartMenuWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
  display: flex;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  box-shadow: 2px 2px 0 0 #000;
`;

const StartMenuSidebar = styled.div`
  width: 32px;
  background: #808080;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
`;

const SidebarText = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: bold;
  font-size: 26px;
  letter-spacing: 1px;
  font-family: sans-serif;
`;

const SidebarWindows = styled.span`
  color: #c0c0c0;
`;

const Sidebar95 = styled.span`
  color: #fff;
`;

const StartMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 0;
  min-width: 175px;
`;

const MenuItem = styled.button<{ $hasSubmenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 32px 6px 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 14px;
  text-align: left;
  width: 100%;
  color: #000;
  position: relative;

  &:hover {
    background: #000080;
    color: #fff;
  }

  ${({ $hasSubmenu }) =>
    $hasSubmenu &&
    `
    &::after {
      content: '▶';
      position: absolute;
      right: 10px;
      font-size: 10px;
    }
    &:hover::after {
      color: #fff;
    }
  `}
`;

const MenuIcon = styled.img<{ $small?: boolean }>`
  width: ${props => props.$small ? '18px' : '32px'};
  height: ${props => props.$small ? '18px' : '32px'};
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #808080;
  margin: 3px 2px;
  border-bottom: 1px solid #fff;
`;

const SubmenuWrapper = styled.div`
  position: absolute;
  left: 100%;
  top: -2px;
  margin-left: 2px;
  display: flex;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  box-shadow: 2px 2px 0 0 #000;
`;

const SubmenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 0;
  min-width: 180px;
`;

const MenuItemWrapper = styled.div`
  position: relative;
`;

const WindowButton = styled(Button)<{ $active?: boolean }>`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  ${({ $active }) => $active && 'font-weight: bold;'}
`;

const ClockContainer = styled.div`
  border: 1px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  padding: 4px 12px;
  font-size: 14px;
  font-family: 'ms_sans_serif', sans-serif;
  background: #c0c0c0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StartButton = styled(Button)`
  font-weight: bold;
  font-size: 14px;
  font-family: 'ms_sans_serif', sans-serif;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WindowsLogo = styled.img`
  width: 20px;
  height: 20px;
  image-rendering: pixelated;
`;

interface TaskBarProps {
  onOpenIE?: () => void;
}

export function TaskBar({ onOpenIE }: TaskBarProps) {
  const { windows, focusWindow, restoreWindow, minimizeWindow, openWindow } = useWindowManager();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [programsSubmenuOpen, setProgramsSubmenuOpen] = useState(false);
  const [documentsSubmenuOpen, setDocumentsSubmenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  );
  const startMenuRef = useRef<HTMLDivElement>(null);

  const handleOpenNapster = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'napster',
      title: 'Napster v2.0 BETA 7',
      icon: napsterIcon.src,
      position: { x: 150, y: 80 },
      size: { width: 640, height: 480 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
    setStartMenuOpen(false);
    setProgramsSubmenuOpen(false);
  };

  const handleOpenRCT = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'roller-coaster-tycoon',
      title: 'RollerCoaster Tycoon',
      icon: rctIcon,
      position: { x: 140, y: 60 },
      size: { width: 640, height: 480 },
      minSize: { width: 400, height: 300 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
    setStartMenuOpen(false);
    setProgramsSubmenuOpen(false);
  };

  const handleOpenPinball = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'pinball',
      title: '3D Pinball for Windows - Space Cadet',
      icon: pinballIcon.src,
      position: { x: 160, y: 40 },
      size: { width: 640, height: 500 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
    setStartMenuOpen(false);
    setProgramsSubmenuOpen(false);
  };

  const handleOpenOregonTrail = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'oregon-trail',
      title: 'The Oregon Trail',
      icon: oregonTrailIcon,
      position: { x: 180, y: 50 },
      size: { width: 640, height: 480 },
      minSize: { width: 500, height: 400 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
    setStartMenuOpen(false);
    setProgramsSubmenuOpen(false);
  };

  const handleOpenFunStuff = () => {
    const windowConfig: Omit<WindowState, 'zIndex'> = {
      id: 'fun-stuff',
      title: 'Fun Stuff',
      icon: folderIcon.src,
      position: { x: 120, y: 50 },
      size: { width: 500, height: 350 },
      minSize: { width: 350, height: 250 },
      isMinimized: false,
      isMaximized: false,
    };
    openWindow(windowConfig);
    setStartMenuOpen(false);
    setDocumentsSubmenuOpen(false);
  };

  const handleOpenIE = () => {
    onOpenIE?.();
    setStartMenuOpen(false);
    setProgramsSubmenuOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setStartMenuOpen(false);
      }
    };

    if (startMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startMenuOpen]);

  const handleWindowButtonClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      const window = windows.find((w) => w.id === windowId);
      const maxZ = Math.max(...windows.map((w) => w.zIndex));
      if (window?.zIndex === maxZ) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    }
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <LeftSection>
          <StartMenuContainer ref={startMenuRef}>
            <StartButton
              onClick={() => setStartMenuOpen(!startMenuOpen)}
              active={startMenuOpen}
            >
              <WindowsLogo src={windowsIcon.src} alt="" />
              Start
            </StartButton>
            {startMenuOpen && (
              <StartMenuWrapper>
                <StartMenuSidebar>
                  <SidebarText>
                    <SidebarWindows>Windows</SidebarWindows>
                    <Sidebar95>95</Sidebar95>
                  </SidebarText>
                </StartMenuSidebar>
                <StartMenuContent>
                  <MenuItemWrapper
                    onMouseEnter={() => setProgramsSubmenuOpen(true)}
                    onMouseLeave={() => setProgramsSubmenuOpen(false)}
                  >
                    <MenuItem $hasSubmenu>
                      <MenuIcon src={programsIcon.src} alt="" />
                      Programs
                    </MenuItem>
                    {programsSubmenuOpen && (
                      <SubmenuWrapper>
                        <SubmenuContent>
                          <MenuItem onClick={handleOpenIE}>
                            <MenuIcon src={ieIcon.src} alt="" $small />
                            Internet Explorer
                          </MenuItem>
                          <MenuItem onClick={handleOpenNapster}>
                            <MenuIcon src={napsterIcon.src} alt="" $small />
                            Napster
                          </MenuItem>
                          <MenuItem onClick={handleOpenRCT}>
                            <MenuIcon src={rctIcon} alt="" $small />
                            RollerCoaster Tycoon
                          </MenuItem>
                          <MenuItem onClick={handleOpenPinball}>
                            <MenuIcon src={pinballIcon.src} alt="" $small />
                            3D Pinball
                          </MenuItem>
                          <MenuItem onClick={handleOpenOregonTrail}>
                            <MenuIcon src={oregonTrailIcon} alt="" $small />
                            The Oregon Trail
                          </MenuItem>
                        </SubmenuContent>
                      </SubmenuWrapper>
                    )}
                  </MenuItemWrapper>
                  <MenuItemWrapper
                    onMouseEnter={() => setDocumentsSubmenuOpen(true)}
                    onMouseLeave={() => setDocumentsSubmenuOpen(false)}
                  >
                    <MenuItem $hasSubmenu>
                      <MenuIcon src={documentsIcon.src} alt="" />
                      Documents
                    </MenuItem>
                    {documentsSubmenuOpen && (
                      <SubmenuWrapper>
                        <SubmenuContent>
                          <MenuItem onClick={handleOpenFunStuff}>
                            <MenuIcon src={folderIcon.src} alt="" $small />
                            Fun Stuff
                          </MenuItem>
                        </SubmenuContent>
                      </SubmenuWrapper>
                    )}
                  </MenuItemWrapper>
                  <MenuItem $hasSubmenu>
                    <MenuIcon src={settingsIcon.src} alt="" />
                    Settings
                  </MenuItem>
                  <MenuItem $hasSubmenu>
                    <MenuIcon src={findIcon.src} alt="" />
                    Find
                  </MenuItem>
                  <MenuItem>
                    <MenuIcon src={helpIcon.src} alt="" />
                    Help
                  </MenuItem>
                  <MenuItem>
                    <MenuIcon src={runIcon.src} alt="" />
                    Run...
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <MenuIcon src={shutdownIcon.src} alt="" />
                    Shut Down...
                  </MenuItem>
                </StartMenuContent>
              </StartMenuWrapper>
            )}
          </StartMenuContainer>
          <Separator orientation="vertical" size="40px" />
          {windows.map((window) => (
            <WindowButton
              key={window.id}
              $active={!window.isMinimized}
              onClick={() => handleWindowButtonClick(window.id, window.isMinimized)}
            >
              {window.title}
            </WindowButton>
          ))}
        </LeftSection>
        <RightSection>
          <ClockContainer>
            <SystemTrayIcon
              src={napsterIcon.src}
              alt="Napster"
              onClick={handleOpenNapster}
              title="Napster"
            />
            {currentTime}
          </ClockContainer>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}
