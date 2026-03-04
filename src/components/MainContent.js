import React, { useRef } from 'react';
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

/* ── Data ── */
const facilitators = [
  {
    name: 'Hershey Nicolle N. Tabanao',
    role: 'Program Facilitator',
    description:
      'Advocating for the UM DigiTeach Hub to empower pre-service teachers with essential digital skills, innovative teaching strategies, and confidence to thrive in modern learning environments.',
    image: hersheyImg,
  },
  {
    name: 'Shuvy Miles C. Espiritouso',
    role: 'Program Facilitator',
    description:
      'Committed to strengthening future educators through hands-on training in instructional design, digital content creation, and effective virtual classroom management.',
    image: shuvyImg,
  },
  {
    name: 'John Louise Clark A. Panes',
    role: 'Program Facilitator',
    description:
      'Supporting a forward-thinking program that prepares pre-service teachers to deliver engaging, student-centered, and technology-enhanced lessons for 21st-century education.',
    image: johnImg,
  },
  {
    name: 'Glyza Sheene D. Lapaz',
    role: 'Program Facilitator',
    description:
      'Dedicated to equipping future teachers with the digital literacy and pedagogical tools needed to design transformative learning experiences in both physical and virtual classrooms.',
    avatarColor: '#9b59b6',
  },
  {
    name: 'Ruvie Ann C. Alba',
    role: 'Program Facilitator',
    description:
      'Passionate about bridging the digital gap in education by guiding pre-service teachers in developing technology-enhanced instructional materials aligned with 21st-century competency standards.',
    avatarColor: '#e91e8c',
  },
];

const stats = [
  { icon: <BsMortarboard />, value: '6', label: 'Week Intensive Program' },
  { icon: <BsPeopleFill />, value: '3rd Yr', label: 'Pre-Service Teachers' },
  { icon: <BsLaptop />, value: '4', label: 'Structured Phases' },
  { icon: <BsAward />, value: '100%', label: 'Hands-On Training' },
];

const phases = [
  {
    week: 'Week 1',
    title: 'Diagnostic Assessment & Strategic Orientation',
    icon: <BsSearch />,
    desc: 'Comprehensive needs assessment aligned with CHED ICT Competency Standards to identify participants\u2019 strengths and areas for improvement. Results guide individualized learning plans.',
    output: 'Individualized Learning Plan',
    color: '#3498db',
  },
  {
    week: 'Weeks 2\u20133',
    title: 'Intensive Workshops & Digital Content Creation',
    icon: <BsTools />,
    desc: 'Hands-on workshops transforming existing lesson plans into interactive, technology-integrated formats for online and face-to-face instruction. Focus on multimedia tools, online platforms, and assessment strategies.',
    output: 'Interactive Lesson Modules',
    color: '#e67e22',
  },
  {
    week: 'Weeks 4\u20135',
    title: 'Mentorship, Monitoring & Formative Evaluation',
    icon: <BsPersonWorkspace />,
    desc: 'Structured mentorship with faculty mentors providing constructive guidance ensuring digital instructional materials meet professional standards. Continuous feedback for meaningful technology integration.',
    output: 'Peer/Mentor-Reviewed Materials',
    color: '#2ecc71',
  },
  {
    week: 'Week 6',
    title: 'Readiness Showcase & E-Portfolio Finalization',
    icon: <BsJournalBookmark />,
    desc: 'Development of a professional E-Portfolio compiling best digital lesson plans, instructional materials, and recorded demo teaching sessions as proof of teaching readiness.',
    output: 'Professional Digital Portfolio',
    color: '#9b59b6',
  },
];

const objectives = [
  {
    icon: <BsGear />,
    title: 'Develop & Implement',
    text: 'Provide structured, hands-on training in online teaching strategies, digital content creation, and LMS utilization for pre-service teachers.',
  },
  {
    icon: <BsGraphUpArrow />,
    title: 'Measure Competence',
    text: 'Determine digital teaching competence before and after participation through validated assessments, performance-based outputs, and practicum evaluations.',
  },
  {
    icon: <BsClipboard2Check />,
    title: 'Align with Standards',
    text: 'Ensure alignment with CHED digital learning competencies and UM CTE institutional outcomes in preparing 21st-century educators.',
  },
];

const outcomes = [
  'Stronger skills in designing technology-integrated lesson plans and utilizing learning management systems.',
  'Measurable improvements in digital pedagogical competencies through pre- and post-assessments.',
  'Ability to design interactive learning modules and apply appropriate digital tools for instruction.',
  'Professional digital teaching portfolios with instructional materials, demo recordings, and reflective documentation.',
  'Enhanced readiness for the fourth-year internship and future professional teaching roles.',
  'Pre-service teachers better equipped to meet the demands of 21st-century classrooms.',
];

const challenges = [
  {
    icon: <BsExclamationTriangle />,
    challenge: 'Digital Disparity',
    impact: 'Uneven access to hardware',
    mitigation: 'Extended on-campus laboratory hours',
  },
  {
    icon: <BsExclamationTriangle />,
    challenge: 'Summer Fatigue',
    impact: 'Potential drop in engagement',
    mitigation: 'Gamified workshops & regular check-in sessions',
  },
  {
    icon: <BsShieldCheck />,
    challenge: 'Internet Instability',
    impact: 'Interrupted online activities',
    mitigation: 'Offline-capable tools & pre-loaded OERs',
  },
];

const references = [
  'Belda, J. R., et al. (2025). Bridging the digital gap: An analysis of perceived vs. actual ICT competence among Filipino pre-service teachers. Journal of Interactive Learning Research, 36(1), 45\u201362.',
  'Commission on Higher Education (CHED). (2022). CHED Memorandum Order on the implementation of flexible learning in higher education institutions.',
  'Department of Education (DepEd). (2025). Quality Basic Education Development Plan (Q-BEDP) 2025\u20132035.',
  'Department of Education (DepEd). (2026). National report on digital disparity and infrastructure challenges in remote learning.',
  'RSIS International. (2026). Digital professional identity: The role of e-portfolios in teacher education programs in Southeast Asia. IJRISS, 10(2), 112\u2013128.',
  'Valdez, P. N., et al. (2021). Digital pedagogy and student-centered online lessons. Philippine Journal of Science and Education, 4(3), 88\u2013104.',
];

/* ── Component ── */
const MainContent = () => {
  const facilitatorsRef = useRef(null);

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
            A six-week intensive summer training program empowering pre-service
            teachers with digital skills, innovative strategies, and confidence
            for effective 21st-century teaching.
          </p>
          <div className="hero__actions">
            <a href="#phases" className="hero__btn hero__btn--primary">
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

          <div className="rationale__grid">
            <div className="rationale__card">
              <div className="rationale__card-num">01</div>
              <h3>The Digital Gap</h3>
              <p>
                The COVID-19 pandemic highlighted the urgent need for effective online
                teaching strategies. Even six years later, UM CTE still faces challenges
                in fully integrating digital teaching methods. Many pre-service teachers
                are not yet fully confident in designing online lessons, managing virtual
                classrooms, and using digital tools to engage students effectively.
              </p>
            </div>
            <div className="rationale__card">
              <div className="rationale__card-num">02</div>
              <h3>Teacher Readiness Crisis</h3>
              <p>
                Research shows that teacher readiness is a critical factor in online
                learning success. Despite many Philippine HEIs adopting online learning,
                less than half of pre-service teachers feel confident using digital tools
                effectively (CHED, 2022). This gap affects instruction quality and limits
                student learning experiences.
              </p>
            </div>
            <div className="rationale__card">
              <div className="rationale__card-num">03</div>
              <h3>A Targeted Intervention</h3>
              <p>
                Teachers proficient in digital pedagogy are more capable of delivering
                interactive and student-centered online lessons (Valdez et al., 2021).
                The UM DigiTeach Hub provides hands-on training in online teaching
                strategies, digital content creation, and effective use of learning
                management systems.
              </p>
            </div>
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

      {/* ═══════ IMPLEMENTATION PHASES ═══════ */}
      <section className="section section--white" id="phases">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__badge">Implementation Plan</span>
            <h2 className="section-header__title">Program Phases</h2>
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
            <h2 className="section-header__title">Expected Outcomes</h2>
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
              <h3>Four-Phase Framework</h3>
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
              The UM DigiTeach Hub welcomes third-year pre-service teachers from
              the University of Mindanao College of Teacher Education. Participation
              is voluntary and offers a Certificate of Completion with digital
              competency credentials.
            </p>
          </div>

          <div className="contact__cards">
            <div className="contact__card">
              <BsMortarboard className="contact__card-icon" />
              <h3>For Students</h3>
              <p>Enroll during the summer transition between 3rd and 4th year. Morning and afternoon sessions available (4 hours each).</p>
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
              <a href="#phases">Phases</a>
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
