// Clears and repopulates the CDAP research site collections (CdapMilestone,
// CdapDocument, CdapMember) from cdap-site/js/data.js, so the static site's
// bundled data and the database start out identical. Edit data.js, then run:
// npm run seed:cdap
// The commercial site's collections (see seed.js) are not touched.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const CdapMilestone = require('./models/CdapMilestone');
const CdapDocument = require('./models/CdapDocument');
const CdapMember = require('./models/CdapMember');

const DATA_FILE = path.join(__dirname, '..', 'cdap-site', 'js', 'data.js');

// data.js is a browser script that assigns window.CDAP_DATA; run it in an
// empty sandbox to read that object.
function loadSiteData() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA_FILE, 'utf8'), sandbox, { filename: DATA_FILE });
  const data = sandbox.window.CDAP_DATA;
  if (!data || !data.milestones || !data.documents || !data.team) {
    throw new Error(`${DATA_FILE} must define window.CDAP_DATA with milestones, documents and team`);
  }
  return data;
}

async function seed() {
  const { milestones, documents, team } = loadSiteData();
  await connectDB();

  await Promise.all([CdapMilestone.deleteMany({}), CdapDocument.deleteMany({}), CdapMember.deleteMany({})]);

  await CdapMilestone.insertMany(milestones);
  await CdapDocument.insertMany(documents);
  await CdapMember.insertMany(team);

  console.log(
    `CDAP data seeded: ${milestones.length} milestones, ${documents.length} documents/slides, ${team.length} people.`
  );
  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
