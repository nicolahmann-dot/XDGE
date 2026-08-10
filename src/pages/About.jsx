import { AboutHero } from '../components/sections/AboutHero';
import { CreateYourPath } from '../components/sections/CreateYourPath';
import { AboutTeam } from '../components/sections/AboutTeam';
import { AboutPrinciples } from '../components/sections/AboutPrinciples';
import { AboutWhyLead } from '../components/sections/AboutWhyLead';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function About() {
  return (
    <div className="xg-about-page">
      <AboutHero />
      <CreateYourPath />
      <div className="xg-stick-wrap">
        <AboutTeam />
      </div>
      <AboutPrinciples />
      <AboutWhyLead />
      <StepIntoNextLevel />
    </div>
  );
}
