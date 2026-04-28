import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Hero } from './sections/Hero/Hero';
import { Features } from './sections/Features/Features';
import { About } from './sections/About/About';
import { Lifestyle } from './sections/Lifestyle/Lifestyle';
import { Gallery } from './sections/Gallery/Gallery';
import { Privacy } from './sections/Privacy/Privacy';
import { Scarcity } from './sections/Scarcity/Scarcity';
import { Testimonials } from './sections/Testimonials/Testimonials';
import { Investment } from './sections/Investment/Investment';
import { Faq } from './sections/Faq/Faq';
import { Location } from './sections/Location/Location';
import { VerticalGallery } from './sections/VerticalGallery/VerticalGallery';
import { Contact } from './sections/Contact/Contact';
import { Fab } from './components/Fab/Fab';
import { Footer } from './components/Footer/Footer';
import { PrivacyPolicy } from './pages/Legal/PrivacyPolicy';
import { CookiePolicy } from './pages/Legal/CookiePolicy';
import { TermsAndConditions } from './pages/Legal/TermsAndConditions';

const Home = () => (
  <>
    <Hero />
    <Features />
    <Lifestyle />
    <Gallery />
    <Privacy />
    <Scarcity />
    <About />
    <Testimonials />
    <Investment />
    <Faq />
    <Location />
    <VerticalGallery />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/termini-condizioni" element={<TermsAndConditions />} />
        </Routes>
      </main>
      <Fab />
      <Footer />
    </Router>
  );
}

export default App;
