require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const {
  Facilitator, Stats, Phase, Objective, Outcome, Challenge, ChallengeSolution,
  Reference, Activity, CalendarEvent, Module, Resource, FAQ, Badge, Announcement, Thread,
} = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
let dbConnected = false;
connectDB().then(() => {
  dbConnected = true;
  console.log('Database connected');
  seedData();
}).catch(err => {
  console.error('Failed to connect to database:', err);
});

// Seed initial data if database is empty
async function seedData() {
  try {
    // Check if data already exists
    const facilitatorCount = await Facilitator.countDocuments();
    if (facilitatorCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    // Seed Facilitators
    const facilitators = [
      { name: 'Hershey Nicolle N. Tabanao', role: 'Program Facilitator', description: 'Advocating for the UM DigiTeach Hub to empower pre-service teachers with essential digital skills, innovative teaching strategies, and confidence to thrive in modern learning environments.', image: '/assets/Hershey Image Icon.png' },
      { name: 'Shuvy Miles C. Espiritouso', role: 'Program Facilitator', description: 'Committed to strengthening future educators through hands-on training in instructional design, digital content creation, and effective virtual classroom management.', image: '/assets/Shuvy Image Icon.png' },
      { name: 'John Louise Clark A. Panes', role: 'Program Facilitator', description: 'Supporting a forward-thinking program that prepares pre-service teachers to deliver engaging, student-centered, and technology-enhanced lessons for 21st-century education.', image: '/assets/John Image Icon.png' },
      { name: 'Donna Faye Casakit', role: 'Program Facilitator', description: 'Supports the development of engaging blended learning experiences and practical digital resources for students.', avatarColor: '#9b59b6' },
      { name: 'Richard Jr. A. Layar', role: 'Program Facilitator', description: 'Focuses on digital content design and assessment workflows to ensure quality learning outcomes.', avatarColor: '#e67e22' },
      { name: 'Reyshil Manibad', role: 'Program Facilitator', description: 'Leads interactive modules and supports students in applying digital literacy skills.', avatarColor: '#2ecc71' },
      { name: 'Ruvie Ann C. Alba', role: 'Program Facilitator', description: 'Passionate about bridging the digital gap in education by guiding pre-service teachers in developing technology-enhanced instructional materials aligned with 21st-century competency standards.', avatarColor: '#e91e8c' },
    ];
    await Facilitator.insertMany(facilitators);
    console.log(`Seeded ${facilitators.length} facilitators`);

    // Seed Stats
    const stats = [
      { label: 'Week Intensive Program', value: '6', icon: 'BsMortarboard' },
      { label: 'Grade Student', value: '8th', icon: 'BsPeopleFill' },
      { label: 'Structured Lessons', value: '4', icon: 'BsLaptop' },
      { label: 'Hands-On Training', value: '100%', icon: 'BsAward' },
    ];
    await Stats.insertMany(stats);
    console.log(`Seeded ${stats.length} stats`);

    // Seed Phases
    const phases = [
      { week: 'Lesson 1', title: 'Diagnostic Assessment & Strategic Orientation', icon: 'BsSearch', description: 'Comprehensive needs assessment aligned with CHED ICT Competency Standards to identify participants\u2019 strengths and areas for improvement. Results guide individualized learning plans.', output: 'Individualized Learning Plan', color: '#3498db', order: 1 },
      { week: 'Lesson 2', title: 'Intensive Workshops & Digital Content Creation', icon: 'BsTools', description: 'Hands-on workshops transforming existing lesson plans into interactive, technology-integrated formats for online and face-to-face instruction. Focus on multimedia tools, online platforms, and assessment strategies.', output: 'Interactive Lesson Modules', color: '#e67e22', order: 2 },
      { week: 'Lesson 3', title: 'Digital Interactive Module — Main Idea & Supporting Details', icon: 'BsPersonWorkspace', description: 'Integrate a digital interactive module focused on identifying the main idea and supporting details. Students complete activities that strengthen reading comprehension through multimedia and interactive checks for understanding.', output: 'Digital Interactive Module (Main Idea & Supporting Details)', color: '#2ecc71', order: 3 },
      { week: 'Lesson 4', title: 'Readiness Showcase & E-Portfolio Finalization', icon: 'BsJournalBookmark', description: 'Development of a professional E-Portfolio compiling best digital lesson plans, instructional materials, and recorded demo teaching sessions as proof of teaching readiness.', output: 'Professional Digital Portfolio', color: '#9b59b6', order: 4 },
    ];
    await Phase.insertMany(phases);
    console.log(`Seeded ${phases.length} phases`);

    // Seed Objectives
    const objectives = [
      { icon: 'BsGear', title: 'Develop & Implement', text: 'Provide structured, hands-on training in online teaching strategies, digital content creation, and LMS utilization for pre-service teachers.', order: 1 },
      { icon: 'BsGraphUpArrow', title: 'Measure Competence', text: 'Determine digital teaching competence before and after participation through validated assessments, performance-based outputs, and practicum evaluations.', order: 2 },
      { icon: 'BsClipboard2Check', title: 'Align with Standards', text: 'Ensure alignment with CHED digital learning competencies and UM CTE institutional outcomes in preparing 21st-century educators.', order: 3 },
    ];
    await Objective.insertMany(objectives);
    console.log(`Seeded ${objectives.length} objectives`);

    // Seed Outcomes
    const outcomes = [
      { text: 'Centralized hub for blended learning', order: 1 },
      { text: 'Efficient teaching and lesson delivery', order: 2 },
      { text: 'Greater student engagement in online activities', order: 3 },
      { text: 'Easy access to modules and resources anytime', order: 4 },
      { text: 'Streamlined assessment and feedback process', order: 5 },
      { text: 'Improved digital literacy for teachers and students', order: 6 },
    ];
    await Outcome.insertMany(outcomes);
    console.log(`Seeded ${outcomes.length} outcomes`);

    // Seed Challenges
    const challenges = [
      { icon: 'BsExclamationTriangle', challenge: 'Digital Disparity', impact: 'Uneven access to hardware', mitigation: 'Extended on-campus laboratory hours', color: '#e74c3c', order: 1 },
      { icon: 'BsExclamationTriangle', challenge: 'Summer Fatigue', impact: 'Potential drop in engagement', mitigation: 'Gamified workshops & regular check-in sessions', color: '#f39c12', order: 2 },
      { icon: 'BsShieldCheck', challenge: 'Internet Instability', impact: 'Interrupted online activities', mitigation: 'Offline-capable tools & pre-loaded OERs', color: '#27ae60', order: 3 },
    ];
    await Challenge.insertMany(challenges);
    console.log(`Seeded ${challenges.length} challenges`);

    // Seed Challenge Solutions (for LMS)
    const challengeSolutions = [
      { icon: 'BsLaptop', challenge: 'Digital Disparity', impact: 'Uneven access to hardware and devices', solution: 'Extended on-campus laboratory hours with pre-loaded resources', details: 'DigiTeach Hub provides extended lab access (8 AM – 8 PM) during the 6-week program. All workshop materials, OERs, and tool guides are pre-downloaded and available on campus machines.', color: '#3498db', order: 1 },
      { icon: 'BsEmojiSmile', challenge: 'Summer Fatigue', impact: 'Potential drop in engagement during summer', solution: 'Gamified workshops, badges & regular check-in sessions', details: 'Earn badges and points for every completed activity. Weekly facilitator check-ins keep you motivated. Activities are designed as interactive, game-based challenges rather than traditional lectures.', color: '#e67e22', order: 2 },
      { icon: 'BsWifi', challenge: 'Internet Instability', impact: 'Interrupted online activities', solution: 'Offline-capable tools & pre-loaded Open Educational Resources', details: 'All core resources are available for offline download. Workshop slides, templates, and tool guides work without internet. Canva offline mode and downloadable Kahoot packs are provided.', color: '#2ecc71', order: 3 },
    ];
    await ChallengeSolution.insertMany(challengeSolutions);
    console.log(`Seeded ${challengeSolutions.length} challenge solutions`);

    // Seed References
    const references = [
      { text: 'Belda, J. R., et al. (2025). Bridging the digital gap: An analysis of perceived vs. actual ICT competence among Filipino pre-service teachers. Journal of Interactive Learning Research, 36(1), 45–62.', order: 1 },
      { text: 'Commission on Higher Education (CHED). (2022). CHED Memorandum Order on the implementation of flexible learning in higher education institutions.', order: 2 },
      { text: 'UNESCO. (2023). ICT Competency Framework for Teachers. Retrieved from https://en.unesco.org/themes/ict-education', order: 3 },
    ];
    await Reference.insertMany(references);
    console.log(`Seeded ${references.length} references`);

    // Seed Activities
    const activities = [
      { phase: 1, phaseLabel: 'Lesson 1 — Diagnostic', phaseColor: '#3498db', status: 'completed', title: 'CHED ICT Competency Self-Assessment', description: 'Complete the diagnostic assessment aligned with CHED ICT Competency Standards to identify your strengths and areas for improvement in digital teaching.', dueDate: 'Feb 20, 2026', points: 20, type: 'Assessment', order: 1 },
      { phase: 1, phaseLabel: 'Lesson 1 — Diagnostic', phaseColor: '#3498db', status: 'completed', title: 'Individualized Learning Plan (ILP)', description: 'Based on your diagnostic results, draft your personalized Individualized Learning Plan outlining target competencies, preferred tools, and learning goals.', dueDate: 'Feb 24, 2026', points: 25, type: 'Output', order: 2 },
      { phase: 2, phaseLabel: 'Lesson 2 — Workshops', phaseColor: '#e67e22', status: 'in-progress', title: 'Transform a Traditional Lesson Plan into a Digital Module', description: 'Select one of your traditional lesson plans and transform it into an interactive, technology-integrated format using the SAMR model.', dueDate: 'Mar 10, 2026', points: 45, type: 'Workshop Output', order: 3 },
      { phase: 2, phaseLabel: 'Lesson 2 — Workshops', phaseColor: '#e67e22', status: 'in-progress', title: 'Digital Tool Exploration & Reflection', description: 'Explore three digital teaching tools (Canva, Padlet, Kahoot!) and submit a structured reflection comparing their pedagogical affordances.', dueDate: 'Mar 14, 2026', points: 30, type: 'Reflection', order: 4 },
      { phase: 3, phaseLabel: 'Lesson 3 — Mentorship', phaseColor: '#2ecc71', status: 'not-started', title: 'Peer Review of Digital Lesson Materials', description: 'Exchange your digital lesson modules with a peer. Complete the structured Peer Review Rubric providing constructive feedback.', dueDate: 'Mar 22, 2026', points: 30, type: 'Peer Review', order: 5 },
      { phase: 3, phaseLabel: 'Lesson 3 — Mentorship', phaseColor: '#2ecc71', status: 'not-started', title: 'Mentor Consultation & Revision Log', description: 'Meet with your assigned faculty mentor. Document the feedback received, revisions made, and how your digital materials now meet professional standards.', dueDate: 'Mar 25, 2026', points: 25, type: 'Mentorship Log', order: 6 },
      { phase: 4, phaseLabel: 'Lesson 4 — Showcase', phaseColor: '#9b59b6', status: 'not-started', title: 'Micro-Teaching Demo Recording', description: 'Record a 10-minute micro-teaching demonstration integrating at least two digital tools for your professional E-Portfolio.', dueDate: 'Mar 30, 2026', points: 50, type: 'Performance', order: 7 },
      { phase: 4, phaseLabel: 'Lesson 4 — Showcase', phaseColor: '#9b59b6', status: 'not-started', title: 'Professional E-Portfolio Submission', description: 'Compile and finalize your E-Portfolio containing your best digital lesson plans, instructional materials, and reflective documentation.', dueDate: 'Apr 3, 2026', points: 60, type: 'Capstone Output', order: 8 },
    ];
    await Activity.insertMany(activities);
    console.log(`Seeded ${activities.length} activities`);

    // Seed Calendar Events
    const calendarEvents = [
      { day: 2, month: 3, year: 2026, title: 'Program Orientation & DigiTeach Hub Onboarding', type: 'event', phase: 1 },
      { day: 3, month: 3, year: 2026, title: 'CHED ICT Competency Diagnostic Assessment', type: 'deadline', phase: 1 },
      { day: 5, month: 3, year: 2026, title: 'Individualized Learning Plan Workshop', type: 'event', phase: 1 },
      { day: 6, month: 3, year: 2026, title: 'ILP Submission Deadline', type: 'deadline', phase: 1 },
      { day: 9, month: 3, year: 2026, title: 'Workshop: SAMR Model & Lesson Plan Transformation', type: 'event', phase: 2 },
      { day: 10, month: 3, year: 2026, title: 'Digital Lesson Plan Draft Due', type: 'deadline', phase: 2 },
      { day: 12, month: 3, year: 2026, title: 'Workshop: Digital Content Creation with Canva', type: 'event', phase: 2 },
      { day: 14, month: 3, year: 2026, title: 'Digital Tool Reflection Due', type: 'deadline', phase: 2 },
      { day: 22, month: 3, year: 2026, title: 'Peer Review Exchange Begins', type: 'task', phase: 3 },
      { day: 25, month: 3, year: 2026, title: 'Mentor Consultation Sessions Open', type: 'event', phase: 3 },
      { day: 30, month: 3, year: 2026, title: 'Micro-Teaching Demo Upload', type: 'deadline', phase: 4 },
    ];
    await CalendarEvent.insertMany(calendarEvents);
    console.log(`Seeded ${calendarEvents.length} calendar events`);

    // Seed Modules
    const modules = [
      { moduleNumber: 1, phase: 'Lesson 1', week: 'Week 1', title: 'Diagnostic Assessment & Strategic Orientation', description: 'Comprehensive needs assessment aligned with CHED ICT Competency Standards. Identify your strengths and areas for improvement, then create your Individualized Learning Plan.', icon: 'BsSearch', color: '#3498db', duration: '~6 hours', lessons: ['CHED ICT Competency Self-Assessment', 'Individualized Learning Plan Development'], output: 'Individualized Learning Plan', progress: 100, unlocked: true, order: 1 },
      { moduleNumber: 2, phase: 'Lesson 2', week: 'Weeks 2–3', title: 'Intensive Workshops & Digital Content Creation', description: 'Hands-on workshops transforming existing lesson plans into interactive, technology-integrated formats for online and face-to-face instruction. Focus on multimedia tools, online platforms, and assessment strategies.', icon: 'BsTools', color: '#e67e22', duration: '~14 hours', lessons: ['SAMR Model & Lesson Transformation', 'Digital Tool Training (Canva, Padlet, Kahoot)', 'Assessment Design for Digital Learning'], output: 'Interactive Lesson Modules', progress: 50, unlocked: true, order: 2 },
      { moduleNumber: 3, phase: 'Lesson 3', week: 'Weeks 4–5', title: 'Mentorship & Collaborative Refinement', description: 'Peer review and faculty mentorship to refine your digital materials. Receive feedback and document revisions based on professional standards.', icon: 'BsPersonWorkspace', color: '#2ecc71', duration: '~10 hours', lessons: ['Peer Review Workshop', 'Mentor Consultation', 'Revision & Documentation'], output: 'Digital Interactive Module (Main Idea & Supporting Details)', progress: 0, unlocked: false, order: 3 },
      { moduleNumber: 4, phase: 'Lesson 4', week: 'Week 6', title: 'Readiness Showcase & E-Portfolio Finalization', description: 'Capstone module: compile your professional E-Portfolio with demo teaching recordings and reflective documentation as proof of digital teaching readiness.', icon: 'BsJournalBookmark', color: '#9b59b6', duration: '~10 hours', lessons: ['E-Portfolio Design & Structure', 'Recording Your Micro-Teaching Demo', 'Compiling Evidence of Digital Competence', 'Reflective Documentation Writing', 'Readiness Showcase Presentation Prep'], output: 'Professional Digital Portfolio', progress: 0, unlocked: false, order: 4 },
    ];
    await Module.insertMany(modules);
    console.log(`Seeded ${modules.length} modules`);

    // Seed Resources (limited sample)
    const resources = [
      { icon: 'BsYoutube', type: 'Video', title: 'Introduction to the SAMR Model — From Theory to Practice', author: 'Ruben Puentedura', tag: 'ICT Integration', color: '#e03131', phase: 2, order: 1 },
      { icon: 'BsYoutube', type: 'Video', title: 'Using Padlet for Collaborative Classroom Activities', author: 'Padlet Edu', tag: 'Collaboration', color: '#e03131', phase: 2, order: 2 },
      { icon: 'BsTools', type: 'Tool Guide', title: 'Canva for Education — Complete Getting Started Guide', author: 'Canva Team', tag: 'Content Creation', color: '#5c5f66', phase: 2, order: 3 },
      { icon: 'BsFileText', type: 'Template', title: 'ICT-Enhanced Lesson Plan Template (SAMR-Aligned)', author: 'DigiTeach Hub', tag: 'Lesson Planning', color: '#2f9e44', phase: 2, order: 4 },
    ];
    await Resource.insertMany(resources);
    console.log(`Seeded ${resources.length} resources`);

    // Seed FAQs
    const faqs = [
      { question: 'What is the DigiTeach Hub program?', answer: 'The UM DigiTeach Hub is a 6-week intensive program designed to equip pre-service teachers with essential digital teaching competencies, practical skills in lesson design, content creation, and LMS utilization.', category: 'general', order: 1 },
      { question: 'What is the E-Portfolio and why is it important?', answer: 'Your E-Portfolio is the capstone output — it compiles your best digital lesson plans, instructional materials, micro-teaching recording, and reflective documentation as professional proof of your digital teaching readiness for your 4th-year internship.', category: 'general', order: 2 },
      { question: 'How do I access resources offline?', answer: 'Go to Resources and look for items tagged "Offline Access" or "OER". These can be downloaded directly. On campus, all materials are also available on lab computers without internet.', category: 'technical', order: 3 },
    ];
    await FAQ.insertMany(faqs);
    console.log(`Seeded ${faqs.length} FAQs`);

    // Seed Badges
    const badges = [
      { icon: 'BsCheckLg', label: 'First Step', description: 'Completed the diagnostic assessment', earned: true, order: 1 },
      { icon: 'BsStarFill', label: 'Digital Explorer', description: 'Explored 3 digital teaching tools', earned: true, order: 2 },
      { icon: 'BsBookHalf', label: 'Lesson Designer', description: 'Submitted an ICT-enhanced lesson plan', earned: false, order: 3 },
      { icon: 'BsPeopleFill', label: 'Peer Mentor', description: 'Completed a peer review exchange', earned: false, order: 4 },
      { icon: 'BsCameraVideo', label: 'Demo Teacher', description: 'Uploaded a micro-teaching recording', earned: false, order: 5 },
      { icon: 'BsJournalBookmark', label: 'Portfolio Ready', description: 'Submitted your professional E-Portfolio', earned: false, order: 6 },
      { icon: 'BsTrophy', label: 'DigiTeach Graduate', description: 'Completed all 4 lessons', earned: false, order: 7 },
      { icon: 'BsLightbulb', label: 'Innovator', description: 'Achieved Redefinition level on SAMR', earned: false, order: 8 },
    ];
    await Badge.insertMany(badges);
    console.log(`Seeded ${badges.length} badges`);

    // Seed Announcements
    const announcements = [
      { date: 'Mar 5, 2026', title: 'Lesson 2 Workshops Have Begun!', body: 'Intensive Workshops & Digital Content Creation (Weeks 2–3) are now underway. Your first workshop on the SAMR Model and Lesson Plan Transformation is scheduled for March 9. Make sure your Lesson 1 outputs are already submitted.', author: 'DigiTeach Hub Team', urgent: true, phase: 2, read: false, order: 1 },
      { date: 'Mar 3, 2026', title: 'Reminder: Extended Lab Hours Available', body: 'If you\'re experiencing device or internet access challenges, remember that on-campus computer labs are available with extended hours (8 AM – 8 PM) throughout the program. All workshop materials and OERs are pre-loaded.', author: 'UM CTE Admin', urgent: true, phase: 0, read: false, order: 2 },
    ];
    await Announcement.insertMany(announcements);
    console.log(`Seeded ${announcements.length} announcements`);

    // Seed Threads (Community)
    const threads = [
      { title: 'Tips for recording your micro-teaching demo — what setup works?', replies: 15, views: 98, author: 'K. Santos', avatar: 'KS', tag: 'E-Portfolio', timeAgo: '1d ago', pinned: false, order: 1 },
      { title: 'Canva vs. PowerPoint for instructional material — which do you prefer?', replies: 22, views: 156, author: 'L. Bautista', avatar: 'LB', tag: 'Content Creation', timeAgo: '1d ago', pinned: false, order: 2 },
      { title: 'Module 1 reflection: What surprised you about your diagnostic results?', replies: 11, views: 73, author: 'R. Gonzales', avatar: 'RG', tag: 'Reflection', timeAgo: '2d ago', pinned: false, order: 3 },
    ];
    await Thread.insertMany(threads);
    console.log(`Seeded ${threads.length} threads`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', dbConnected });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
