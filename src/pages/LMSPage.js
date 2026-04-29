import React, { useState, useEffect, useRef } from 'react';
import { BsHouseDoor, BsChevronRight, BsClipboardCheck, BsCalendarEvent, BsBook, BsFolder2Open, BsChatDots, BsBarChartLine, BsCheckCircleFill, BsClockHistory, BsCircle, BsTrophy, BsClock, BsCheckLg, BsArrowRight, BsAlarm, BsClockFill, BsSearch, BsChevronUp, BsChevronDown, BsCalendar2Check, BsPlayCircle, BsLockFill, BsBookmark, BsBookmarkFill, BsLink45Deg, BsExclamationTriangle, BsLightbulb, BsMegaphone, BsPeopleFill, BsEye, BsChatDotsFill, BsPinAngle, BsFire } from 'react-icons/bs';
import './LMSPage.css';
import { apiCall } from '../utils/api';

// Constants
const pageLabels = {
  activities: 'Activities', calendar: 'Calendar', modules: 'Modules', resources: 'Resources',
  assist: 'Assist', progress: 'Progress', announcements: 'Announcements', community: 'Community',
};
const TODAY = new Date('2026-03-05');
const phaseColors = { 0: '#666', 1: '#3498db', 2: '#e67e22', 3: '#2ecc71', 4: '#9b59b6' };

// Shared components
function Breadcrumb({ page }) {
  return (
    <div className="lms-breadcrumb">
      <span className="lms-breadcrumb__item lms-breadcrumb__item--muted"><BsHouseDoor /> Learning Hub</span>
      <BsChevronRight className="lms-breadcrumb__sep" />
      <span className="lms-breadcrumb__item lms-breadcrumb__item--current">{pageLabels[page] || page}</span>
    </div>
  );
}

function daysUntil(dateStr) {
  const d = new Date(dateStr);
  const diff = Math.ceil((d - TODAY) / (1000 * 60 * 60 * 24));
  return diff;
}

function UrgencyBadge({ dateStr }) {
  const days = daysUntil(dateStr);
  if (days < 0) return <span className="lms-urgency lms-urgency--overdue"><BsAlarm /> Overdue</span>;
  if (days === 0) return <span className="lms-urgency lms-urgency--today"><BsClockFill /> Due Today</span>;
  if (days <= 3) return <span className="lms-urgency lms-urgency--soon"><BsAlarm /> Due in {days}d</span>;
  if (days <= 7) return <span className="lms-urgency lms-urgency--upcoming"><BsClock /> Due in {days}d</span>;
  return null;
}

const statusMeta = {
  completed: { icon: <BsCheckCircleFill />, label: 'Completed', cls: 'lms-status--done' },
  'in-progress': { icon: <BsClockHistory />, label: 'In Progress', cls: 'lms-status--progress' },
  'not-started': { icon: <BsCircle />, label: 'Not Started', cls: 'lms-status--pending' },
};

function ActivitiesView() {
  const [activities, setActivities] = useState([]);
  const [phaseFilter, setPhaseFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await apiCall('/activities');
        setActivities(data);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading activities...</p></div>;
  if (error) return <div className="lms-view"><p>{error}</p></div>;

  const phaseFilters = [
    { id: 0, label: 'All Lessons' },
    { id: 1, label: 'Lesson 1', color: '#3498db' },
    { id: 2, label: 'Lesson 2', color: '#e67e22' },
    { id: 3, label: 'Lesson 3', color: '#2ecc71' },
    { id: 4, label: 'Lesson 4', color: '#9b59b6' },
  ];
  const filtered = phaseFilter === 0 ? activities : activities.filter(a => a.phase === phaseFilter);
  const completed = activities.filter(a => a.status === 'completed').length;
  const inProgress = activities.filter(a => a.status === 'in-progress').length;
  const notStarted = activities.filter(a => a.status === 'not-started').length;
  const totalPts = activities.reduce((s, a) => s + (a.points || 0), 0);
  const earnedPts = activities.filter(a => a.status === 'completed').reduce((s, a) => s + (a.points || 0), 0);
  const pctComplete = activities.length ? Math.round((completed / activities.length) * 100) : 0;

  return (
    <div className="lms-view">
      <Breadcrumb page="activities" />
      <div className="lms-page-hero lms-page-hero--activities">
        <div className="lms-page-hero__icon-wrap"><BsClipboardCheck /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Activities</h1>
          <p className="lms-page-hero__subtitle">Hands-on tasks mapped to lessons — from diagnostic to portfolio.</p>
        </div>
      </div>
      <div className="lms-stats-ribbon">
        <div className="lms-stats-ribbon__item">
          <div className="lms-stats-ribbon__icon lms-stats-ribbon__icon--green"><BsCheckCircleFill /></div>
          <div><span className="lms-stats-ribbon__num">{completed}</span><span className="lms-stats-ribbon__label">Completed</span></div>
        </div>
        <div className="lms-stats-ribbon__item">
          <div className="lms-stats-ribbon__icon lms-stats-ribbon__icon--blue"><BsClockHistory /></div>
          <div><span className="lms-stats-ribbon__num">{inProgress}</span><span className="lms-stats-ribbon__label">In Progress</span></div>
        </div>
        <div className="lms-stats-ribbon__item">
          <div className="lms-stats-ribbon__icon lms-stats-ribbon__icon--gray"><BsCircle /></div>
          <div><span className="lms-stats-ribbon__num">{notStarted}</span><span className="lms-stats-ribbon__label">Not Started</span></div>
        </div>
        <div className="lms-stats-ribbon__item">
          <div className="lms-stats-ribbon__icon lms-stats-ribbon__icon--accent"><BsTrophy /></div>
          <div><span className="lms-stats-ribbon__num">{earnedPts}<span className="lms-stats-ribbon__of">/{totalPts}</span></span><span className="lms-stats-ribbon__label">Points</span></div>
        </div>
      </div>
      <div className="lms-filter-row lms-filter-row--sticky">
        {phaseFilters.map(pf => (
          <button key={pf.id} className={`lms-pill${phaseFilter === pf.id ? ' lms-pill--active' : ''}`} style={phaseFilter === pf.id && pf.color ? { background: pf.color, borderColor: pf.color } : pf.color ? { borderColor: pf.color, color: pf.color } : {}} onClick={() => setPhaseFilter(pf.id)}>{pf.label}</button>
        ))}
        <span className="lms-filter-row__count">{filtered.length} task{filtered.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="lms-activities-list">
        {filtered.map((act, idx) => {
          const meta = statusMeta[act.status] || statusMeta['not-started'];
          return (
            <div className="lms-act-card" key={act._id || idx} style={{ '--phase-color': act.phaseColor, '--i': idx }}>
              <div className="lms-act-card__phase-stripe" />
              <div className="lms-act-card__body">
                <div className="lms-act-card__top-row">
                  <span className="lms-act-card__phase-tag" style={{ background: (act.phaseColor || '#3498db') + '15', color: act.phaseColor || '#3498db' }}>{act.phaseLabel}</span>
                  <span className={`lms-status ${meta.cls}`}>{meta.icon} {meta.label}</span>
                  {act.status !== 'completed' && <UrgencyBadge dateStr={act.dueDate} />}
                </div>
                <h3 className="lms-act-card__title">{act.title}</h3>
                <p className="lms-act-card__desc">{act.description}</p>
                <div className="lms-act-card__footer">
                  <div className="lms-act-card__meta">
                    <span className="lms-act-card__badge">{act.type}</span>
                    <span className="lms-act-card__pts"><BsTrophy /> {act.points} pts</span>
                    <span className="lms-act-card__due"><BsClock /> {act.dueDate}</span>
                  </div>
                  <button className={`lms-btn ${act.status === 'completed' ? 'lms-btn--success' : act.status === 'in-progress' ? '' : 'lms-btn--outline'}`}>
                    {act.status === 'completed' ? <><BsCheckLg /> View</> : act.status === 'in-progress' ? <>Continue <BsArrowRight /></> : <>Start <BsArrowRight /></>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarView() {
  const [events, setEvents] = useState({});
  const [selected, setSelected] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiCall('/calendar-events');
        const eventMap = {};
        data.forEach(e => {
          if (!eventMap[e.day]) eventMap[e.day] = [];
          eventMap[e.day].push(e);
        });
        setEvents(eventMap);
      } catch (err) {
        console.error('Error fetching calendar:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading calendar...</p></div>;

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const cells = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="lms-view">
      <Breadcrumb page="calendar" />
      <div className="lms-page-hero lms-page-hero--calendar">
        <div className="lms-page-hero__icon-wrap"><BsCalendarEvent /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Calendar</h1>
          <p className="lms-page-hero__subtitle">March 2026 — Your program schedule. Today is March 5.</p>
        </div>
      </div>
      <div className="lms-cal-layout">
        <div className="lms-cal-grid-wrap">
          <div className="lms-cal-header"><h3>March 2026</h3></div>
          <div className="lms-cal-days">{DAYS.map(d => <span key={d}>{d}</span>)}</div>
          <div className="lms-cal-grid">
            {cells.map((day) => {
              const dayEvents = events[day] || [];
              const isToday = day === 5;
              return (
                <div key={day} className={`lms-cal-cell${isToday ? ' lms-cal-cell--today' : ''}${selected === day ? ' lms-cal-cell--sel' : ''}${dayEvents.length ? ' lms-cal-cell--event' : ''}`} onClick={() => setSelected(day)}>
                  <span className="lms-cal-cell__num">{day}</span>
                  {dayEvents.length > 0 && <div className="lms-cal-cell__dots">{dayEvents.map((ev, ei) => <span key={ei} className="lms-cal-cell__dot" style={{ background: ev.type === 'deadline' ? '#e03131' : '#3498db' }} />)}</div>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="lms-cal-detail">
          <div className="lms-cal-detail__date">
            <span className="lms-cal-detail__day-num">{selected}</span>
            <h4>March {selected}, 2026</h4>
          </div>
          {events[selected] && events[selected].length > 0 ? (
            <div className="lms-cal-detail__events">
              {events[selected].map((ev, i) => (
                <div key={i} className="lms-cal-detail__event">
                  <span className="lms-cal-detail__type">{ev.type}</span>
                  <span className="lms-cal-detail__title">{ev.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="lms-cal-detail__empty"><BsCalendar2Check /><p>No events</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModulesView() {
  const [modules, setModules] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await apiCall('/modules');
        setModules(data);
      } catch (err) {
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading modules...</p></div>;

  return (
    <div className="lms-view">
      <Breadcrumb page="modules" />
      <div className="lms-page-hero lms-page-hero--modules">
        <div className="lms-page-hero__icon-wrap"><BsBook /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Modules</h1>
          <p className="lms-page-hero__subtitle">Four structured lessons — diagnostic, workshops, mentorship, and showcase.</p>
        </div>
      </div>
      <div className="lms-modules-list">
        {modules.map((mod, idx) => {
          const isOpen = expanded === mod._id;
          return (
            <div className={`lms-mod-card${!mod.unlocked ? ' lms-mod-card--locked' : ''}${isOpen ? ' lms-mod-card--expanded' : ''}`} key={mod._id} style={{ '--mod-color': mod.color || '#3498db' }}>
              <div className="lms-mod-card__header" onClick={() => mod.unlocked && setExpanded(isOpen ? null : mod._id)}>
                <div className="lms-mod-card__icon-wrap"><BsBook /></div>
                <div className="lms-mod-card__header-text">
                  <h3 className="lms-mod-card__title">{mod.title}</h3>
                  <p className="lms-mod-card__desc">{mod.description}</p>
                </div>
              </div>
              {mod.unlocked && isOpen && (
                <div className="lms-mod-card__content">
                  <div className="lms-mod-card__lessons">
                    <h4><BsBook /> Lessons</h4>
                    <ul>
                      {(mod.lessons || []).map((lesson, li) => (
                        <li key={li}><BsPlayCircle /><span>{lesson}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResourcesView() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await apiCall('/resources');
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading resources...</p></div>;

  const types = ['All', ...new Set(resources.map(r => r.type))];
  const filtered = filter === 'All' ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="lms-view">
      <Breadcrumb page="resources" />
      <div className="lms-page-hero lms-page-hero--resources">
        <div className="lms-page-hero__icon-wrap"><BsFolder2Open /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Resources</h1>
          <p className="lms-page-hero__subtitle">Frameworks, tools, and templates for your learning.</p>
        </div>
      </div>
      <div className="lms-filter-row">
        {types.map(t => (
          <button key={t} className={`lms-pill${filter === t ? ' lms-pill--active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="lms-resources-grid">
        {filtered.map((res) => (
          <div className="lms-res-card" key={res._id}>
            <div className="lms-res-card__body">
              <span className="lms-res-card__type">{res.type}</span>
              <h4 className="lms-res-card__title">{res.title}</h4>
              <p className="lms-res-card__author">{res.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssistView() {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await apiCall('/faqs');
        setFaqs(data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading assist...</p></div>;

  return (
    <div className="lms-view">
      <Breadcrumb page="assist" />
      <div className="lms-page-hero lms-page-hero--assist">
        <div className="lms-page-hero__icon-wrap"><BsChatDots /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Assist</h1>
          <p className="lms-page-hero__subtitle">Get help and find answers to common questions.</p>
        </div>
      </div>
      <div className="lms-assist-section">
        <h3>FAQ</h3>
        <div className="lms-faqs">
          {faqs.map((faq, i) => (
            <div className={`lms-faq-item${openFaq === i ? ' lms-faq-item--open' : ''}`} key={i}>
              <button className="lms-faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.question || faq.q}</span>
                {openFaq === i ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              {openFaq === i && <div className="lms-faq-item__a">{faq.answer || faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await apiCall('/announcements');
        setAnnouncements(data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading announcements...</p></div>;

  return (
    <div className="lms-view">
      <Breadcrumb page="announcements" />
      <div className="lms-page-hero lms-page-hero--announcements">
        <div className="lms-page-hero__icon-wrap"><BsMegaphone /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Announcements</h1>
          <p className="lms-page-hero__subtitle">Important updates from the team.</p>
        </div>
      </div>
      <div className="lms-announcements-list">
        {announcements.map((a) => (
          <div className="lms-announce-card" key={a._id}>
            <h4>{a.title}</h4>
            <p>{a.content || a.body}</p>
            <span className="lms-announce-card__date">{new Date(a.date || a.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityView() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await apiCall('/threads');
        setThreads(data);
      } catch (err) {
        console.error('Error fetching threads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);

  if (loading) return <div className="lms-view"><p>Loading community...</p></div>;

  return (
    <div className="lms-view">
      <Breadcrumb page="community" />
      <div className="lms-page-hero lms-page-hero--community">
        <div className="lms-page-hero__icon-wrap"><BsPeopleFill /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Community</h1>
          <p className="lms-page-hero__subtitle">Connect and learn from peers.</p>
        </div>
      </div>
      <div className="lms-threads-list">
        {threads.map((t) => (
          <div className="lms-thread" key={t._id}>
            <div className="lms-thread__body">
              <h4>{t.title}</h4>
              <p>{t.content}</p>
              <span className="lms-thread__meta">by {t.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  return (
    <div className="lms-view">
      <Breadcrumb page="progress" />
      <div className="lms-page-hero lms-page-hero--progress">
        <div className="lms-page-hero__icon-wrap"><BsBarChartLine /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Progress</h1>
          <p className="lms-page-hero__subtitle">Track your growth across lessons.</p>
        </div>
      </div>
      <p>Progress data will appear here.</p>
    </div>
  );
}

const views = {
  activities: ActivitiesView,
  calendar: CalendarView,
  modules: ModulesView,
  resources: ResourcesView,
  assist: AssistView,
  progress: ProgressView,
  announcements: AnnouncementsView,
  community: CommunityView,
};

const LMSPage = ({ page = 'activities' }) => {
  const View = views[page];
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  return (
    <div className="lms-page" ref={containerRef}>
      {View ? <View /> : <div className="lms-page__fallback">Page not found.</div>}
    </div>
  );
};

export default LMSPage;
