import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const TAB_CONFIG = [
  { id: 'overview', label: 'Overview' },
  { id: 'content', label: 'Content' },
  { id: 'users', label: 'Users' },
];

const AdminPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [title, setTitle] = useState('DigiTeach Hub Admin');
  const [description, setDescription] = useState('Manage site content, users, and program settings from one place.');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const stopBackdropClose = (event) => event.stopPropagation();

  return (
    <div className="admin-panel-backdrop" onClick={onClose} role="presentation">
      <div className="admin-panel" onClick={stopBackdropClose} role="dialog" aria-modal="true" aria-label="Admin panel">
        <div className="admin-panel__header">
          <div>
            <h2>Admin Panel</h2>
            <p>Quick access to dashboard controls and content tools.</p>
          </div>
          <button className="btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="admin-panel__tabs" role="tablist" aria-label="Admin panel sections">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-panel__body">
          {activeTab === 'overview' && (
            <div>
              <form className="admin-form">
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Panel title" />
                <textarea
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Panel description"
                />
                <button className="btn" type="button">
                  Save Overview
                </button>
              </form>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <p>Content management controls can be connected here.</p>
              <button className="btn" type="button">
                Add Content
              </button>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <p>User administration tools can be connected here.</p>
              <button className="btn" type="button">
                Invite User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;