import styled from 'styled-components';

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75px;
  padding: 4px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(0, 0, 128, 0.3);
  }

  &:focus {
    outline: 1px dotted white;
    background: rgba(0, 0, 128, 0.5);
  }
`;

const IconImage = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  image-rendering: pixelated;
`;

const IconLabel = styled.span`
  color: white;
  text-shadow: 1px 1px 1px black;
  font-size: 11px;
  text-align: center;
  word-wrap: break-word;
  max-width: 100%;
`;

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  return (
    <IconContainer
      tabIndex={0}
      onDoubleClick={onDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onDoubleClick();
        }
      }}
    >
      <IconImage src={icon} alt="" />
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  );
}
