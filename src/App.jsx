import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Stars from './components/Stars.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Projects from './components/Projects/Projects.jsx';

// Resume pulls in react-pdf (heavy) — lazy-load to shrink the main bundle.
const Resume = lazy(() => import('./components/Resume/ResumeNew.jsx'));

const PRELOAD_MS = 1200;

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), PRELOAD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader loading={loading} />
      <Stars />
      <div id={loading ? 'no-scroll' : undefined}>
        <Navbar />
        <ScrollToTop />
        <main id="main">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
