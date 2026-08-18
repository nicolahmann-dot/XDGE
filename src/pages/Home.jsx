import { Hero } from '../components/sections/Hero';
import { DragWheelCarousel } from '../components/sections/DragWheelCarousel';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { WhoWeAre } from '../components/sections/WhoWeAre';
import { TheJourney } from '../components/sections/TheJourney';
import { OurPerformanceFormula } from '../components/sections/OurPerformanceFormula';
import { WhatYouLeaveWith } from '../components/sections/WhatYouLeaveWith';
import { ProvenOutcomes } from '../components/sections/ProvenOutcomes';
import { Insights } from '../components/sections/Insights';
import { IsThisRightForMe } from '../components/sections/IsThisRightForMe';
import { StepIntoNextLevel } from '../components/sections/StepIntoNextLevel';

export default function Home() {
  return (
    <>
      <Hero />
      <DragWheelCarousel />
      <TheJourney />
      <div className="xg-stick-wrap">
        <WhoWeServe />
      </div>
      <WhoWeAre />
      <OurPerformanceFormula />
      <WhatYouLeaveWith />
      <ProvenOutcomes />
      <IsThisRightForMe />
      <div className="xg-stick-wrap">
        <Insights />
      </div>
      <StepIntoNextLevel />
    </>
  );
}
