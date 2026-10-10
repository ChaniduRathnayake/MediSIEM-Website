// Clears and repopulates the database with content for the MediSIEM /
// CAAP promotional site. Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Milestone = require('./models/Milestone');
const Document = require('./models/Document');
const TeamMember = require('./models/TeamMember');

// Product roadmap phases. Dates are approximate (month-level), not exact
// deadlines — adjust freely as the real timeline shifts.
const milestones = [
  {
    title: 'Research & Data Analysis',
    date: new Date('2026-01-15'),
    dateLabel: 'Jan 2026',
    description: 'Analyzed hospital SOC alert patterns and benchmarked against the CIC IoMT 2024 and CICIDS 2017 datasets.',
    status: 'completed',
    marks: null,
    order: 1,
  },
  {
    title: 'Core Scoring Engine',
    date: new Date('2026-04-01'),
    dateLabel: 'Apr 2026',
    description: 'Built the Clinical Alert Score (CAS) engine, combining Random Forest, Isolation Forest, and K-Means.',
    status: 'completed',
    marks: null,
    order: 2,
  },
  {
    title: 'Platform Integration',
    date: new Date('2026-06-15'),
    dateLabel: 'Jun 2026',
    description: 'Connected the scoring engine to a Wazuh and Elasticsearch alert pipeline with a live dashboard.',
    status: 'completed',
    marks: null,
    order: 3,
  },
  {
    title: 'Internal Validation & Benchmarking',
    date: new Date('2026-08-15'),
    dateLabel: 'Aug 2026',
    description: 'Benchmarked ranking accuracy against traditional CVSS scoring across a range of simulated alert scenarios.',
    status: 'completed',
    marks: null,
    order: 4,
  },
  {
    title: 'Public Launch Preparation',
    date: new Date('2026-11-01'),
    dateLabel: 'Nov 2026',
    description: 'Finalizing documentation, security review, and launch readiness for the public platform.',
    status: 'upcoming',
    marks: null,
    order: 5,
  },
  {
    title: 'General Availability',
    date: new Date('2027-02-01'),
    dateLabel: 'Q1 2027',
    description: 'Opening MediSIEM and the CAAP scoring engine to early hospital partners.',
    status: 'upcoming',
    marks: null,
    order: 6,
  },
];

// Internal note: studentId / institutional email fields are kept here for
// record-keeping only. GET /api/team strips them (controllers/teamController.js),
// so they never reach the public site — this is a commercial product site,
// not an academic listing.
const team = [
  {
    name: 'Mr. Amila Senarathne',
    studentId: 'N/A',
    role: 'Advisor',
    component: 'Strategic Advisor',
    email: '',
    linkedin: '',
    photoUrl: '',
    order: 1,
  },
  {
    name: 'Ms. Ayesha Wijesooroya',
    studentId: 'N/A',
    role: 'Advisor',
    component: 'Technical Advisor',
    email: '',
    linkedin: '',
    photoUrl: '',
    order: 2,
  },
  {
    name: 'R.M.C.B. Rathnayake',
    studentId: 'IT22061270',
    role: 'Team Member',
    component: 'Clinical Alert Scoring Engine',
    email: 'it22061270@my.sliit.lk',
    linkedin: '',
    photoUrl: '',
    order: 3,
  },
  {
    name: 'W.D.S. Jayasinghe',
    studentId: 'IT22086648',
    role: 'Team Member',
    component: 'Incident Response & Orchestration',
    email: 'it22086648@my.sliit.lk',
    linkedin: '',
    photoUrl: '',
    order: 4,
  },
  {
    name: 'Anjana K.O.A',
    studentId: 'IT22118240',
    role: 'Team Member',
    component: 'Threat Intelligence & IP Reputation',
    email: 'it22118240@my.sliit.lk',
    linkedin: '',
    photoUrl: '',
    order: 5,
  },
];

const documents = [
  {
    title: 'MediSIEM Product Overview',
    category: 'document',
    fileUrl: '/docs/medisiem-product-overview.pdf',
    date: new Date('2026-09-01'),
    description: 'A high-level overview of the MediSIEM platform and the CAAP clinical alert scoring engine.',
  },
  {
    title: 'CAAP Technical Whitepaper',
    category: 'document',
    fileUrl: '/docs/caap-technical-whitepaper.pdf',
    date: new Date('2026-09-10'),
    description: 'A deep dive into the Clinical Alert Score (CAS) methodology, models, and architecture.',
  },
  {
    title: 'Security & Compliance Brief',
    category: 'document',
    fileUrl: '/docs/security-compliance-brief.pdf',
    date: new Date('2026-09-15'),
    description: 'How MediSIEM approaches data security, privacy, and compliance.',
  },
  {
    title: 'Platform Demo Deck',
    category: 'presentation',
    fileUrl: '/docs/platform-demo-deck.pdf',
    date: new Date('2026-09-20'),
    description: 'A slide walkthrough of the MediSIEM dashboard and alert scoring workflow.',
  },
  {
    title: 'Technical Architecture Overview',
    category: 'presentation',
    fileUrl: '/docs/technical-architecture-overview.pdf',
    date: new Date('2026-09-25'),
    description: 'Slide deck covering the detection pipeline: Wazuh, Elasticsearch, and the CAAP scoring engine.',
  },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Milestone.deleteMany({}),
    Document.deleteMany({}),
    TeamMember.deleteMany({}),
  ]);

  await Milestone.insertMany(milestones);
  await Document.insertMany(documents);
  await TeamMember.insertMany(team);

  console.log('Database seeded successfully.');
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
