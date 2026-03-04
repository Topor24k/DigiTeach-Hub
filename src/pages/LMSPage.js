import React, { useState, useEffect, useRef } from 'react';
import {
  BsClipboardCheck,
  BsCalendarEvent,
  BsBook,
  BsFolder2Open,
  BsChatDots,
  BsBarChartLine,
  BsMegaphone,
  BsPeopleFill,
  BsCheckCircleFill,
  BsCircle,
  BsClockHistory,
  BsPlayCircle,
  BsFileText,
  BsTools,
  BsYoutube,
  BsStar,
  BsStarFill,
  BsChevronDown,
  BsChevronUp,
  BsChevronRight,
  BsArrowRight,
  BsTrophy,
  BsLightbulb,
  BsEnvelopeAt,
  BsHeadset,
  BsCheckLg,
  BsLockFill,
  BsSearch,
  BsPersonWorkspace,
  BsJournalBookmark,
  BsMortarboard,
  BsLaptop,
  BsCloudDownload,
  BsShieldCheck,
  BsCameraVideo,
  BsWifi,
  BsEmojiSmile,
  BsClock,
  BsLink45Deg,
  BsExclamationTriangle,
  BsBookHalf,
  BsGraphUpArrow,
  BsPinAngle,
  BsCalendar2Check,
  BsEye,
  BsChatDotsFill,
  BsFileEarmarkPdf,
  BsBookmarkFill,
  BsBookmark,
  BsFire,
  BsHouseDoor,
  BsAlarm,
  BsClockFill,
} from 'react-icons/bs';
import './LMSPage.css';


/* ═══════════════════════════════════════════════════════════════
   ██  SHARED — Breadcrumb
   ═══════════════════════════════════════════════════════════════ */
const pageLabels = {
  activities: 'Activities',
  calendar: 'Calendar',
  modules: 'Modules',
  resources: 'Resources',
  assist: 'Assist',
  progress: 'Progress',
  announcements: 'Announcements',
  community: 'Community',
};

function Breadcrumb({ page }) {
  return (
    <div className="lms-breadcrumb">
      <span className="lms-breadcrumb__item lms-breadcrumb__item--muted">
        <BsHouseDoor /> Learning Hub
      </span>
      <BsChevronRight className="lms-breadcrumb__sep" />
      <span className="lms-breadcrumb__item lms-breadcrumb__item--current">
        {pageLabels[page] || page}
      </span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  SHARED — Urgency helpers
   ═══════════════════════════════════════════════════════════════ */
const TODAY = new Date('2026-03-05');

function daysUntil(dateStr) {
  const d = new Date(dateStr);
  const diff = Math.ceil((d - TODAY) / (1000 * 60 * 60 * 24));
  return diff;
}

function UrgencyBadge({ dateStr }) {
  const days = daysUntil(dateStr);
  if (days < 0)  return <span className="lms-urgency lms-urgency--overdue"><BsAlarm /> Overdue</span>;
  if (days === 0) return <span className="lms-urgency lms-urgency--today"><BsClockFill /> Due Today</span>;
  if (days <= 3)  return <span className="lms-urgency lms-urgency--soon"><BsAlarm /> Due in {days}d</span>;
  if (days <= 7)  return <span className="lms-urgency lms-urgency--upcoming"><BsClock /> Due in {days}d</span>;
  return null;
}


/* ═══════════════════════════════════════════════════════════════
   ██  ACTIVITIES  — Mapped directly to 4 Program Phases
   ═══════════════════════════════════════════════════════════════ */

const activities = [
  { id: 1, phase: 1, phaseLabel: 'Phase 1 — Diagnostic', phaseColor: '#3498db', status: 'completed', title: 'CHED ICT Competency Self-Assessment', desc: 'Complete the diagnostic assessment aligned with CHED ICT Competency Standards to identify your strengths and areas for improvement in digital teaching.', due: 'Feb 20, 2026', points: 20, type: 'Assessment' },
  { id: 2, phase: 1, phaseLabel: 'Phase 1 — Diagnostic', phaseColor: '#3498db', status: 'completed', title: 'Individualized Learning Plan (ILP)', desc: 'Based on your diagnostic results, draft your personalized Individualized Learning Plan outlining target competencies, preferred tools, and learning goals.', due: 'Feb 24, 2026', points: 25, type: 'Output' },
  { id: 3, phase: 2, phaseLabel: 'Phase 2 — Workshops', phaseColor: '#e67e22', status: 'in-progress', title: 'Transform a Traditional Lesson Plan into a Digital Module', desc: 'Select one of your traditional lesson plans and transform it into an interactive, technology-integrated format using the SAMR model.', due: 'Mar 10, 2026', points: 45, type: 'Workshop Output' },
  { id: 4, phase: 2, phaseLabel: 'Phase 2 — Workshops', phaseColor: '#e67e22', status: 'in-progress', title: 'Digital Tool Exploration & Reflection', desc: 'Explore three digital teaching tools (Canva, Padlet, Kahoot!) and submit a structured reflection comparing their pedagogical affordances.', due: 'Mar 14, 2026', points: 30, type: 'Reflection' },
  { id: 5, phase: 3, phaseLabel: 'Phase 3 — Mentorship', phaseColor: '#2ecc71', status: 'not-started', title: 'Peer Review of Digital Lesson Materials', desc: 'Exchange your digital lesson modules with a peer. Complete the structured Peer Review Rubric providing constructive feedback.', due: 'Mar 22, 2026', points: 30, type: 'Peer Review' },
  { id: 6, phase: 3, phaseLabel: 'Phase 3 — Mentorship', phaseColor: '#2ecc71', status: 'not-started', title: 'Mentor Consultation & Revision Log', desc: 'Meet with your assigned faculty mentor. Document the feedback received, revisions made, and how your digital materials now meet professional standards.', due: 'Mar 25, 2026', points: 25, type: 'Mentorship Log' },
  { id: 7, phase: 4, phaseLabel: 'Phase 4 — Showcase', phaseColor: '#9b59b6', status: 'not-started', title: 'Micro-Teaching Demo Recording', desc: 'Record a 10-minute micro-teaching demonstration integrating at least two digital tools for your professional E-Portfolio.', due: 'Mar 30, 2026', points: 50, type: 'Performance' },
  { id: 8, phase: 4, phaseLabel: 'Phase 4 — Showcase', phaseColor: '#9b59b6', status: 'not-started', title: 'Professional E-Portfolio Submission', desc: 'Compile and finalize your E-Portfolio containing your best digital lesson plans, instructional materials, and reflective documentation.', due: 'Apr 3, 2026', points: 60, type: 'Capstone Output' },
];

const statusMeta = {
  completed:     { icon: <BsCheckCircleFill />, label: 'Completed',   cls: 'lms-status--done' },
  'in-progress': { icon: <BsClockHistory />,    label: 'In Progress', cls: 'lms-status--progress' },
  'not-started': { icon: <BsCircle />,          label: 'Not Started', cls: 'lms-status--pending' },
};

function ActivitiesView() {
  const [phaseFilter, setPhaseFilter] = useState(0);
  const phaseFilters = [
    { id: 0, label: 'All Phases' },
    { id: 1, label: 'Phase 1', color: '#3498db' },
    { id: 2, label: 'Phase 2', color: '#e67e22' },
    { id: 3, label: 'Phase 3', color: '#2ecc71' },
    { id: 4, label: 'Phase 4', color: '#9b59b6' },
  ];
  const filtered = phaseFilter === 0 ? activities : activities.filter(a => a.phase === phaseFilter);
  const completed = activities.filter(a => a.status === 'completed').length;
  const inProgress = activities.filter(a => a.status === 'in-progress').length;
  const notStarted = activities.filter(a => a.status === 'not-started').length;
  const totalPts = activities.reduce((s, a) => s + a.points, 0);
  const earnedPts = activities.filter(a => a.status === 'completed').reduce((s, a) => s + a.points, 0);
  const pctComplete = Math.round((completed / activities.length) * 100);

  return (
    <div className="lms-view">
      <Breadcrumb page="activities" />

      <div className="lms-page-hero lms-page-hero--activities">
        <div className="lms-page-hero__icon-wrap"><BsClipboardCheck /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Activities</h1>
          <p className="lms-page-hero__subtitle">Hands-on tasks mapped to the 4 Program Phases — from diagnostic assessment to your professional E-Portfolio showcase.</p>
        </div>
        <div className="lms-page-hero__progress">
          <div className="lms-page-hero__progress-ring">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" className="lms-hero-ring__track" />
              <circle cx="24" cy="24" r="20" className="lms-hero-ring__fill" strokeDasharray={`${pctComplete * 1.257} 125.7`} transform="rotate(-90 24 24)" />
            </svg>
            <span className="lms-hero-ring__label">{pctComplete}%</span>
          </div>
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
          <button key={pf.id}
            className={`lms-pill${phaseFilter === pf.id ? ' lms-pill--active' : ''}`}
            style={phaseFilter === pf.id && pf.color ? { background: pf.color, borderColor: pf.color } : pf.color ? { borderColor: pf.color, color: pf.color } : {}}
            onClick={() => setPhaseFilter(pf.id)}
          >{pf.label}</button>
        ))}
        <span className="lms-filter-row__count">{filtered.length} task{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="lms-activities-list">
        {filtered.map((act, idx) => {
          const meta = statusMeta[act.status];
          return (
            <div className="lms-act-card" key={act.id} style={{ '--phase-color': act.phaseColor, '--i': idx }}>
              <div className="lms-act-card__phase-stripe" />
              <div className="lms-act-card__body">
                <div className="lms-act-card__top-row">
                  <span className="lms-act-card__phase-tag" style={{ background: act.phaseColor + '15', color: act.phaseColor }}>{act.phaseLabel}</span>
                  <span className={`lms-status ${meta.cls}`}>{meta.icon} {meta.label}</span>
                  {act.status !== 'completed' && <UrgencyBadge dateStr={act.due} />}
                </div>
                <h3 className="lms-act-card__title">{act.title}</h3>
                <p className="lms-act-card__desc">{act.desc}</p>
                <div className="lms-act-card__footer">
                  <div className="lms-act-card__meta">
                    <span className="lms-act-card__badge">{act.type}</span>
                    <span className="lms-act-card__pts"><BsTrophy /> {act.points} pts</span>
                    <span className="lms-act-card__due"><BsClock /> {act.due}</span>
                  </div>
                  <button className={`lms-btn ${act.status === 'completed' ? 'lms-btn--success' : act.status === 'in-progress' ? '' : 'lms-btn--outline'}`}>
                    {act.status === 'completed' ? <><BsCheckLg /> View Submission</> : act.status === 'in-progress' ? <>Continue <BsArrowRight /></> : <>Start Task <BsArrowRight /></>}
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


/* ═══════════════════════════════════════════════════════════════
   ██  CALENDAR
   ═══════════════════════════════════════════════════════════════ */

const calendarEvents = {
  2:  [{ title: 'Program Orientation & DigiTeach Hub Onboarding', type: 'event', phase: 1 }],
  3:  [{ title: 'CHED ICT Competency Diagnostic Assessment', type: 'deadline', phase: 1 }],
  5:  [{ title: 'Individualized Learning Plan Workshop', type: 'event', phase: 1 }],
  6:  [{ title: 'ILP Submission Deadline', type: 'deadline', phase: 1 }],
  9:  [{ title: 'Workshop: SAMR Model & Lesson Plan Transformation', type: 'event', phase: 2 }],
  10: [{ title: 'Digital Lesson Plan Draft Due', type: 'deadline', phase: 2 }],
  12: [{ title: 'Workshop: Digital Content Creation with Canva', type: 'event', phase: 2 }],
  14: [{ title: 'Digital Tool Reflection Due', type: 'deadline', phase: 2 }],
  16: [{ title: 'Workshop: Padlet for Collaborative Learning', type: 'event', phase: 2 }],
  18: [{ title: 'Workshop: Kahoot! & Gamified Assessment Design', type: 'event', phase: 2 }],
  19: [{ title: 'Interactive Lesson Module Submission', type: 'deadline', phase: 2 }],
  22: [{ title: 'Peer Review Exchange Begins', type: 'task', phase: 3 }],
  23: [{ title: 'Peer Review Rubric Submission', type: 'deadline', phase: 3 }],
  25: [{ title: 'Mentor Consultation Sessions Open', type: 'event', phase: 3 }],
  27: [{ title: 'Revision Log & Updated Materials Due', type: 'deadline', phase: 3 }],
  29: [{ title: 'Micro-Teaching Recording Workshop', type: 'event', phase: 4 }],
  30: [{ title: 'Micro-Teaching Demo Upload', type: 'deadline', phase: 4 }],
  31: [{ title: 'E-Portfolio Finalization & Readiness Showcase', type: 'event', phase: 4 }],
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_DAYS = 31;
const phaseColors = { 1: '#3498db', 2: '#e67e22', 3: '#2ecc71', 4: '#9b59b6' };
const weekRanges = [
  { label: 'Week 1 — Diagnostic', range: [2, 6], color: '#3498db' },
  { label: 'Weeks 2–3 — Workshops', range: [9, 19], color: '#e67e22' },
  { label: 'Weeks 4–5 — Mentorship', range: [22, 27], color: '#2ecc71' },
  { label: 'Week 6 — Showcase', range: [29, 31], color: '#9b59b6' },
];
const getWeekPhase = (day) => { for (const w of weekRanges) { if (day >= w.range[0] && day <= w.range[1]) return w; } return null; };

function CalendarView() {
  const [selected, setSelected] = useState(5);
  const cells = [];
  for (let d = 1; d <= MONTH_DAYS; d++) cells.push(d);

  // eslint-disable-next-line no-unused-vars
  const todayEvents = calendarEvents[5] || [];
  const upcomingDeadlines = Object.entries(calendarEvents)
    .filter(([d, evs]) => Number(d) >= 5 && evs.some(e => e.type === 'deadline'))
    .slice(0, 4);

  return (
    <div className="lms-view">
      <Breadcrumb page="calendar" />

      <div className="lms-page-hero lms-page-hero--calendar">
        <div className="lms-page-hero__icon-wrap"><BsCalendarEvent /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Calendar</h1>
          <p className="lms-page-hero__subtitle">March 2026 — Your 6-week program schedule at a glance. Today is <strong>March 5</strong>.</p>
        </div>
        <div className="lms-page-hero__today-badge">
          <span className="lms-page-hero__today-day">5</span>
          <span className="lms-page-hero__today-label">Today</span>
        </div>
      </div>

      <div className="lms-cal-legend">
        {weekRanges.map((w, i) => (
          <div className="lms-cal-legend__item" key={i}>
            <span className="lms-cal-legend__dot" style={{ background: w.color }} />
            <span>{w.label}</span>
          </div>
        ))}
        <div className="lms-cal-legend__item">
          <span className="lms-cal-legend__dot lms-cal-legend__dot--deadline" />
          <span>Deadline</span>
        </div>
      </div>

      <div className="lms-cal-layout">
        <div className="lms-cal-grid-wrap">
          <div className="lms-cal-header"><h3>March 2026</h3></div>
          <div className="lms-cal-days">{DAYS.map(d => <span key={d}>{d}</span>)}</div>
          <div className="lms-cal-grid">
            {cells.map((day) => {
              const events = calendarEvents[day] || [];
              const isToday = day === 5;
              const isSel = day === selected;
              const wp = getWeekPhase(day);
              const isPast = day < 5;
              return (
                <div key={day}
                  className={`lms-cal-cell${isToday ? ' lms-cal-cell--today' : ''}${isSel ? ' lms-cal-cell--sel' : ''}${events.length ? ' lms-cal-cell--event' : ''}${isPast ? ' lms-cal-cell--past' : ''}`}
                  onClick={() => setSelected(day)}
                  style={wp ? { '--cell-accent': wp.color } : {}}
                >
                  <span className="lms-cal-cell__num">{day}</span>
                  {events.length > 0 && (
                    <div className="lms-cal-cell__dots">
                      {events.map((ev, ei) => (
                        <span key={ei} className="lms-cal-cell__dot" style={{ background: ev.type === 'deadline' ? '#e03131' : ev.type === 'task' ? '#f59f00' : phaseColors[ev.phase] || 'var(--color-primary)' }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lms-cal-detail">
          <div className="lms-cal-detail__date">
            <span className="lms-cal-detail__day-num">{selected}</span>
            <div>
              <h4>March {selected}, 2026</h4>
              {(() => { const w = getWeekPhase(selected); return w ? <span className="lms-cal-detail__phase" style={{ color: w.color }}>{w.label}</span> : null; })()}
            </div>
          </div>

          {selected && calendarEvents[selected] ? (
            <div className="lms-cal-detail__events">
              {calendarEvents[selected].map((ev, i) => (
                <div key={i} className="lms-cal-detail__event" style={{ '--ev-color': ev.type === 'deadline' ? '#e03131' : ev.type === 'task' ? '#f59f00' : phaseColors[ev.phase] }}>
                  <span className="lms-cal-detail__type">{ev.type === 'deadline' ? 'Deadline' : ev.type === 'task' ? 'Task' : 'Event'}</span>
                  <span className="lms-cal-detail__title">{ev.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="lms-cal-detail__empty"><BsCalendar2Check /><p>No events on this day</p></div>
          )}

          <div className="lms-cal-detail__upcoming">
            <h5>Upcoming Deadlines</h5>
            {upcomingDeadlines.map(([d, evs]) => evs.filter(e => e.type === 'deadline').map((ev, i) => (
              <div key={`${d}-${i}`} className="lms-cal-detail__upcoming-item">
                <span className="lms-cal-detail__upcoming-date">Mar {d}</span>
                <span>{ev.title}</span>
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  MODULES  — Directly maps to 4 Program Phases
   ═══════════════════════════════════════════════════════════════ */

const modules = [
  {
    num: 1, phase: 'Phase 1', week: 'Week 1', title: 'Diagnostic Assessment & Strategic Orientation',
    desc: 'Comprehensive needs assessment aligned with CHED ICT Competency Standards. Identify your strengths and areas for improvement, then create your Individualized Learning Plan.',
    icon: <BsSearch />, color: '#3498db', duration: '~6 hours',
    lessons: ['Understanding the DigComp 2.2 Framework', 'CHED ICT Competency Standards Overview', 'Self-Assessment: Digital Teaching Skills', 'Interpreting Your Diagnostic Results', 'Creating Your Individualized Learning Plan'],
    output: 'Individualized Learning Plan', progress: 100, unlocked: true,
  },
  {
    num: 2, phase: 'Phase 2', week: 'Weeks 2–3', title: 'Intensive Workshops & Digital Content Creation',
    desc: 'Transform existing lesson plans into interactive, technology-integrated formats. Master multimedia tools, online platforms, and digital assessment strategies.',
    icon: <BsTools />, color: '#e67e22', duration: '~18 hours',
    lessons: ['The SAMR Model: Substitution to Redefinition', 'TPACK Framework for Lesson Design', 'Digital Content Creation with Canva', 'Collaborative Learning with Padlet', 'Gamified Assessment with Kahoot!', 'LMS Navigation & Course Setup', 'Designing Interactive Online Assessments'],
    output: 'Interactive Lesson Modules', progress: 55, unlocked: true,
  },
  {
    num: 3, phase: 'Phase 3', week: 'Weeks 4–5', title: 'Mentorship, Monitoring & Formative Evaluation',
    desc: 'Structured mentorship with faculty mentors. Peer review exchanges and continuous feedback ensure your digital materials meet professional standards.',
    icon: <BsPersonWorkspace />, color: '#2ecc71', duration: '~12 hours',
    lessons: ['Peer Review Protocols & Rubric Orientation', 'Giving Constructive Feedback on Digital Materials', 'Faculty Mentor Consultation Guidelines', 'Revising Materials Based on Feedback', 'Formative Assessment of Technology Integration'],
    output: 'Peer/Mentor-Reviewed Materials', progress: 0, unlocked: false,
  },
  {
    num: 4, phase: 'Phase 4', week: 'Week 6', title: 'Readiness Showcase & E-Portfolio Finalization',
    desc: 'Develop a professional E-Portfolio compiling your best digital lesson plans, instructional materials, recorded demo teaching, and reflective documentation.',
    icon: <BsJournalBookmark />, color: '#9b59b6', duration: '~10 hours',
    lessons: ['E-Portfolio Design & Structure', 'Recording Your Micro-Teaching Demo', 'Compiling Evidence of Digital Competence', 'Reflective Documentation Writing', 'Readiness Showcase Presentation Prep'],
    output: 'Professional Digital Portfolio', progress: 0, unlocked: false,
  },
];

function ModulesView() {
  const [expanded, setExpanded] = useState(null);
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = modules.reduce((s, m) => s + Math.floor(m.lessons.length * m.progress / 100), 0);

  return (
    <div className="lms-view">
      <Breadcrumb page="modules" />

      <div className="lms-page-hero lms-page-hero--modules">
        <div className="lms-page-hero__icon-wrap"><BsBook /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Modules</h1>
          <p className="lms-page-hero__subtitle">Four structured phases taking you from diagnostic assessment to professional portfolio — a complete 6-week learning journey.</p>
        </div>
        <div className="lms-page-hero__stat-chips">
          <span className="lms-hero-chip">{completedLessons}/{totalLessons} lessons</span>
          <span className="lms-hero-chip">~46 hours total</span>
        </div>
      </div>

      <div className="lms-modules-progress-bar">
        {modules.map((m, i) => (
          <React.Fragment key={m.num}>
            <div className={`lms-mpb__node${m.progress === 100 ? ' lms-mpb__node--done' : m.progress > 0 ? ' lms-mpb__node--active' : ''}`} style={{ '--node-color': m.color }}>
              {m.progress === 100 ? <BsCheckLg /> : m.num}
            </div>
            {i < modules.length - 1 && <div className={`lms-mpb__line${modules[i + 1].progress > 0 || m.progress === 100 ? ' lms-mpb__line--filled' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="lms-modules-list">
        {modules.map((mod, idx) => {
          const isOpen = expanded === mod.num;
          return (
            <div className={`lms-mod-card${!mod.unlocked ? ' lms-mod-card--locked' : ''}${isOpen ? ' lms-mod-card--expanded' : ''}`} key={mod.num} style={{ '--mod-color': mod.color, '--i': idx }}>
              <div className="lms-mod-card__header" onClick={() => mod.unlocked && setExpanded(isOpen ? null : mod.num)}>
                <div className="lms-mod-card__icon-wrap">{mod.icon}</div>
                <div className="lms-mod-card__header-text">
                  <div className="lms-mod-card__top-meta">
                    <span className="lms-mod-card__phase">{mod.phase}</span>
                    <span className="lms-mod-card__week">{mod.week}</span>
                    <span className="lms-mod-card__duration"><BsClock /> {mod.duration}</span>
                    {mod.progress === 100 && <span className="lms-mod-card__completed-badge"><BsCheckCircleFill /> Completed</span>}
                    {!mod.unlocked && <span className="lms-mod-card__locked-badge"><BsLockFill /> Locked</span>}
                  </div>
                  <h3 className="lms-mod-card__title">{mod.title}</h3>
                  <p className="lms-mod-card__desc">{mod.desc}</p>
                </div>
                {mod.unlocked && <div className="lms-mod-card__toggle">{isOpen ? <BsChevronUp /> : <BsChevronDown />}</div>}
              </div>

              {mod.unlocked && (
                <div className="lms-mod-card__progress-strip">
                  <div className="lms-mod-card__progress-fill" style={{ width: `${mod.progress}%` }} />
                </div>
              )}

              {isOpen && mod.unlocked && (
                <div className="lms-mod-card__content">
                  <div className="lms-mod-card__lessons">
                    <h4><BsBook /> Lessons ({mod.lessons.length})</h4>
                    <ul>
                      {mod.lessons.map((lesson, li) => {
                        const lessonDone = li < Math.floor(mod.lessons.length * mod.progress / 100);
                        return (
                          <li key={li} className={lessonDone ? 'lms-lesson--done' : ''}>
                            {lessonDone ? <BsCheckCircleFill className="lms-lesson-icon lms-lesson-icon--done" /> : <BsPlayCircle className="lms-lesson-icon" />}
                            <span>{lesson}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="lms-mod-card__output">
                    <BsClipboardCheck />
                    <div><span className="lms-mod-card__output-label">Expected Output</span><strong>{mod.output}</strong></div>
                  </div>
                  <div className="lms-mod-card__actions">
                    <span className="lms-mod-card__pct">{mod.progress}% complete</span>
                    <button className="lms-btn">{mod.progress === 0 ? 'Start Module' : mod.progress === 100 ? 'Review Module' : 'Continue Learning'} <BsArrowRight /></button>
                  </div>
                </div>
              )}

              {!mod.unlocked && (
                <div className="lms-mod-card__lock-msg"><BsLockFill /> Complete {modules[mod.num - 2]?.title || 'the previous module'} to unlock</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  RESOURCES
   ═══════════════════════════════════════════════════════════════ */

const resources = [
  { icon: <BsFileEarmarkPdf />, type: 'Framework',  title: 'DigComp 2.2 — Digital Competence Framework for Educators', author: 'European Commission', tag: 'Standards', color: '#1971c2', phase: 1 },
  { icon: <BsFileText />,       type: 'Policy',     title: 'CHED Memorandum on Flexible Learning Implementation', author: 'CHED (2022)', tag: 'Standards', color: '#1971c2', phase: 1 },
  { icon: <BsFileText />,       type: 'Article',    title: 'TPACK Framework for Pre-Service Teachers', author: 'Mishra & Koehler', tag: 'ICT Integration', color: '#1971c2', phase: 2 },
  { icon: <BsYoutube />,        type: 'Video',      title: 'Introduction to the SAMR Model — From Theory to Practice', author: 'Ruben Puentedura', tag: 'ICT Integration', color: '#e03131', phase: 2 },
  { icon: <BsYoutube />,        type: 'Video',      title: 'Using Padlet for Collaborative Classroom Activities', author: 'Padlet Edu', tag: 'Collaboration', color: '#e03131', phase: 2 },
  { icon: <BsYoutube />,        type: 'Video',      title: 'Designing Interactive Quizzes with Kahoot!', author: 'Kahoot! Education', tag: 'Gamification', color: '#e03131', phase: 2 },
  { icon: <BsTools />,          type: 'Tool Guide', title: 'Canva for Education — Complete Getting Started Guide', author: 'Canva Team', tag: 'Content Creation', color: '#5c5f66', phase: 2 },
  { icon: <BsTools />,          type: 'Tool Guide', title: 'Nearpod for Interactive Lesson Delivery', author: 'Nearpod Education', tag: 'Digital Tools', color: '#5c5f66', phase: 2 },
  { icon: <BsFileText />,       type: 'Template',   title: 'ICT-Enhanced Lesson Plan Template (SAMR-Aligned)', author: 'DigiTeach Hub', tag: 'Lesson Planning', color: '#2f9e44', phase: 2 },
  { icon: <BsFileText />,       type: 'Template',   title: 'Peer Review Rubric for Digital Teaching Materials', author: 'DigiTeach Hub', tag: 'Assessment', color: '#2f9e44', phase: 3 },
  { icon: <BsFileText />,       type: 'Template',   title: 'E-Portfolio Structure & Documentation Guide', author: 'DigiTeach Hub', tag: 'Portfolio', color: '#2f9e44', phase: 4 },
  { icon: <BsFileText />,       type: 'Template',   title: 'Micro-Teaching Observation & Scoring Form', author: 'DigiTeach Hub', tag: 'Assessment', color: '#2f9e44', phase: 4 },
  { icon: <BsCloudDownload />,  type: 'OER',        title: 'Pre-loaded Offline-Capable Teaching Resources Pack', author: 'DigiTeach Hub', tag: 'Offline Access', color: '#0ca678', phase: 0 },
  { icon: <BsFileText />,       type: 'Guide',      title: 'Extended Lab Hours — On-Campus Schedule & Access Guide', author: 'UM CTE', tag: 'Digital Disparity', color: '#0ca678', phase: 0 },
];

function ResourcesView() {
  const [filter, setFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState(new Set([0, 3, 8]));
  const types = ['All', 'Framework', 'Video', 'Tool Guide', 'Template', 'OER'];
  const filtered = filter === 'All' ? resources : resources.filter(r => r.type === filter);

  const toggleBookmark = (i) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="lms-view">
      <Breadcrumb page="resources" />

      <div className="lms-page-hero lms-page-hero--resources">
        <div className="lms-page-hero__icon-wrap"><BsFolder2Open /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Resources</h1>
          <p className="lms-page-hero__subtitle">Curated frameworks, tools, templates, and offline resources supporting every phase of your training.</p>
        </div>
        <div className="lms-page-hero__stat-chips">
          <span className="lms-hero-chip">{resources.length} resources</span>
          <span className="lms-hero-chip"><BsBookmarkFill /> {bookmarks.size} saved</span>
        </div>
      </div>

      <div className="lms-filter-row lms-filter-row--sticky">
        {types.map(t => (
          <button key={t} className={`lms-pill${filter === t ? ' lms-pill--active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
        <span className="lms-filter-row__count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="lms-resources-grid">
        {filtered.map((res, i) => {
          const globalIdx = resources.indexOf(res);
          const saved = bookmarks.has(globalIdx);
          return (
            <div className="lms-res-card" key={i} style={{ '--i': i }}>
              <div className="lms-res-card__icon" style={{ color: res.color, background: res.color + '12' }}>{res.icon}</div>
              <div className="lms-res-card__body">
                <div className="lms-res-card__top">
                  <span className="lms-res-card__type">{res.type}</span>
                  {res.phase > 0 && <span className="lms-res-card__phase" style={{ color: phaseColors[res.phase] }}>Phase {res.phase}</span>}
                </div>
                <h4 className="lms-res-card__title">{res.title}</h4>
                <p className="lms-res-card__author">{res.author}</p>
                <span className="lms-res-card__tag">{res.tag}</span>
              </div>
              <div className="lms-res-card__actions">
                <button className={`lms-bookmark${saved ? ' lms-bookmark--active' : ''}`} onClick={() => toggleBookmark(globalIdx)} title={saved ? 'Remove bookmark' : 'Bookmark'}>
                  {saved ? <BsBookmarkFill /> : <BsBookmark />}
                </button>
                <button className="lms-btn lms-btn--sm lms-btn--outline"><BsLink45Deg /> Open</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  ASSIST  — Anticipated Challenges & Solutions
   ═══════════════════════════════════════════════════════════════ */

const challengeSolutions = [
  { icon: <BsLaptop />, challenge: 'Digital Disparity', impact: 'Uneven access to hardware and devices', solution: 'Extended on-campus laboratory hours with pre-loaded resources', details: 'DigiTeach Hub provides extended lab access (8 AM – 8 PM) during the 6-week program. All workshop materials, OERs, and tool guides are pre-downloaded and available on campus machines.', color: '#3498db' },
  { icon: <BsEmojiSmile />, challenge: 'Summer Fatigue', impact: 'Potential drop in engagement during summer', solution: 'Gamified workshops, badges & regular check-in sessions', details: 'Earn badges and points for every completed activity. Weekly facilitator check-ins keep you motivated. Activities are designed as interactive, game-based challenges rather than traditional lectures.', color: '#e67e22' },
  { icon: <BsWifi />, challenge: 'Internet Instability', impact: 'Interrupted online activities', solution: 'Offline-capable tools & pre-loaded Open Educational Resources', details: 'All core resources are available for offline download. Workshop slides, templates, and tool guides work without internet. Canva offline mode and downloadable Kahoot packs are provided.', color: '#2ecc71' },
];

const faqs = [
  { q: 'How do I submit my activity outputs?', a: 'Navigate to Activities, find your task, and click "Continue" or "Start Task". Upload your file (PDF, DOCX, or MP4 for videos) and hit Submit before the due date shown on the Calendar.' },
  { q: 'What happens if I miss a deadline?', a: 'Contact your assigned facilitator immediately via the Assist chat or email. Late submissions may be accepted with a valid reason, but points may be reduced.' },
  { q: 'How is my overall progress calculated?', a: 'Progress is based on completed module lessons and activity submissions. Each activity has a point value. Your total points and completion percentage are tracked on the Progress page.' },
  { q: 'Can I revisit completed modules?', a: 'Yes! All completed modules and their lessons remain fully accessible for review. Click "Review Module" on any completed module card.' },
  { q: 'What is the E-Portfolio and why is it important?', a: 'Your E-Portfolio is the capstone output — it compiles your best digital lesson plans, instructional materials, micro-teaching recording, and reflective documentation as professional proof of your digital teaching readiness for your 4th-year internship.' },
  { q: 'How do I access resources offline?', a: 'Go to Resources and look for items tagged "Offline Access" or "OER". These can be downloaded directly. On campus, all materials are also available on lab computers without internet.' },
];

function AssistView() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openChallenge, setOpenChallenge] = useState(null);

  return (
    <div className="lms-view">
      <Breadcrumb page="assist" />

      <div className="lms-page-hero lms-page-hero--assist">
        <div className="lms-page-hero__icon-wrap"><BsChatDots /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Assist</h1>
          <p className="lms-page-hero__subtitle">Get help, find answers, and access solutions for anticipated challenges.</p>
        </div>
      </div>

      <div className="lms-assist-channels">
        <div className="lms-assist-ch" style={{ '--ch-accent': '#3498db' }}>
          <div className="lms-assist-ch__icon-wrap" style={{ background: '#3498db15', color: '#3498db' }}><BsHeadset /></div>
          <h4>Live Chat Support</h4>
          <p>Connect with a facilitator in real time</p>
          <span className="lms-assist-ch__availability"><span className="lms-assist-ch__status-dot lms-assist-ch__status-dot--online" /> Available now</span>
          <button className="lms-btn">Chat Now <BsArrowRight /></button>
        </div>
        <div className="lms-assist-ch" style={{ '--ch-accent': '#e67e22' }}>
          <div className="lms-assist-ch__icon-wrap" style={{ background: '#e67e2215', color: '#e67e22' }}><BsEnvelopeAt /></div>
          <h4>Email a Facilitator</h4>
          <p>For detailed questions or file submissions</p>
          <span className="lms-assist-ch__availability">Response within 24 hours</span>
          <button className="lms-btn lms-btn--outline">Compose Email</button>
        </div>
        <div className="lms-assist-ch" style={{ '--ch-accent': '#2ecc71' }}>
          <div className="lms-assist-ch__icon-wrap" style={{ background: '#2ecc7115', color: '#2ecc71' }}><BsCloudDownload /></div>
          <h4>Offline Resource Pack</h4>
          <p>Download all materials for offline access</p>
          <span className="lms-assist-ch__availability">No internet required</span>
          <button className="lms-btn lms-btn--outline">Download Pack</button>
        </div>
      </div>

      <div className="lms-assist-section">
        <div className="lms-assist-section__header">
          <BsShieldCheck />
          <div><h3>Anticipated Challenges &amp; Solutions</h3><p>The program proactively addresses these common barriers to ensure your success.</p></div>
        </div>
        <div className="lms-challenge-cards">
          {challengeSolutions.map((cs, i) => (
            <div className={`lms-challenge-card${openChallenge === i ? ' lms-challenge-card--open' : ''}`} key={i} style={{ '--ch-color': cs.color, '--i': i }} onClick={() => setOpenChallenge(openChallenge === i ? null : i)}>
              <div className="lms-challenge-card__header">
                <div className="lms-challenge-card__icon">{cs.icon}</div>
                <div>
                  <h4>{cs.challenge}</h4>
                  <p className="lms-challenge-card__impact"><BsExclamationTriangle /> {cs.impact}</p>
                </div>
              </div>
              <div className="lms-challenge-card__solution"><BsCheckCircleFill /> <strong>Solution:</strong> {cs.solution}</div>
              {openChallenge === i && <p className="lms-challenge-card__details">{cs.details}</p>}
              <span className="lms-challenge-card__more">{openChallenge === i ? 'Show less' : 'Learn more'} {openChallenge === i ? <BsChevronUp /> : <BsChevronDown />}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lms-assist-section">
        <div className="lms-assist-section__header">
          <BsLightbulb />
          <div><h3>Frequently Asked Questions</h3><p>Quick answers to common questions about the program.</p></div>
        </div>
        <div className="lms-faqs">
          {faqs.map((faq, i) => (
            <div className={`lms-faq-item${openFaq === i ? ' lms-faq-item--open' : ''}`} key={i} style={{ '--i': i }}>
              <button className="lms-faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="lms-faq-item__num">{String(i + 1).padStart(2, '0')}</span>
                <span>{faq.q}</span>
                {openFaq === i ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              {openFaq === i && <div className="lms-faq-item__a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  PROGRESS  — Maps to Expected Outcomes
   ═══════════════════════════════════════════════════════════════ */

const expectedOutcomes = [
  { label: 'Technology-integrated lesson planning & LMS skills', pct: 80, icon: <BsLaptop /> },
  { label: 'Measurable digital pedagogical competency gains', pct: 65, icon: <BsGraphUpArrow /> },
  { label: 'Interactive learning module design proficiency', pct: 55, icon: <BsTools /> },
  { label: 'Professional digital teaching portfolio', pct: 20, icon: <BsJournalBookmark /> },
  { label: 'Readiness for 4th-year internship', pct: 40, icon: <BsMortarboard /> },
  { label: 'Preparedness for 21st-century classrooms', pct: 35, icon: <BsShieldCheck /> },
];

const phaseProgress = [
  { label: 'Phase 1 — Diagnostic Assessment', pct: 100, color: '#3498db' },
  { label: 'Phase 2 — Workshops & Content Creation', pct: 55, color: '#e67e22' },
  { label: 'Phase 3 — Mentorship & Evaluation', pct: 0, color: '#2ecc71' },
  { label: 'Phase 4 — Showcase & E-Portfolio', pct: 0, color: '#9b59b6' },
];

const badges = [
  { icon: <BsCheckLg />, label: 'First Step', desc: 'Completed the diagnostic assessment', earned: true },
  { icon: <BsStarFill />, label: 'Digital Explorer', desc: 'Explored 3 digital teaching tools', earned: true },
  { icon: <BsBookHalf />, label: 'Lesson Designer', desc: 'Submitted an ICT-enhanced lesson plan', earned: false },
  { icon: <BsPeopleFill />, label: 'Peer Mentor', desc: 'Completed a peer review exchange', earned: false },
  { icon: <BsCameraVideo />, label: 'Demo Teacher', desc: 'Uploaded a micro-teaching recording', earned: false },
  { icon: <BsJournalBookmark />, label: 'Portfolio Ready', desc: 'Submitted your professional E-Portfolio', earned: false },
  { icon: <BsTrophy />, label: 'DigiTeach Graduate', desc: 'Completed all 4 program phases', earned: false },
  { icon: <BsLightbulb />, label: 'Innovator', desc: 'Achieved Redefinition level on SAMR', earned: false },
];

function ProgressView() {
  const overallPhase = Math.round(phaseProgress.reduce((s, p) => s + p.pct, 0) / phaseProgress.length);
  const earnedBadges = badges.filter(b => b.earned).length;
  const completedAct = activities.filter(a => a.status === 'completed').length;
  const earnedPts = activities.filter(a => a.status === 'completed').reduce((s, a) => s + a.points, 0);

  return (
    <div className="lms-view">
      <Breadcrumb page="progress" />

      <div className="lms-page-hero lms-page-hero--progress">
        <div className="lms-page-hero__icon-wrap"><BsBarChartLine /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Progress</h1>
          <p className="lms-page-hero__subtitle">Track your growth across program phases, competency outcomes, and earned achievements.</p>
        </div>
      </div>

      <div className="lms-progress-overview">
        <div className="lms-progress-overview__ring-card">
          <svg className="lms-ring" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="58" className="lms-ring__track" />
            <circle cx="70" cy="70" r="58" className="lms-ring__fill" strokeDasharray={`${overallPhase * 3.64} 364`} transform="rotate(-90 70 70)" />
          </svg>
          <div className="lms-ring__label"><span className="lms-ring__pct">{overallPhase}%</span><span className="lms-ring__sub">Overall</span></div>
        </div>
        <div className="lms-progress-overview__stats">
          <div className="lms-po-stat">
            <div className="lms-po-stat__icon" style={{ background: '#3498db15', color: '#3498db' }}><BsBook /></div>
            <div><span className="lms-po-stat__num">1<span className="lms-po-stat__of">/4</span></span><span className="lms-po-stat__label">Phases Done</span></div>
          </div>
          <div className="lms-po-stat">
            <div className="lms-po-stat__icon" style={{ background: '#2f9e4415', color: '#2f9e44' }}><BsClipboardCheck /></div>
            <div><span className="lms-po-stat__num">{completedAct}<span className="lms-po-stat__of">/8</span></span><span className="lms-po-stat__label">Activities</span></div>
          </div>
          <div className="lms-po-stat">
            <div className="lms-po-stat__icon" style={{ background: '#e67e2215', color: '#e67e22' }}><BsTrophy /></div>
            <div><span className="lms-po-stat__num">{earnedPts}<span className="lms-po-stat__of">/285</span></span><span className="lms-po-stat__label">Points</span></div>
          </div>
          <div className="lms-po-stat">
            <div className="lms-po-stat__icon" style={{ background: '#f59f0015', color: '#f59f00' }}><BsStar /></div>
            <div><span className="lms-po-stat__num">{earnedBadges}<span className="lms-po-stat__of">/8</span></span><span className="lms-po-stat__label">Badges</span></div>
          </div>
        </div>
      </div>

      <div className="lms-progress-section">
        <h3 className="lms-progress-section__title">Phase Progress</h3>
        <div className="lms-phase-bars">
          {phaseProgress.map((p, i) => (
            <div className="lms-phase-bar" key={i} style={{ '--i': i }}>
              <div className="lms-phase-bar__header"><span className="lms-phase-bar__label">{p.label}</span><span className="lms-phase-bar__pct" style={{ color: p.color }}>{p.pct}%</span></div>
              <div className="lms-phase-bar__track"><div className="lms-phase-bar__fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="lms-progress-section">
        <h3 className="lms-progress-section__title">Expected Outcome Competencies</h3>
        <p className="lms-progress-section__subtitle">Your progress toward the 6 expected outcomes of the DigiTeach Hub program.</p>
        <div className="lms-outcome-bars">
          {expectedOutcomes.map((o, i) => (
            <div className="lms-outcome-bar" key={i} style={{ '--i': i }}>
              <div className="lms-outcome-bar__header">
                <span className="lms-outcome-bar__icon">{o.icon}</span>
                <span className="lms-outcome-bar__label">{o.label}</span>
                <span className="lms-outcome-bar__pct">{o.pct}%</span>
              </div>
              <div className="lms-outcome-bar__track"><div className="lms-outcome-bar__fill" style={{ width: `${o.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="lms-progress-section">
        <h3 className="lms-progress-section__title">Badges &amp; Achievements</h3>
        <p className="lms-progress-section__subtitle">{earnedBadges} of {badges.length} badges earned. Keep going!</p>
        <div className="lms-badges-grid">
          {badges.map((b, i) => (
            <div className={`lms-badge-card${b.earned ? ' lms-badge-card--earned' : ''}`} key={i} style={{ '--i': i }}>
              <div className="lms-badge-card__icon">{b.icon}</div>
              <span className="lms-badge-card__name">{b.label}</span>
              <span className="lms-badge-card__desc">{b.desc}</span>
              {!b.earned && <span className="lms-badge-card__lock"><BsLockFill /> Locked</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  ANNOUNCEMENTS
   ═══════════════════════════════════════════════════════════════ */

const announcements = [
  { date: 'Mar 5, 2026', title: 'Phase 2 Workshops Have Begun!', body: 'Intensive Workshops & Digital Content Creation (Weeks 2–3) are now underway. Your first workshop on the SAMR Model and Lesson Plan Transformation is scheduled for March 9. Make sure your Phase 1 outputs are already submitted.', author: 'DigiTeach Hub Team', urgent: true, phase: 2, read: false },
  { date: 'Mar 3, 2026', title: 'Reminder: Extended Lab Hours Available', body: 'If you\'re experiencing device or internet access challenges, remember that on-campus computer labs are available with extended hours (8 AM – 8 PM) throughout the program. All workshop materials and OERs are pre-loaded.', author: 'UM CTE Admin', urgent: true, phase: 0, read: false },
  { date: 'Mar 1, 2026', title: 'Phase 1 Complete — Congratulations!', body: 'All participants have successfully completed the Diagnostic Assessment & Strategic Orientation phase. Your Individualized Learning Plans have been reviewed by facilitators. Feedback is available in your Activities dashboard.', author: 'DigiTeach Hub Team', urgent: false, phase: 1, read: true },
  { date: 'Feb 26, 2026', title: 'Welcome to UM DigiTeach Hub!', body: 'Welcome to the 6-week intensive summer training program! This program will take you through 4 structured phases — from diagnostic assessment to a professional E-Portfolio — preparing you for effective 21st-century teaching.', author: 'Dr. Maria Santos, Program Director', urgent: false, phase: 0, read: true },
];

function AnnouncementsView() {
  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <div className="lms-view">
      <Breadcrumb page="announcements" />

      <div className="lms-page-hero lms-page-hero--announcements">
        <div className="lms-page-hero__icon-wrap"><BsMegaphone /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Announcements</h1>
          <p className="lms-page-hero__subtitle">Important updates from the DigiTeach Hub facilitation team.</p>
        </div>
        {unreadCount > 0 && (
          <div className="lms-page-hero__stat-chips">
            <span className="lms-hero-chip lms-hero-chip--alert">{unreadCount} unread</span>
          </div>
        )}
      </div>

      <div className="lms-announcements-list">
        {announcements.map((a, i) => (
          <div className={`lms-announce-card${a.urgent ? ' lms-announce-card--urgent' : ''}${!a.read ? ' lms-announce-card--unread' : ''}`} key={i} style={{ '--i': i }}>
            {!a.read && <span className="lms-announce-card__unread-dot" />}
            <div className="lms-announce-card__sidebar">
              <span className="lms-announce-card__date-day">{a.date.split(',')[0].split(' ')[1]}</span>
              <span className="lms-announce-card__date-month">{a.date.split(' ')[0]}</span>
            </div>
            <div className="lms-announce-card__body">
              <div className="lms-announce-card__top">
                {a.urgent && <span className="lms-announce-card__new">New</span>}
                {a.phase > 0 && <span className="lms-announce-card__phase" style={{ color: phaseColors[a.phase], background: phaseColors[a.phase] + '12' }}>Phase {a.phase}</span>}
                <span className="lms-announce-card__date">{a.date}</span>
              </div>
              <h3 className="lms-announce-card__title">{a.title}</h3>
              <p className="lms-announce-card__text">{a.body}</p>
              <span className="lms-announce-card__author">— {a.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  COMMUNITY
   ═══════════════════════════════════════════════════════════════ */

const threads = [
  { title: 'Share your SAMR-level lesson plan — what level did you reach?', replies: 18, views: 142, author: 'A. Navarro', avatar: 'AN', tag: 'Lesson Plans', time: '2h ago', pinned: true },
  { title: 'Best free digital tools for virtual classroom management?', replies: 12, views: 84, author: 'J. Reyes', avatar: 'JR', tag: 'Digital Tools', time: '4h ago', pinned: false },
  { title: 'How do you handle students without internet access in your school?', replies: 9, views: 67, author: 'M. Dela Cruz', avatar: 'MD', tag: 'Digital Disparity', time: '6h ago', pinned: false },
  { title: 'Tips for recording your micro-teaching demo — what setup works?', replies: 15, views: 98, author: 'K. Santos', avatar: 'KS', tag: 'E-Portfolio', time: '1d ago', pinned: false },
  { title: 'Canva vs. PowerPoint for instructional material — which do you prefer?', replies: 22, views: 156, author: 'L. Bautista', avatar: 'LB', tag: 'Content Creation', time: '1d ago', pinned: false },
  { title: 'Module 1 reflection: What surprised you about your diagnostic results?', replies: 11, views: 73, author: 'R. Gonzales', avatar: 'RG', tag: 'Reflection', time: '2d ago', pinned: false },
];

const isHotThread = (t) => t.replies >= 15 || t.views >= 100;

function CommunityView() {
  const totalMembers = 48;
  const activeToday = 12;

  return (
    <div className="lms-view">
      <Breadcrumb page="community" />

      <div className="lms-page-hero lms-page-hero--community">
        <div className="lms-page-hero__icon-wrap"><BsPeopleFill /></div>
        <div className="lms-page-hero__text">
          <h1 className="lms-page-hero__title">Community</h1>
          <p className="lms-page-hero__subtitle">Connect, share experiences, and learn from fellow pre-service teachers and mentors.</p>
        </div>
        <div className="lms-page-hero__stat-chips">
          <span className="lms-hero-chip">{totalMembers} members</span>
          <span className="lms-hero-chip lms-hero-chip--online">{activeToday} online</span>
        </div>
      </div>

      <div className="lms-community-bar">
        <button className="lms-btn">+ New Discussion</button>
        <div className="lms-community-tabs">
          <button className="lms-community-tab lms-community-tab--active">All Threads</button>
          <button className="lms-community-tab">Hot Topics</button>
          <button className="lms-community-tab">My Posts</button>
        </div>
        <div className="lms-community-search">
          <BsSearch className="lms-community-search__icon" />
          <input type="text" placeholder="Search discussions..." className="lms-community-search__input" />
        </div>
      </div>

      <div className="lms-threads-list">
        {threads.map((t, i) => (
          <div className={`lms-thread${t.pinned ? ' lms-thread--pinned' : ''}`} key={i} style={{ '--i': i }}>
            <div className="lms-thread__avatar">{t.avatar}</div>
            <div className="lms-thread__body">
              <div className="lms-thread__top">
                {t.pinned && <span className="lms-thread__pin"><BsPinAngle /> Pinned</span>}
                {isHotThread(t) && <span className="lms-thread__hot"><BsFire /> Hot</span>}
                <span className="lms-thread__tag">{t.tag}</span>
              </div>
              <h4 className="lms-thread__title">{t.title}</h4>
              <div className="lms-thread__meta">
                <span className="lms-thread__author">{t.author}</span>
                <span className="lms-thread__sep">&middot;</span>
                <span><BsChatDotsFill /> {t.replies}</span>
                <span className="lms-thread__sep">&middot;</span>
                <span><BsEye /> {t.views}</span>
                <span className="lms-thread__sep">&middot;</span>
                <span>{t.time}</span>
              </div>
            </div>
            <BsArrowRight className="lms-thread__arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   ██  ROOT EXPORT
   ═══════════════════════════════════════════════════════════════ */

const views = {
  activities: ActivitiesView, calendar: CalendarView, modules: ModulesView,
  resources: ResourcesView, assist: AssistView, progress: ProgressView,
  announcements: AnnouncementsView, community: CommunityView,
};

const LMSPage = ({ page }) => {
  const View = views[page];
  const containerRef = useRef(null);

  /* Scroll to top on page change */
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
