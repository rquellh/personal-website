import { Fieldset, Anchor } from 'react95';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: #c0c0c0;
  border: 2px inset #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  margin: 0 0 8px 0;
  font-size: 18px;
`;

const Title = styled.p`
  margin: 0 0 8px 0;
  color: #666;
  font-style: italic;
`;

const Bio = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const LinksSection = styled.div`
  margin-top: 16px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
`;

const LinkItem = styled.li`
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export function AboutMe() {
  return (
    <Container>
      <ProfileSection>
        <Avatar>👤</Avatar>
        <Info>
          <Name>Your Name</Name>
          <Title>Software Developer</Title>
          <Bio>
            Welcome to my personal website! I&apos;m a developer who loves building
            things for the web. This site is inspired by the classic Windows 98
            desktop experience.
          </Bio>
        </Info>
      </ProfileSection>

      <Fieldset label="Links">
        <LinkList>
          <LinkItem>
            <span>🔗</span>
            <Anchor href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </Anchor>
          </LinkItem>
          <LinkItem>
            <span>🐦</span>
            <Anchor href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </Anchor>
          </LinkItem>
          <LinkItem>
            <span>💼</span>
            <Anchor href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Anchor>
          </LinkItem>
          <LinkItem>
            <span>📧</span>
            <Anchor href="mailto:your@email.com">
              Email Me
            </Anchor>
          </LinkItem>
        </LinkList>
      </Fieldset>
    </Container>
  );
}
