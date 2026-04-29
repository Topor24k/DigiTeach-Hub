import React, { useRef, useState, useEffect } from 'react';
import {
  BsLaptop,
  BsPeopleFill,
  BsLightbulb,
  BsBarChartLine,
  BsArrowRight,
  BsClipboard2Check,
  BsGear,
  BsMortarboard,
  BsGraphUpArrow,
  BsSearch,
  BsTools,
  BsPersonWorkspace,
  BsJournalBookmark,
  BsAward,
  BsCheckCircle,
  BsExclamationTriangle,
  BsShieldCheck,
  BsBookHalf,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import ProfileCard from './ProfileCard';
import dhLogo from '../assets/DH logo.png';
import hersheyImg from '../assets/Hershey Image Icon.png';
import shuvyImg from '../assets/Shuvy Image Icon.png';
import johnImg from '../assets/John Image Icon.png';
import './MainContent.css';
import {
  getFacilitators, getStats, getPhases, getObjectives, getOutcomes, getChallenges, getReferences
} from '../utils/api';

// Icon mapping for database icons stored as strings
const iconMap = {
  'BsSearch': <BsSearch />,
  'BsTools': <BsTools />,
  'BsPersonWorkspace': <BsPersonWorkspace />,
  'BsJournalBookmark': <BsJournalBookmark />,
  'BsGear': <BsGear />,
  'BsGraphUpArrow': <BsGraphUpArrow />,
  'BsClipboard2Check': <BsClipboard2Check />,
  'BsExclamationTriangle': <BsExclamationTriangle />,
  'BsShieldCheck': <BsShieldCheck />,
  'BsMortarboard': <BsMortarboard />,
  'BsPeopleFill': <BsPeopleFill />,
  'BsLaptop': <BsLaptop />,
  'BsAward': <BsAward />,
  'BsLightbulb': <BsLightbulb />,
  'BsBarChartLine': <BsBarChartLine />,
  'BsBookHalf': <BsBookHalf />,
  'BsPersonWorkspace': <BsPersonWorkspace />,
};

/* ── Component ── */
const MainContent = () => {
  const facilitatorsRef = useRef(null);
  
  // State for API data
  const [facilitators, setFacilitators] = useState([]);
  const [stats, setStats] = useState([]);
  const [phases, setPhases] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          facilitatorsData, statsData, phasesData, objectivesData, outcomesData, challengesData, referencesData
        ] = await Promise.all([
          getFacilitators(),
          getStats(),
          getPhases(),
          getObjectives(),
          getOutcomes(),
          getChallenges(),
          getReferences()
        ]);

        // Map image paths for facilitators
        setFacilitators(facilitatorsData.map(f => ({
          ...f,
          image: f.image ? (f.image.startsWith('http') || f.image.startsWith('/') ? f.image : `/assets/${f.image}`) : null
        })));
        
        // Map icons for stats
        setStats(statsData.map(s => ({
          ...s,
          icon: iconMap[s.icon] || <BsMortarboard />
        })));
        
        // Map icons and descs for phases
        setPhases(phasesData.map(p => ({
          ...p,
          icon: iconMap[p.icon] || <BsSearch />,
          desc: p.description || p.desc
        })));
        
        // Map icons for objectives
        setObjectives(objectivesData.map(o => ({
          ...o,
          icon: iconMap[o.icon] || <BsGear />
        })));
        
        // Handle outcomes as text array
        setOutcomes(outcomesData.map(o => o.text || o));
        
        // Map icons for challenges
        setChallenges(challengesData.map(c => ({
          ...c,
          icon: iconMap[c.icon] || <BsExclamationTriangle />
        })));
        
        // Map references as text array
        setReferences(referencesData.map(r => r.text || r));
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
        // Keep existing data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollFacilitators = (dir) => {
    const grid = facilitatorsRef.current;
    if (!grid) return;
    const card = grid.querySelector('.profile-card');
    const cardW = card ? card.offsetWidth + 24 : grid.offsetWidth / 3;
    grid.scrollBy({ left: dir * cardW * 3, behavior: 'smooth' });
  };

  return (
    <div className="main-content">

      {/* ═══════ HERO ═══════ */}
      <section className="hero" id="home">
        <div className="hero__bg">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>

        <div className="hero__content">
          <span className="hero__badge">University of Mindanao &middot; College of Teacher Education</span>
          <h1 className="hero__title">
            UM DigiTeach<br />
            <span className="hero__title-accent">Hub</span>
          </h1>
          <p className="hero__desc">
            Blended learning made simple, engaging, and accessible.
          </p>
          <div className="hero__actions">
            <a href="#lessons" className="hero__btn hero__btn--primary">
              Explore the Program <BsArrowRight />
            </a>
            <a href="#facilitators" className="hero__btn hero__btn--outline">
              Meet Our Facilitators
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-circle">
            <img src={dhLogo} alt="DigiTeach Hub" className="hero__visual-logo" />
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="stats">
        {stats.map((s, i) => (
          <div className="stats__item" key={i}>
            <span className="stats__icon">{s.icon}</span>
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ═══════ RATIONALE ═══════ */}
      <section className="section section--white" id="rationale">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Why This Program?</span>
            <h2 className="section-header__title">Rationale</h2>
            <p className="section-header__subtitle">
              Addressing the critical gap in digital teaching readiness among
              pre-service teachers in the Philippines.
            </p>
          </div>

          <div className="rationale__content">
            <p>
              UM DigiTech Hub was developed as the University of Mindanao’s official platform for blended learning. Its primary purpose is to provide a medium where teachers can design and deliver online activities, and students can access, complete, and submit tasks in a centralized space. By integrating multimedia, interactive tools, and assessment features, the Hub supports flexible teaching and learning, enhances engagement, and ensures that academic activities can continue seamlessly both inside and outside the classroom.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ OBJECTIVES ═══════ */}
      <section className="section section--gray" id="objectives">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Our Goals</span>
            <h2 className="section-header__title">Program Objectives</h2>
            <p className="section-header__subtitle">
              Three core objectives driving the UM DigiTeach Hub&rsquo;s mission
              to transform teacher education.
            </p>
          </div>

          <div className="objectives__grid">
            {objectives.map((obj, i) => (
              <div className="objective-card" key={i}>
                <div className="objective-card__icon">{obj.icon}</div>
                <h3 className="objective-card__title">{obj.title}</h3>
                <p className="objective-card__text">{obj.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ IMPLEMENTATION LESSONS ═══════ */}
      <section className="section section--white" id="lessons">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Implementation Plan</span>
            <h2 className="section-header__title">Lessons</h2>
            <p className="section-header__subtitle">
              A structured 6-week training journey from diagnostic assessment to
              professional portfolio showcase.
            </p>
          </div>

          <div className="phases__timeline">
              {phases.map((phase, i) => (
              <div className="phase-card" key={i}>
                <div className="phase-card__marker" style={{ background: phase.color }}>
                  <span className="phase-card__icon">{phase.icon}</span>
                </div>
                <div className="phase-card__content">
                  <span className="phase-card__week" style={{ color: phase.color }}>
                    {phase.week}
                  </span>
                  <h3 className="phase-card__title">{phase.title}</h3>
                  <p className="phase-card__desc">{phase.desc}</p>
                  <span className="phase-card__output">
                    <BsCheckCircle /> Output: {phase.output}
                  </span>
                </div>
              </div>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════ FACILITATORS ═══════ */}
      <section className="section section--gray" id="facilitators">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Our Team</span>
            <h2 className="section-header__title">Meet our Program Facilitators</h2>
            <p className="section-header__subtitle">
              Dedicated professionals guiding pre-service teachers through
              innovative digital pedagogy and hands-on training at UM CTE.
            </p>
          </div>
          <div className="facilitators__track-wrap">
            <div className="facilitators__grid" ref={facilitatorsRef}>
              {facilitators.map((f, i) => (
                <ProfileCard
                  key={i}
                  name={f.name}
                  role={f.role}
                  description={f.description}
                  avatarColor={f.avatarColor}
                  image={f.image}
                />
              ))}
            </div>
            <div className="facilitators__nav">
              <button
                className="facilitators__nav-btn"
                onClick={() => scrollFacilitators(-1)}
                aria-label="Previous facilitators"
              >
                <BsChevronLeft />
              </button>
              <button
                className="facilitators__nav-btn"
                onClick={() => scrollFacilitators(1)}
                aria-label="Next facilitators"
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EXPECTED OUTCOMES ═══════ */}
      <section className="section section--white" id="outcomes">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Results</span>
            <h2 className="section-header__title">Expected Outcomes:</h2>
            <p className="section-header__subtitle">
              What participants will gain from the UM DigiTeach Hub program.
            </p>
          </div>

          <div className="outcomes__grid">
              {outcomes.map((item, i) => (
              <div className="outcome-card" key={i}>
                <div className="outcome-card__num">{String(i + 1).padStart(2, '0')}</div>
                <p className="outcome-card__text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CHALLENGES ═══════ */}
      <section className="section section--gray" id="challenges">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Preparedness</span>
            <h2 className="section-header__title">Anticipated Challenges &amp; Solutions</h2>
          </div>

          <div className="challenges__grid">
            {challenges.map((c, i) => (
              <div className="challenge-card" key={i}>
                <div className="challenge-card__header">
                  <span className="challenge-card__icon">{c.icon}</span>
                  <h3>{c.challenge}</h3>
                </div>
                <div className="challenge-card__row">
                  <span className="challenge-card__label">Impact:</span>
                  <span>{c.impact}</span>
                </div>
                <div className="challenge-card__row challenge-card__row--solution">
                  <span className="challenge-card__label">Solution:</span>
                  <span>{c.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INNOVATION ═══════ */}
      <section className="section section--accent" id="innovation">
        <div className="section__container">
          <div className="section-header section-header--light">
            <span className="section-header__badge section-header__badge--light">What Makes Us Different</span>
            <h2 className="section-header__title">Highlighting Innovation</h2>
            <p className="section-header__subtitle">
              A pioneering approach integrating competency-based training within the
              critical transition period before teaching internship.
            </p>
          </div>

          <div className="innovation__grid">
            <div className="innovation__card">
              <BsLightbulb className="innovation__card-icon" />
              <h3>Experiential over Theoretical</h3>
              <p>
                Unlike traditional approaches that introduce EdTech through theory,
                our program emphasizes experiential learning through hands-on workshops,
                mentorship, and performance-based outputs.
              </p>
            </div>
            <div className="innovation__card">
              <BsBarChartLine className="innovation__card-icon" />
              <h3>Four-Lesson Framework</h3>
              <p>
                A systematic progression from diagnostic assessment aligned with CHED ICT
                standards, through intensive training, mentorship, and culminating in a
                professional showcase.
              </p>
            </div>
            <div className="innovation__card">
              <BsBookHalf className="innovation__card-icon" />
              <h3>E-Portfolio Assessment</h3>
              <p>
                Performance-based evaluation through professional e-portfolios that compile
                digital lesson plans, instructional materials, and recorded demonstration
                teaching sessions.
              </p>
            </div>
            <div className="innovation__card">
              <BsShieldCheck className="innovation__card-icon" />
              <h3>Standards-Aligned</h3>
              <p>
                Training aligned with CHED digital competency standards and current
                educational demands, supporting development of teachers prepared for
                technology-integrated practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ REFERENCES ═══════ */}
      <section className="section section--white" id="references">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Academic Sources</span>
            <h2 className="section-header__title">References</h2>
          </div>

          <ol className="references__list">
            {references.map((ref, i) => (
              <li className="references__item" key={i}>
                {ref}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="section section--gray" id="contact">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Get in Touch</span>
            <h2 className="section-header__title">Interested in Joining?</h2>
            <p className="section-header__subtitle">
              The UM DigiTeach Hub welcomes 8th Grade Students from the relevant
              schools. Participation is voluntary and offers a Certificate of Completion with digital
              competency credentials.
            </p>
          </div>

          <div className="contact__cards">
            <div className="contact__card">
              <BsMortarboard className="contact__card-icon" />
                <h3>For Students</h3>
                <p>Enrollment details available via your school coordinator. Sessions scheduled as announced.</p>
            </div>
            <div className="contact__card">
              <BsPersonWorkspace className="contact__card-icon" />
              <h3>For Faculty</h3>
              <p>Interested in becoming a mentor or resource speaker? Reach out to the DigiTeach Hub Coordinators at UM CTE.</p>
            </div>
            <div className="contact__card">
              <BsPeopleFill className="contact__card-icon" />
              <h3>For Partners</h3>
              <p>Organizations supporting digital education are welcome to collaborate and help expand the program&rsquo;s reach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="main-footer">
        <div className="main-footer__inner">
          <div className="main-footer__top">
            <div className="main-footer__brand">
              <div className="main-footer__logo">DH</div>
              <div>
                <strong>UM DigiTeach Hub</strong>
                <br />
                <small>University of Mindanao &middot; College of Teacher Education</small>
              </div>
            </div>
            <p className="main-footer__mission">
              Empowering future educators with digital skills and innovative
              strategies for effective 21st-century teaching.
            </p>
          </div>

          <div className="main-footer__nav">
            <div className="main-footer__nav-col">
              <h4>Program</h4>
              <a href="#rationale">Rationale</a>
              <a href="#objectives">Objectives</a>
              <a href="#lessons">Lessons</a>
            </div>
            <div className="main-footer__nav-col">
              <h4>About</h4>
              <a href="#facilitators">Facilitators</a>
              <a href="#outcomes">Outcomes</a>
              <a href="#innovation">Innovation</a>
            </div>
            <div className="main-footer__nav-col">
              <h4>Resources</h4>
              <a href="#references">References</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="main-footer__bottom">
            <p className="main-footer__copy">
              &copy; 2026 UM DigiTeach Hub &middot; University of Mindanao College of Teacher Education. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainContent;
