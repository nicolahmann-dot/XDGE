import { ExperienceHero } from '../components/sections/ExperienceHero';
import { WhatYouWillExperience } from '../components/sections/WhatYouWillExperience';
import { TheJourney } from '../components/sections/TheJourney';
import { OurPerformanceFormula } from '../components/sections/OurPerformanceFormula';
import { WhatYouLeaveWith } from '../components/sections/WhatYouLeaveWith';
import { DifferentAgesDifferentFocus } from '../components/sections/DifferentAgesDifferentFocus';
import { StandardsExpectations } from '../components/sections/StandardsExpectations';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';
import { ProvenOutcomes } from '../components/sections/ProvenOutcomes';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function TheExperience() {
  return (
    <div className="xg-experience-page">
      <ExperienceHero />
      <div className="xg-stick-wrap">
        <WhatYouWillExperience />
      </div>
      <TheJourney />
      <OurPerformanceFormula />
      <WhatYouLeaveWith />
      <DifferentAgesDifferentFocus />
      <StandardsExpectations />
      <div className="xg-stick-wrap">
        <IsThisRightForMe />
      </div>
      <ProvenOutcomes />
      <StepIntoNextLevel variant="media" />
    </div>
  );
}
