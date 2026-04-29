import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import LMSPage from './LMSPage';
import AdminPanel from '../components/AdminPanel';
import './Dashboard.css';

const SECTIONS = [
  'home',
  'rationale',
  'objectives',
  'lessons',
  'facilitators',
  'outcomes',
  'innovation',
  'references',
  'contact',
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [adminOpen, setAdminOpen] = useState(false);

  /* ── Scroll-spy: only active when on the Home page ── */
  useEffect(() => {
    if (currentPage !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <div className="dashboard__body">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onAdminClick={() => setAdminOpen(true)} />
        {currentPage === 'home' ? <MainContent /> : <LMSPage page={currentPage} />}
      </div>

      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
};

export default Dashboard;
