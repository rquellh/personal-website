import { GroupBox, Anchor } from 'react95';
import styled from 'styled-components';
import headshotImage from '../../assets/pixel_art_large.png';
import githubIcon from '../../assets/icons/icons8-github-64.png';
import linkedinIcon from '../../assets/icons/linkedin_pixel_logo_icon_181925.png';

const StyledGroupBox = styled(GroupBox)`
  & > legend {
    font-size: 14px;
  }
  margin-bottom: 50px;
`;

const Container = styled.div`
  padding: 12px;
  font-size: 13px;
`;

const Section = styled.div`
  margin-bottom: 50px;
  line-height: 1.5;
`;

const HeaderSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const Headshot = styled.img`
  width: 200px;
  height: 200px;
  border: 2px inset #dfdfdf;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const LinkIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const Paragraph = styled.p`
  margin: 0 0 10px 0;
  line-height: 1.5;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
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
  font-size: 13px;
`;

export function AboutMe() {
  return (
    <Container>
      
      <HeaderSection>
        <Headshot src={headshotImage.src} alt="Ryan Quellhorst" />
        <div>
          <Paragraph>
            I&apos;m a Quality Assurance Specialist with over a decade of experience building reliable software systems across retail, utilities, government, and healthcare.
          </Paragraph>
          <Paragraph>
            Currently, I&apos;m at The Helper Bees, an insurtech company transforming how older adults age in place by building technology that helps people stay in the homes they love while receiving the care they deserve.
          </Paragraph>
        </div>
      </HeaderSection>
      <Section>
        <Paragraph>
          My career has taken me from mechanical engineering to leading QA efforts in a software startup that resulted in a $90M acquisition, where I helped scale an AI-powered platform that matched cancer patients with clinical trials.
        </Paragraph>
        <Paragraph>
          Along the way, I&apos;ve built automation frameworks, navigated complex regulatory environments (HIPAA, 21 CFR Part 11, SOC 2), and worn many hats—from requirements gathering and business analysis to stepping in for PM and UI/UX roles when needed.
        </Paragraph>
      </Section>

      <StyledGroupBox label="Beyond the Day Job">
        <Paragraph>
          I&apos;m passionate about building community. As Vice President of COSQAM (Central Ohio Software Quality Assurance &amp; Management), I lead our annual QA or the Highway conference and host quarterly educational events for QA professionals across Central Ohio. 
        </Paragraph>
        <Paragraph>
          I also serve on the board of Together With Grace, a nonprofit supporting Gabonese women through sewing training and self-sufficiency programs.
        </Paragraph>
        <Paragraph>
          When I&apos;m not at my desk, you&apos;ll find me with tools in hand. I&apos;m a hands-on creator who loves remodeling my home, woodworking, and fixing just about anything. I also enjoy digital art, exploring the outdoors, and traveling—all of which I do with my wife and two kids.
        </Paragraph>
      </StyledGroupBox>

      <StyledGroupBox label="What Drives Me">
        <Paragraph>
          I believe great software comes from understanding both the technical details and the human needs behind them. Whether it&apos;s automating test suites, guiding teams through compliance audits, or designing intuitive user experiences, I thrive on solving problems that make technology more accessible, reliable, and meaningful.
        </Paragraph>
        <Paragraph>
          If you&apos;re working on something that helps people live better lives, I&apos;d love to connect.
        </Paragraph>
      </StyledGroupBox>

      <StyledGroupBox label="Links">
        <LinkList>
          <LinkItem>
            <LinkIcon src={githubIcon.src} alt="" />
            <Anchor href="https://github.com/rquellh" target="_blank" rel="noopener noreferrer">
              GitHub
            </Anchor>
          </LinkItem>
          <LinkItem>
            <LinkIcon src={linkedinIcon.src} alt="" />
            <Anchor href="https://www.linkedin.com/in/ryanquellhorst" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Anchor>
          </LinkItem>
        </LinkList>
      </StyledGroupBox>
    </Container>
  );
}
