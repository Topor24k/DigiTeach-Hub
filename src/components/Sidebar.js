import React from 'react';
import {
  BsHouseDoor,
  BsXLg,
  BsClipboardCheck,
  BsCalendarEvent,
  BsBook,
  BsFolder2Open,
  BsChatDots,
  BsBarChartLine,
  BsMegaphone,
  BsPeopleFill,
} from 'react-icons/bs';
import dhLogo from '../assets/DH logo.png';
import './Sidebar.css';

const programItems = [
  { id: 'home', icon: <BsHouseDoor />, label: 'Home' },
];

const lmsItems = [
  { id: 'activities',    icon: <BsClipboardCheck />, label: 'Activities',     badge: '3' },
  { id: 'calendar',     icon: <BsCalendarEvent />,  label: 'Calendar'                  },
  { id: 'modules',      icon: <BsBook />,           label: 'Modules'                   },
  { id: 'resources',    icon: <BsFolder2Open />,    label: 'Resources'                 },
  { id: 'assist',       icon: <BsChatDots />,       label: 'Assist'                    },
  { id: 'progress',     icon: <BsBarChartLine />,   label: 'Progress'                  },
  { id: 'announcements',icon: <BsMegaphone />,      label: 'Announcements', badge: '1' },
  { id: 'community',    icon: <BsPeopleFill />,     label: 'Community'                 },
];

const Sidebar = ({ isOpen, onClose, activeSection, currentPage, onNavigate }) => {
  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate('home');
    onClose();
    setTimeout(() => {
      const el = document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleLMSClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    onClose();
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

        {/* ── Program section ── */}
        <span className="sidebar__section-label">Program</span>
        <nav className="sidebar__nav sidebar__nav--sm">
          {programItems.map((item) => {
            const isActive = currentPage === 'home';
            return (
              <a
                href="#home"
                key={item.id}
                className={`sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
                onClick={handleHomeClick}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
                {isActive && <span className="sidebar__nav-indicator" />}
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="sidebar__divider" />

        {/* ── Learning Hub (LMS) section ── */}
        <span className="sidebar__section-label sidebar__section-label--lms">Learning Hub</span>
        <nav className="sidebar__nav">
          {lmsItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                href={`#${item.id}`}
                key={item.id}
                className={`sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
                onClick={(e) => handleLMSClick(e, item.id)}
              >
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span className="sidebar__nav-label">{item.label}</span>
                {item.badge && (
                  <span className="sidebar__nav-badge">{item.badge}</span>
                )}
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
