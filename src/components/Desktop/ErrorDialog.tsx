import { useState } from 'react';
import {
  Window as Win95Window,
  WindowHeader,
  WindowContent,
  Button,
} from 'react95';
import styled from 'styled-components';

const Backdrop = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9998;
`;

const DialogContainer = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 380px;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.span`
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledWindowContent = styled(WindowContent)`
  padding: 16px !important;
  background-color: #c0c0c0;
`;

const ContentArea = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: #c00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 3px;
    background-color: white;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const MessageText = styled.div`
  font-size: 13px;
  line-height: 1.4;
  white-space: pre-wrap;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  min-width: 75px !important;
  height: 23px !important;
  padding: 0 12px !important;
  font-size: 11px !important;
`;

const DetailsBox = styled.div`
  background-color: #fff;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  padding: 12px;
  margin-top: 16px;
  font-size: 11px;
  line-height: 1.4;
`;

const DetailsLink = styled.a`
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;

  &:visited {
    color: #800080;
  }

  &:hover {
    color: #ff0000;
  }
`;

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function ErrorDialog({ isOpen, onClose, title, message }: ErrorDialogProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} />
      <DialogContainer $isOpen={isOpen}>
        <Win95Window style={{ width: '100%' }}>
          <StyledWindowHeader>
            <TitleText>{title}</TitleText>
          </StyledWindowHeader>
          <StyledWindowContent>
            <ContentArea>
              <ErrorIcon />
              <MessageText>{message}</MessageText>
            </ContentArea>
            <ButtonContainer>
              <StyledButton onClick={onClose}>Close</StyledButton>
              <StyledButton onClick={() => setShowDetails(!showDetails)}>
                Details {showDetails ? '<<' : '>>'}
              </StyledButton>
            </ButtonContainer>
            {showDetails && (
              <DetailsBox>
                <DetailsLink
                  href="https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp.
                </DetailsLink>
              </DetailsBox>
            )}
          </StyledWindowContent>
        </Win95Window>
      </DialogContainer>
    </>
  );
}
