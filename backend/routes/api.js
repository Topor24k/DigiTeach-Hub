const express = require('express');
const router = express.Router();
const {
  Facilitator, Stats, Phase, Objective, Outcome, Challenge, ChallengeSolution,
  Reference, Activity, CalendarEvent, Module, Resource, FAQ, Badge, Announcement, Thread,
} = require('../models');

// ═════════════════════ FACILITATORS ═════════════════════
router.get('/facilitators', async (req, res) => {
  try {
    const facilitators = await Facilitator.find().sort({ createdAt: 1 });
    res.json(facilitators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/facilitators', async (req, res) => {
  try {
    const facilitator = new Facilitator(req.body);
    await facilitator.save();
    res.status(201).json(facilitator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/facilitators/:id', async (req, res) => {
  try {
    const facilitator = await Facilitator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(facilitator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/facilitators/:id', async (req, res) => {
  try {
    await Facilitator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Facilitator deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════ STATS ═════════════════════
router.get('/stats', async (req, res) => {
  try {
    const stats = await Stats.find().sort({ createdAt: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/stats', async (req, res) => {
  try {
    const stats = new Stats(req.body);
    await stats.save();
    res.status(201).json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ PHASES (LESSONS) ═════════════════════
router.get('/phases', async (req, res) => {
  try {
    const phases = await Phase.find().sort({ order: 1 });
    res.json(phases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/phases', async (req, res) => {
  try {
    const phase = new Phase(req.body);
    await phase.save();
    res.status(201).json(phase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ OBJECTIVES ═════════════════════
router.get('/objectives', async (req, res) => {
  try {
    const objectives = await Objective.find().sort({ order: 1 });
    res.json(objectives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/objectives', async (req, res) => {
  try {
    const objective = new Objective(req.body);
    await objective.save();
    res.status(201).json(objective);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ OUTCOMES ═════════════════════
router.get('/outcomes', async (req, res) => {
  try {
    const outcomes = await Outcome.find().sort({ order: 1 });
    res.json(outcomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/outcomes', async (req, res) => {
  try {
    const outcome = new Outcome(req.body);
    await outcome.save();
    res.status(201).json(outcome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ CHALLENGES ═════════════════════
router.get('/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ order: 1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/challenges', async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ CHALLENGE SOLUTIONS ═════════════════════
router.get('/challenge-solutions', async (req, res) => {
  try {
    const solutions = await ChallengeSolution.find().sort({ order: 1 });
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/challenge-solutions', async (req, res) => {
  try {
    const solution = new ChallengeSolution(req.body);
    await solution.save();
    res.status(201).json(solution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ REFERENCES ═════════════════════
router.get('/references', async (req, res) => {
  try {
    const references = await Reference.find().sort({ order: 1 });
    res.json(references);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/references', async (req, res) => {
  try {
    const reference = new Reference(req.body);
    await reference.save();
    res.status(201).json(reference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ ACTIVITIES ═════════════════════
router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ order: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═════════════════════ CALENDAR EVENTS ═════════════════════
router.get('/calendar-events', async (req, res) => {
  try {
    const events = await CalendarEvent.find().sort({ day: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/calendar-events', async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ MODULES ═════════════════════
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.find().sort({ order: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/modules', async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/modules/:id', async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ RESOURCES ═════════════════════
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ order: 1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/resources', async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ FAQs ═════════════════════
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/faqs', async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ BADGES ═════════════════════
router.get('/badges', async (req, res) => {
  try {
    const badges = await Badge.find().sort({ order: 1 });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/badges', async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/badges/:id', async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(badge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ ANNOUNCEMENTS ═════════════════════
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ order: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/announcements', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ═════════════════════ THREADS (COMMUNITY) ═════════════════════
router.get('/threads', async (req, res) => {
  try {
    const threads = await Thread.find().sort({ order: -1 });
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/threads', async (req, res) => {
  try {
    const thread = new Thread(req.body);
    await thread.save();
    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/threads/:id', async (req, res) => {
  try {
    const thread = await Thread.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thread);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
