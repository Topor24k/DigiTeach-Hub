const mongoose = require('mongoose');

// Facilitator Schema
const facilitatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null },
  avatarColor: { type: String, default: '#3498db' },
  createdAt: { type: Date, default: Date.now },
});

// Stats Schema
const statsSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'BsMortarboard' },
  createdAt: { type: Date, default: Date.now },
});

// Phase/Lesson Schema
const phaseSchema = new mongoose.Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, default: 'BsSearch' },
  description: { type: String },
  output: { type: String },
  color: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Objective Schema
const objectiveSchema = new mongoose.Schema({
  icon: { type: String, default: 'BsGear' },
  title: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Outcome Schema
const outcomeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Challenge Schema
const challengeSchema = new mongoose.Schema({
  icon: { type: String, default: 'BsExclamationTriangle' },
  challenge: { type: String, required: true },
  impact: { type: String, required: true },
  mitigation: { type: String, required: true },
  color: { type: String, default: '#e74c3c' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Challenge Solution Schema (for LMS Assist)
const challengeSolutionSchema = new mongoose.Schema({
  icon: { type: String, default: 'BsLaptop' },
  challenge: { type: String, required: true },
  impact: { type: String, required: true },
  solution: { type: String, required: true },
  details: { type: String, required: true },
  color: { type: String, default: '#3498db' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Reference Schema
const referenceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  phase: { type: Number, required: true },
  phaseLabel: { type: String, required: true },
  phaseColor: { type: String, required: true },
  status: { type: String, enum: ['completed', 'in-progress', 'not-started'], default: 'not-started' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  points: { type: Number, default: 0 },
  type: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Calendar Event Schema
const calendarEventSchema = new mongoose.Schema({
  day: { type: Number, required: true, min: 1, max: 31 },
  month: { type: Number, default: 3 },
  year: { type: Number, default: 2026 },
  title: { type: String, required: true },
  type: { type: String, enum: ['event', 'deadline', 'task'], default: 'event' },
  phase: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Module Schema
const moduleSchema = new mongoose.Schema({
  moduleNumber: { type: Number, required: true },
  phase: { type: String, required: true },
  week: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'BsSearch' },
  color: { type: String, required: true },
  duration: { type: String, required: true },
  lessons: [String],
  output: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  unlocked: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Resource Schema
const resourceSchema = new mongoose.Schema({
  icon: { type: String, default: 'BsBook' },
  type: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  tag: { type: String, required: true },
  color: { type: String, default: '#3498db' },
  phase: { type: Number, default: 0 },
  url: { type: String, default: null },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'general' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Badge Schema
const badgeSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
  earned: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Announcement Schema
const announcementSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  urgent: { type: Boolean, default: false },
  phase: { type: Number, default: 0 },
  read: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Thread (Community Discussion) Schema
const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  replies: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  tag: { type: String, required: true },
  timeAgo: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Facilitator: mongoose.model('Facilitator', facilitatorSchema),
  Stats: mongoose.model('Stats', statsSchema),
  Phase: mongoose.model('Phase', phaseSchema),
  Objective: mongoose.model('Objective', objectiveSchema),
  Outcome: mongoose.model('Outcome', outcomeSchema),
  Challenge: mongoose.model('Challenge', challengeSchema),
  ChallengeSolution: mongoose.model('ChallengeSolution', challengeSolutionSchema),
  Reference: mongoose.model('Reference', referenceSchema),
  Activity: mongoose.model('Activity', activitySchema),
  CalendarEvent: mongoose.model('CalendarEvent', calendarEventSchema),
  Module: mongoose.model('Module', moduleSchema),
  Resource: mongoose.model('Resource', resourceSchema),
  FAQ: mongoose.model('FAQ', faqSchema),
  Badge: mongoose.model('Badge', badgeSchema),
  Announcement: mongoose.model('Announcement', announcementSchema),
  Thread: mongoose.model('Thread', threadSchema),
};
