import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import './Dashboard.css';

const SECTIONS = [
  'home',
  'rationale',
  'objectives',
  'phases',
  'facilitators',
  'outcomes',
  'innovation',
  'references',
  'contact',
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* ── Scroll-spy: highlights sidebar link matching visible section ── */
  useEffect(() => {
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
  }, []);

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
      />

      <div className="dashboard__body">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
