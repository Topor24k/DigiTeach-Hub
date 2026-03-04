import React from 'react';
import {
  BsHouseDoor,
  BsJournalText,
  BsBullseye,
  BsCalendar2Week,
  BsPeopleFill,
  BsTrophy,
  BsLightbulb,
  BsBookHalf,
  BsEnvelope,
  BsXLg,
} from 'react-icons/bs';
import dhLogo from '../assets/DH logo.png';
import './Sidebar.css';

const navItems = [
  { icon: <BsHouseDoor />, label: 'Home', href: '#home' },
  { icon: <BsJournalText />, label: 'Rationale', href: '#rationale' },
  { icon: <BsBullseye />, label: 'Objectives', href: '#objectives' },
  { icon: <BsCalendar2Week />, label: 'Program Phases', href: '#phases' },
  { icon: <BsPeopleFill />, label: 'Facilitators', href: '#facilitators' },
  { icon: <BsTrophy />, label: 'Expected Outcomes', href: '#outcomes' },
  { icon: <BsLightbulb />, label: 'Innovation', href: '#innovation' },
  { icon: <BsBookHalf />, label: 'References', href: '#references' },
  { icon: <BsEnvelope />, label: 'Contact', href: '#contact' },
];

const Sidebar = ({ isOpen, onClose, activeSection }) => {
  const handleClick = (e, href) => {
    e.preventDefault();
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay${isOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>
        {/* Close button for mobile */}
        <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
          <BsXLg />
        </button>

        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-circle">
            <img src={dhLogo} alt="DigiTeach Hub" className="sidebar__logo-img" />
          </div>
          <div className="sidebar__brand-wrap">
            <span className="sidebar__brand">DigiTeach Hub</span>
            <span className="sidebar__brand-sub">UM &middot; CTE</span>
          </div>
        </div>

        {/* Divider */}
        <div className="sidebar__divider" />

        {/* Section label */}
        <span className="sidebar__section-label">Program</span>

        {/* Navigation */}
        <nav className="sidebar__nav">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                href={item.href}
                key={index}
                className={`sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
                onClick={(e) => handleClick(e, item.href)}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
                {isActive && <span className="sidebar__nav-indicator" />}
              </a>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="sidebar__footer">
          <div className="sidebar__divider" />
          <div className="sidebar__footer-info">
            <p className="sidebar__footer-tagline">
              Empowering future educators with digital skills for 21st-century teaching.
            </p>
            <span className="sidebar__footer-copy">&copy; 2026 UM DigiTeach Hub</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
