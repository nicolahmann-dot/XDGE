import { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/ScrollProgress';
import { TopBar } from './components/TopBar';
import { PageTransition } from './components/PageTransition';
import { ScrollReveal } from './components/ScrollReveal';
import { MarqueeIdle } from './components/MarqueeIdle';
import { PerfOverlay } from './components/PerfOverlay';
import { Footer } from './components/sections/Footer';
import { BackToTop } from './components/BackToTop';
import { Cursor } from './components/Cursor';
import { SkipToContent } from './components/SkipToContent';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { PageMeta } from './components/PageMeta';
import { initAnalytics } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const TheExperience = lazy(() => import('./pages/TheExperience'));
const About = lazy(() => import('./pages/About'));
const PerformanceFormula = lazy(() => import('./pages/PerformanceFormula'));
const Programmes = lazy(() => import('./pages/Programmes'));
const Contact = lazy(() => import('./pages/Contact'));
const Apply = lazy(() => import('./pages/Apply'));
const Faq = lazy(() => import('./pages/Faq'));
const InsightsIndex = lazy(() => import('./pages/InsightsIndex'));
const InsightArticle = lazy(() => import('./pages/InsightArticle'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Layout() {
  return (
    <div>
      <SkipToContent />
      <PageMeta />
      <ScrollProgress />
      <ScrollReveal />
      <MarqueeIdle />
      <PerfOverlay />
      <Cursor />
      <TopBar />
      <main id="main-content">
        <PageTransition />
      </main>
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/how-it-works" element={<TheExperience />} />
          <Route path="/about" element={<About />} />
          <Route path="/performance-formula" element={<PerformanceFormula />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
