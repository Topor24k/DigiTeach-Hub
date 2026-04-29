/**
 * MongoDB Seed Script
 * Populates the database with initial data for the DigiTeach Hub application
 */

require('dotenv').config();
const mongoose = require('mongoose');
const {
  Facilitator, Stats, Phase, Objective, Outcome, Challenge, ChallengeSolution,
  Reference, Activity, CalendarEvent, Module, Resource, FAQ, Badge, Announcement, Thread,
} = require('./models');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Facilitator.deleteMany({}),
      Stats.deleteMany({}),
      Phase.deleteMany({}),
      Objective.deleteMany({}),
      Outcome.deleteMany({}),
      Challenge.deleteMany({}),
      ChallengeSolution.deleteMany({}),
      Reference.deleteMany({}),
      Activity.deleteMany({}),
      CalendarEvent.deleteMany({}),
      Module.deleteMany({}),
      Resource.deleteMany({}),
      FAQ.deleteMany({}),
      Badge.deleteMany({}),
      Announcement.deleteMany({}),
      Thread.deleteMany({}),
    ]);
    console.log('✓ Database cleared');

    // Seed Facilitators
    const facilitators = await Facilitator.insertMany([
      { name: 'Dr. Maria Hershey', role: 'Program Director', description: 'ICT Education Specialist', avatarColor: '#3498db' },
      { name: 'Mr. John Doe', role: 'Training Coordinator', description: 'Digital Pedagogy Expert', avatarColor: '#e67e22' },
      { name: 'Ms. Shuvy Johnson', role: 'Mentor Facilitator', description: 'Professional Development Specialist', avatarColor: '#2ecc71' },
    ]);
    console.log('✓ Facilitators seeded');

    // Seed Stats
    await Stats.insertMany([
      { label: 'Pre-service Teachers', value: '48', icon: 'BsMortarboard' },
      { label: 'Training Hours', value: '46', icon: 'BsClock' },
      { label: 'Program Modules', value: '4', icon: 'BsBook' },
      { label: 'Success Rate', value: '95%', icon: 'BsTrophy' },
    ]);
    console.log('✓ Stats seeded');

    // Seed Phases
    await Phase.insertMany([
      {
        week: 'Week 1',
        title: 'Diagnostic Assessment',
        icon: 'BsSearch',
        description: 'Assess current digital competencies',
        output: 'Self-Assessment Report',
        color: '#3498db',
        order: 1,
      },
      {
        week: 'Weeks 2–3',
        title: 'Training Workshops',
        icon: 'BsTools',
        description: 'Intensive digital pedagogy training',
        output: 'Digital Lesson Plans',
        color: '#e67e22',
        order: 2,
      },
      {
        week: 'Weeks 4–5',
        title: 'Mentorship & Practice',
        icon: 'BsPersonWorkspace',
        description: 'Apply skills with mentor guidance',
        output: 'Demonstration Teaching',
        color: '#2ecc71',
        order: 3,
      },
      {
        week: 'Week 6',
        title: 'E-Portfolio Showcase',
        icon: 'BsJournalBookmark',
        description: 'Present professional portfolio',
        output: 'Professional E-Portfolio',
        color: '#9b59b6',
        order: 4,
      },
    ]);
    console.log('✓ Phases seeded');

    // Seed Objectives
    await Objective.insertMany([
      {
        icon: 'BsGear',
        title: 'Competency Development',
        text: 'Build digital teaching competencies aligned with CHED standards.',
        order: 1,
      },
      {
        icon: 'BsGraphUpArrow',
        title: 'Professional Growth',
        text: 'Enhance pedagogical practices through technology integration.',
        order: 2,
      },
      {
        icon: 'BsClipboard2Check',
        title: 'Portfolio Development',
        text: 'Create a comprehensive professional digital portfolio.',
        order: 3,
      },
    ]);
    console.log('✓ Objectives seeded');

    // Seed Outcomes
    await Outcome.insertMany([
      { text: 'Design technology-integrated lesson plans that align with curriculum standards', order: 1 },
      { text: 'Apply student-centered pedagogies using appropriate digital tools', order: 2 },
      { text: 'Create inclusive learning environments leveraging digital resources', order: 3 },
      { text: 'Demonstrate proficiency in instructional design and online assessment', order: 4 },
      { text: 'Develop digital competency aligned with CHED ICT standards', order: 5 },
      { text: 'Produce a professional e-portfolio showcasing digital teaching excellence', order: 6 },
    ]);
    console.log('✓ Outcomes seeded');

    // Seed Challenges
    await Challenge.insertMany([
      {
        icon: 'BsExclamationTriangle',
        challenge: 'Limited tech background',
        impact: 'May hinder adoption',
        mitigation: 'Hands-on training and peer support',
        color: '#e74c3c',
        order: 1,
      },
      {
        icon: 'BsShieldCheck',
        challenge: 'Time constraints',
        impact: 'May affect participation',
        mitigation: 'Flexible schedule and self-paced modules',
        color: '#e74c3c',
        order: 2,
      },
      {
        icon: 'BsLaptop',
        challenge: 'Technical support',
        impact: 'May limit exploration',
        mitigation: 'Live chat support and resource repository',
        color: '#e74c3c',
        order: 3,
      },
    ]);
    console.log('✓ Challenges seeded');

    // Seed Challenge Solutions
    await ChallengeSolution.insertMany([
      {
        icon: 'BsLaptop',
        challenge: 'Limited digital literacy',
        impact: 'May feel overwhelmed by technology',
        solution: 'Structured modules with hands-on practice and peer mentoring',
        details: 'We provide beginner-friendly workshops, step-by-step guides, and one-on-one mentor support throughout the program to ensure everyone succeeds.',
        color: '#3498db',
        order: 1,
      },
      {
        icon: 'BsClock',
        challenge: 'Balancing workload',
        impact: 'May struggle with time management',
        solution: 'Flexible pacing, online access, and asynchronous modules',
        details: 'All materials are available 24/7 online. You can learn at your own pace, review content multiple times, and access resources whenever you need them.',
        color: '#e67e22',
        order: 2,
      },
      {
        icon: 'BsTools',
        challenge: 'Unclear implementation',
        impact: 'May doubt applicability in real classrooms',
        solution: 'Case studies, live demonstrations, and mentorship sessions',
        details: 'See real teachers using these tools in actual classrooms through recorded demos and live mentor sessions. Practice with your own lesson ideas with expert feedback.',
        color: '#2ecc71',
        order: 3,
      },
    ]);
    console.log('✓ Challenge Solutions seeded');

    // Seed References
    await Reference.insertMany([
      { text: 'Commission on Higher Education. (2021). ICT Competency Standards for Academic and Administrative Personnel. CHED Memorandum Order No. 36, Series of 2021.', order: 1 },
      { text: 'Mishra, P., & Koehler, M. J. (2006). Technological Pedagogical Content Knowledge: A Framework for Teacher Knowledge. Teachers College Record, 108(6), 1017-1054.', order: 2 },
      { text: 'Bransford, J. D., Brown, A. L., & Cocking, M. R. (Eds.). (2000). How People Learn: Brain, Mind, Experience, and School. National Academies Press.', order: 3 },
      { text: 'Prensky, M. (2007). Digital Natives, Digital Immigrants. On the Horizon, 9(5), 1-6.', order: 4 },
      { text: 'UNESCO. (2018). Technology and Education: Blended Learning. UNESCO Publishing.', order: 5 },
      { text: 'Koehler, M. J., & Mishra, P. (2009). What is Technological Pedagogical Content Knowledge? Contemporary Issues in Technology and Teacher Education, 9(1), 60-70.', order: 6 },
    ]);
    console.log('✓ References seeded');

    // Seed Activities
    const activities = await Activity.insertMany([
      {
        phase: 1, phaseLabel: 'Lesson 1', phaseColor: '#3498db',
        status: 'completed', title: 'Digital Readiness Survey', description: 'Assess your current digital teaching competencies', dueDate: '2026-03-07',
        points: 10, type: 'Assessment', order: 1,
      },
      {
        phase: 2, phaseLabel: 'Lesson 2', phaseColor: '#e67e22',
        status: 'in-progress', title: 'Design Your First Online Lesson', description: 'Create a basic digital lesson plan using a template', dueDate: '2026-03-12',
        points: 35, type: 'Project', order: 2,
      },
      {
        phase: 2, phaseLabel: 'Lesson 2', phaseColor: '#e67e22',
        status: 'not-started', title: 'Explore LMS Tools', description: 'Navigate and test key LMS features', dueDate: '2026-03-10',
        points: 20, type: 'Exploration', order: 3,
      },
      {
        phase: 3, phaseLabel: 'Lesson 3', phaseColor: '#2ecc71',
        status: 'not-started', title: 'Record a Microlesson', description: 'Create a 5-minute instructional video', dueDate: '2026-03-18',
        points: 40, type: 'Video Project', order: 4,
      },
      {
        phase: 3, phaseLabel: 'Lesson 3', phaseColor: '#2ecc71',
        status: 'not-started', title: 'Reflection Journal (Week 1)', description: 'Reflect on your learning journey', dueDate: '2026-03-14',
        points: 15, type: 'Reflection', order: 5,
      },
      {
        phase: 4, phaseLabel: 'Lesson 4', phaseColor: '#9b59b6',
        status: 'not-started', title: 'E-Portfolio Submission', description: 'Submit your complete professional e-portfolio', dueDate: '2026-03-28',
        points: 75, type: 'Portfolio', order: 6,
      },
      {
        phase: 1, phaseLabel: 'Lesson 1', phaseColor: '#3498db',
        status: 'completed', title: 'Pre-training Orientation', description: 'Introduction to the program and platform navigation', dueDate: '2026-03-05',
        points: 5, type: 'Orientation', order: 7,
      },
      {
        phase: 2, phaseLabel: 'Lesson 2', phaseColor: '#e67e22',
        status: 'in-progress', title: 'Pedagogical Innovations Workshop', description: 'Hands-on workshop on student-centered approaches', dueDate: '2026-03-15',
        points: 25, type: 'Workshop', order: 8,
      },
    ]);
    console.log('✓ Activities seeded');

    // Seed Calendar Events
    const calendarEvents = [];
    const eventData = {
      5: [{ title: 'Program Begins', type: 'event', phase: 1 }],
      7: [{ title: 'Survey Due', type: 'deadline', phase: 1 }],
      10: [{ title: 'LMS Exploration', type: 'task', phase: 2 }],
      12: [{ title: 'First Lesson Due', type: 'deadline', phase: 2 }],
      14: [{ title: 'Reflection Due', type: 'deadline', phase: 3 }],
      15: [{ title: 'Workshop Session', type: 'event', phase: 2 }],
      18: [{ title: 'Microlesson Due', type: 'deadline', phase: 3 }],
      22: [{ title: 'Mentorship Begins', type: 'event', phase: 3 }],
      25: [{ title: 'Peer Review Session', type: 'event', phase: 3 }],
      28: [{ title: 'Portfolio Due', type: 'deadline', phase: 4 }],
      29: [{ title: 'Showcase Preparation', type: 'event', phase: 4 }],
      30: [{ title: 'Final Showcase Event', type: 'event', phase: 4 }],
      31: [{ title: 'Program Concludes', type: 'event', phase: 4 }],
    };
    
    for (const [day, events] of Object.entries(eventData)) {
      for (const evt of events) {
        calendarEvents.push({ day: parseInt(day), month: 3, year: 2026, ...evt });
      }
    }
    
    await CalendarEvent.insertMany(calendarEvents);
    console.log('✓ Calendar Events seeded');

    // Seed Modules
    await Module.insertMany([
      {
        moduleNumber: 1, phase: 'Week 1', week: 'Diagnostic', title: 'Lesson 1: Diagnostic Assessment',
        description: 'Assess current digital competencies to establish baseline', icon: 'BsSearch',
        color: '#3498db', duration: '~8 hours', lessons: ['Pre-training Orientation', 'Digital Readiness Survey', 'Platform Navigation'],
        output: 'Self-Assessment Report', progress: 100, unlocked: true, order: 1,
      },
      {
        moduleNumber: 2, phase: 'Weeks 2-3', week: 'Training', title: 'Lesson 2: Training Workshops',
        description: 'Intensive hands-on training in digital pedagogy and LMS tools', icon: 'BsTools',
        color: '#e67e22', duration: '~12 hours', lessons: ['Student-Centered Pedagogies', 'LMS Tools & Features', 'Digital Content Creation'],
        output: 'Digital Lesson Plans', progress: 50, unlocked: true, order: 2,
      },
      {
        moduleNumber: 3, phase: 'Weeks 4-5', week: 'Mentorship', title: 'Lesson 3: Mentorship & Practice',
        description: 'Apply skills with mentor guidance in actual teaching context', icon: 'BsPersonWorkspace',
        color: '#2ecc71', duration: '~14 hours', lessons: ['Lesson Design Workshop', 'Microteaching Practice', 'Mentor Feedback Sessions'],
        output: 'Demonstration Teaching', progress: 0, unlocked: false, order: 3,
      },
      {
        moduleNumber: 4, phase: 'Week 6', week: 'Showcase', title: 'Lesson 4: E-Portfolio Showcase',
        description: 'Present comprehensive professional digital portfolio', icon: 'BsJournalBookmark',
        color: '#9b59b6', duration: '~12 hours', lessons: ['Portfolio Assembly', 'Presentation Skills', 'Professional Showcase Event'],
        output: 'Professional E-Portfolio', progress: 0, unlocked: false, order: 4,
      },
    ]);
    console.log('✓ Modules seeded');

    // Seed Resources
    await Resource.insertMany([
      { icon: 'BsTools', type: 'Tool', title: 'Google Classroom', author: 'Google Education', tag: 'LMS', phase: 2, color: '#3498db', order: 1 },
      { icon: 'BsYoutube', type: 'Video', title: 'Introduction to Blended Learning', author: 'EdTech Academy', tag: 'Pedagogy', phase: 1, color: '#e74c3c', order: 2 },
      { icon: 'BsTemplate', type: 'Template', title: 'Digital Lesson Plan Template', author: 'UM CTE', tag: 'Planning', phase: 2, color: '#f39c12', order: 3 },
      { icon: 'BsBook', type: 'Framework', title: 'TPACK Framework', author: 'Mishra & Koehler', tag: 'Theory', phase: 1, color: '#2ecc71', order: 4 },
      { icon: 'BsPlay', type: 'Video', title: 'Microteaching Best Practices', author: 'Teaching Excellence Lab', tag: 'Pedagogy', phase: 3, color: '#e74c3c', order: 5 },
      { icon: 'BsDownload', type: 'OER', title: 'Open Educational Resources Database', author: 'UNESCO', tag: 'Resources', phase: 0, color: '#9b59b6', order: 6 },
      { icon: 'BsLaptop', type: 'Tool', title: 'Canva for Education', author: 'Canva', tag: 'Design', phase: 2, color: '#3498db', order: 7 },
      { icon: 'BsFileText', type: 'Template', title: 'E-Portfolio Guidelines', author: 'UM CTE', tag: 'Portfolio', phase: 4, color: '#1abc9c', order: 8 },
      { icon: 'BsBook', type: 'Framework', title: '21st Century Learning Framework', author: 'CHED', tag: 'Curriculum', phase: 0, color: '#2ecc71', order: 9 },
      { icon: 'BsVideo', type: 'Video', title: 'Recording & Editing Tutorial', author: 'Tech Skills Pro', tag: 'Media', phase: 3, color: '#e74c3c', order: 10 },
      { icon: 'BsTools', type: 'Tool', title: 'Padlet Collaboration Board', author: 'Padlet', tag: 'Collaboration', phase: 2, color: '#3498db', order: 11 },
      { icon: 'BsBook', type: 'Framework', title: 'Universal Design for Learning (UDL)', author: 'CAST', tag: 'Inclusivity', phase: 1, color: '#2ecc71', order: 12 },
      { icon: 'BsDownload', type: 'OER', title: 'Creative Commons Resources', author: 'Creative Commons', tag: 'Licensing', phase: 0, color: '#9b59b6', order: 13 },
      { icon: 'BsFileEarmarkPdf', type: 'Document', title: 'Digital Citizenship Guide', author: 'ISTE', tag: 'Ethics', phase: 1, color: '#34495e', order: 14 },
    ]);
    console.log('✓ Resources seeded');

    // Seed FAQs
    await FAQ.insertMany([
      { question: 'What is the time commitment for this program?', answer: 'The program spans 6 weeks with approximately 46 hours of total engagement, combining live sessions, self-paced modules, and mentorship.', category: 'general', order: 1 },
      { question: 'Is this program mandatory?', answer: 'No, participation is voluntary. However, successful completion provides a Certificate of Completion with digital competency credentials.', category: 'general', order: 2 },
      { question: 'What technical skills do I need to participate?', answer: 'No prior technical experience required! We start with basics and build up. You just need a computer with internet access and willingness to learn.', category: 'technical', order: 3 },
      { question: 'Can I access materials offline?', answer: 'Yes, we offer an offline resource pack downloadable on the Assist page with all essential materials for offline access.', category: 'technical', order: 4 },
      { question: 'How is performance evaluated?', answer: 'Evaluation is performance-based through: self-assessment, project submissions, microteaching demonstrations, and a comprehensive e-portfolio.', category: 'assessment', order: 5 },
      { question: 'What if I fall behind?', answer: 'Our flexible design allows self-paced catch-up within each module. Mentors and facilitators are available via live chat or email for individual support.', category: 'support', order: 6 },
    ]);
    console.log('✓ FAQs seeded');

    // Seed Badges
    await Badge.insertMany([
      { icon: '🚀', label: 'Digital Pioneer', description: 'Completed diagnostic assessment', earned: true, order: 1 },
      { icon: '📚', label: 'Lesson Designer', description: 'Created first digital lesson plan', earned: true, order: 2 },
      { icon: '🎥', label: 'Content Creator', description: 'Produced a microlesson video', earned: false, order: 3 },
      { icon: '👥', label: 'Mentor Champion', description: 'Participated in all mentorship sessions', earned: false, order: 4 },
      { icon: '🎨', label: 'Design Master', description: 'Mastered digital design tools', earned: false, order: 5 },
      { icon: '📊', label: 'Data Advocate', description: 'Used learning analytics effectively', earned: false, order: 6 },
      { icon: '🌟', label: 'Excellence Award', description: 'Portfolio showcase excellence', earned: false, order: 7 },
      { icon: '🏆', label: 'Graduate Champion', description: 'Successfully completed the program', earned: false, order: 8 },
    ]);
    console.log('✓ Badges seeded');

    // Seed Announcements
    await Announcement.insertMany([
      {
        date: 'Mar 5, 2026',
        title: '🎉 Welcome to UM DigiTeach Hub!',
        body: 'The program officially begins today. Start with the Pre-training Orientation and introduce yourself in the community forum!',
        author: 'Dr. Maria Hershey',
        urgent: true,
        phase: 1,
        read: false,
        order: 1,
      },
      {
        date: 'Mar 3, 2026',
        title: 'Important: Deadline Extension for Survey',
        body: 'The digital readiness survey deadline has been extended to March 8 to accommodate those with connectivity challenges.',
        author: 'Mr. John Doe',
        urgent: false,
        phase: 1,
        read: true,
        order: 2,
      },
      {
        date: 'Feb 28, 2026',
        title: 'Pre-Program Tech Check',
        body: 'Please test your internet connection and browser compatibility before March 5. Check the Technical Support guide if issues arise.',
        author: 'Ms. Shuvy Johnson',
        urgent: false,
        phase: 0,
        read: true,
        order: 3,
      },
      {
        date: 'Feb 25, 2026',
        title: 'Facilitators Introduced & Schedule Confirmed',
        body: 'Meet your program facilitators and see the confirmed schedule for all live sessions and deadlines.',
        author: 'Dr. Maria Hershey',
        urgent: false,
        phase: 0,
        read: true,
        order: 4,
      },
    ]);
    console.log('✓ Announcements seeded');

    // Seed Threads
    await Thread.insertMany([
      { title: 'Best practices for online classroom management', replies: 24, views: 156, author: 'Teacher_Alex', avatar: '👩‍🏫', tag: 'Pedagogy', timeAgo: '2d ago', pinned: true, order: 1 },
      { title: 'Help with video recording on Mac', replies: 8, views: 42, author: 'Tech_Newbie', avatar: '🙋', tag: 'Technical', timeAgo: '1d ago', pinned: false, order: 2 },
      { title: 'Resource recommendations for K-12 STEM', replies: 15, views: 89, author: 'STEM_Fan', avatar: '🔬', tag: 'Resources', timeAgo: '3d ago', pinned: false, order: 3 },
      { title: 'Microlesson project showcase', replies: 32, views: 203, author: 'Creative_Coach', avatar: '🎨', tag: 'Projects', timeAgo: '5d ago', pinned: true, order: 4 },
      { title: 'Tips for creating accessible content', replies: 18, views: 112, author: 'Inclusive_Ed', avatar: '♿', tag: 'Accessibility', timeAgo: '4d ago', pinned: false, order: 5 },
      { title: 'Timezone challenges for international participants', replies: 6, views: 34, author: 'Global_Educator', avatar: '🌍', tag: 'General', timeAgo: '6d ago', pinned: false, order: 6 },
    ]);
    console.log('✓ Threads seeded');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await seedDatabase();
})();
