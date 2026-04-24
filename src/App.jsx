import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Stars from './components/Stars.jsx';
// Home stays eager — it's the landing page and must paint fast.
import Home from './components/Home/Home.jsx';
// All other routes lazy — each becomes its own chunk. Landing on "/" only
// pays for Home + navbar + footer; everything else loads on click.
const About = lazy(() => import('./components/About/About.jsx'));
const Projects = lazy(() => import('./components/Projects/Projects.jsx'));
const Resume = lazy(() => import('./components/Resume/ResumeNew.jsx'));
const Contact = lazy(() => import('./components/Contact/Contact.jsx'));
const NotFound = lazy(() => import('./components/NotFound/NotFound.jsx'));

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Stars />
      <Navbar />
      <ScrollToTop />
      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
