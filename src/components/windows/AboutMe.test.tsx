import { renderWithTheme, screen } from '../../test/test-utils';
import { AboutMe } from './AboutMe';

describe('AboutMe', () => {
  it('renders headshot image', () => {
    renderWithTheme(<AboutMe />);
    expect(screen.getByAltText('Ryan Quellhorst')).toBeInTheDocument();
  });

  it('renders bio content', () => {
    renderWithTheme(<AboutMe />);
    expect(
      screen.getByText(/Quality Assurance Specialist/i)
    ).toBeInTheDocument();
  });

  it('renders section group boxes', () => {
    renderWithTheme(<AboutMe />);
    expect(screen.getByText('Beyond the Day Job')).toBeInTheDocument();
    expect(screen.getByText('What Drives Me')).toBeInTheDocument();
    expect(screen.getByText('Links')).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    renderWithTheme(<AboutMe />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rquellh');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders LinkedIn link', () => {
    renderWithTheme(<AboutMe />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ryanquellhorst'
    );
  });
});
