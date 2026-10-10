const { test, describe, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../app');
const ContactMessage = require('../models/ContactMessage');
const TeamMember = require('../models/TeamMember');
const mailer = require('../config/mailer');
const { escapeHtml } = require('../utils/escapeHtml');

// Each request gets its own client IP (via the proxy header, as on Render) so
// tests don't share one rate-limit bucket.
let ipCounter = 0;
const nextIp = () => `203.0.113.${++ipCounter}`;
const post = (body, ip = nextIp()) => request(app).post('/api/contact').set('X-Forwarded-For', ip).send(body);

const valid = { name: 'Dana Perera', email: 'dana@hospital.example', message: 'We would like a demo for our ICU.' };

describe('POST /api/contact', () => {
  let sent;
  let created;

  beforeEach(() => {
    sent = [];
    created = [];
    mock.method(ContactMessage, 'create', async (doc) => {
      created.push(doc);
      return { _id: 'abc123', ...doc };
    });
    mock.method(mailer, 'getTransporter', () => ({ sendMail: async (mail) => sent.push(mail) }));
  });

  afterEach(() => mock.restoreAll());

  test('saves a valid message and emails it', async () => {
    const res = await post(valid);
    assert.equal(res.status, 201);
    assert.deepEqual(res.body, { success: true, data: { _id: 'abc123' } });
    assert.equal(created.length, 1);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].subject, '[MediSIEM Website] New message from Dana Perera');
  });

  test('escapes HTML in the notification email', async () => {
    const res = await post({ ...valid, name: '<b>Eve</b>', message: 'Click <a href="https://evil.example">here</a> now please' });
    assert.equal(res.status, 201);
    assert.ok(!sent[0].html.includes('<a href'), 'raw link must not reach the email');
    assert.ok(sent[0].html.includes('&lt;a href=&quot;https://evil.example&quot;&gt;'));
    assert.ok(sent[0].html.includes('&lt;b&gt;Eve&lt;/b&gt;'));
  });

  test('strips line breaks from the subject', async () => {
    await post({ ...valid, name: 'Eve\r\nBcc: x@y.z' });
    assert.ok(!/[\r\n]/.test(sent[0].subject));
  });

  test('silently drops honeypot submissions', async () => {
    const res = await post({ ...valid, website: 'http://spam.example' });
    assert.equal(res.status, 201);
    assert.equal(created.length, 0);
    assert.equal(sent.length, 0);
  });

  test('rejects invalid input', async () => {
    const res = await post({ name: '', email: 'not-an-email', message: 'short' });
    assert.equal(res.status, 400);
    assert.equal(created.length, 0);
  });

  test('rate-limits per visitor, not globally', async () => {
    for (let i = 0; i < 5; i++) assert.equal((await post(valid, '198.51.100.7')).status, 201);
    assert.equal((await post(valid, '198.51.100.7')).status, 429);
    assert.equal((await post(valid, '198.51.100.8')).status, 201);
  });

  test('still succeeds when SMTP is not configured', async () => {
    mailer.getTransporter.mock.mockImplementation(() => null);
    const res = await post(valid);
    assert.equal(res.status, 201);
    assert.equal(created.length, 1);
  });
});

describe('GET /api/team', () => {
  afterEach(() => mock.restoreAll());

  test('excludes internal-only fields', async () => {
    let selected;
    mock.method(TeamMember, 'find', () => ({
      select(fields) {
        selected = fields;
        return this;
      },
      sort: async () => [{ name: 'A', role: 'Team Member' }],
    }));
    const res = await request(app).get('/api/team');
    assert.equal(res.status, 200);
    assert.match(selected, /-studentId/);
    assert.match(selected, /-email/);
  });
});

test('GET /api/health responds OK', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
});

test('escapeHtml escapes all HTML-significant characters', () => {
  assert.equal(escapeHtml(`<a href="x" title='y'>&</a>`), '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
});
