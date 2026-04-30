import React, { useState } from 'react';
import Navbar     from './components/Navbar';
import IntroPage  from './pages/IntroPage';
import ChainPage  from './pages/ChainPage';
import ImpactPage from './pages/ImpactPage';
import './index.css';

const PAGES = { intro: IntroPage, chain: ChainPage, impact: ImpactPage };

export default function App() {
  const [activePage, setActivePage] = useState('intro');

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Page = PAGES[activePage] || IntroPage;

  return (
    <div style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <Navbar activePage={activePage} setActivePage={navigate} />
      {/* key prop forces remount on navigation — re-triggers entry animations */}
      <Page key={activePage} setActivePage={navigate} />
    </div>
  );
}
