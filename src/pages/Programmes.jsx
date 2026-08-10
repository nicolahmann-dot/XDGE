import { ProgrammesHero } from '../components/sections/ProgrammesHero';
import { ProgrammeTiers } from '../components/sections/ProgrammeTiers';
import { ProgrammeCTA } from '../components/sections/ProgrammeCTA';
import { IncubatorPathways } from '../components/sections/IncubatorPathways';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function Programmes() {
  return (
    <div className="xg-programmes-page">
      <ProgrammesHero />
      <ProgrammeTiers />
      <ProgrammeCTA />
      <IncubatorPathways />
      <StepIntoNextLevel />
    </div>
  );
}
