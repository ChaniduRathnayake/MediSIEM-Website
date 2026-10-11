const { test, describe, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../app');
const CdapMilestone = require('../models/CdapMilestone');
const CdapDocument = require('../models/CdapDocument');
const CdapMember = require('../models/CdapMember');
const ContactMessage = require('../models/ContactMessage');
const mailer = require('../config/mailer');
const { isSafeUrl } = require('../utils/safeUrl');

const KEY = 'test-admin-key-0123456789abcdef';
const auth = { Authorization: `Bearer ${KEY}` };

// Stand-in for Model.find(...).sort(...) that records the filter and sort.
function mockFind(Model, rows) {
  const calls = {};
  mock.method(Model, 'find', (filter) => {
    calls.filter = filter;
    return {
      sort: async (order) => {
        calls.sort = order;
        return rows;
      },
    };
  });
  return calls;
}

// Runs real schema validation without a database, like Model.create would.
const validatingCreate = (Model) => async (doc) => {
  const instance = new Model(doc);
  await instance.validate();
  return instance;
};

describe('public CDAP content API', () => {
  afterEach(() => mock.restoreAll());

  test('GET /api/cdap/milestones sorts by order', async () => {
    const calls = mockFind(CdapMilestone, [{ key: 'proposal', title: 'Project Proposal' }]);
    const res = await request(app).get('/api/cdap/milestones');
    assert.equal(res.status, 200);
    assert.deepEqual(calls.sort, { order: 1 });
    assert.equal(res.body.data[0].key, 'proposal');
  });

  test('GET /api/cdap/documents filters by kind', async () => {
    const calls = mockFind(CdapDocument, []);
    const res = await request(app).get('/api/cdap/documents?kind=slides');
    assert.equal(res.status, 200);
    assert.deepEqual(calls.filter, { kind: 'slides' });
  });

  test('GET /api/cdap/documents rejects an unknown kind', async () => {
    const res = await request(app).get('/api/cdap/documents?kind=video');
    assert.equal(res.status, 400);
  });

  test('GET /api/cdap/team returns student IDs and emails', async () => {
    mockFind(CdapMember, [{ name: 'A', studentId: 'IT00000000', email: 'a@example.com' }]);
    const res = await request(app).get('/api/cdap/team');
    assert.equal(res.status, 200);
    assert.equal(res.body.data[0].studentId, 'IT00000000');
  });
});

describe('admin API', () => {
  const originalKey = process.env.ADMIN_API_KEY;

  beforeEach(() => {
    process.env.ADMIN_API_KEY = KEY;
  });

  afterEach(() => {
    mock.restoreAll();
    if (originalKey === undefined) delete process.env.ADMIN_API_KEY;
    else process.env.ADMIN_API_KEY = originalKey;
  });

  test('is disabled when ADMIN_API_KEY is unset or too short', async () => {
    delete process.env.ADMIN_API_KEY;
    assert.equal((await request(app).get('/api/admin/messages').set(auth)).status, 503);
    process.env.ADMIN_API_KEY = 'short';
    assert.equal((await request(app).get('/api/admin/messages').set({ Authorization: 'Bearer short' })).status, 503);
  });

  test('rejects missing or wrong keys', async () => {
    assert.equal((await request(app).get('/api/admin/messages')).status, 401);
    const res = await request(app).get('/api/admin/messages').set({ Authorization: `Bearer ${KEY}x` });
    assert.equal(res.status, 401);
  });

  test('lists contact messages newest first, filtered by source', async () => {
    let filter;
    let order;
    let limit;
    mock.method(ContactMessage, 'find', (f) => {
      filter = f;
      return {
        sort(o) {
          order = o;
          return this;
        },
        limit: async (n) => {
          limit = n;
          return [];
        },
      };
    });
    const res = await request(app).get('/api/admin/messages?source=cdap&limit=999').set(auth);
    assert.equal(res.status, 200);
    assert.deepEqual(filter, { source: 'cdap' });
    assert.deepEqual(order, { createdAt: -1 });
    assert.equal(limit, 200);
  });

  test('creates content and ignores system fields in the body', async () => {
    let received;
    mock.method(CdapMilestone, 'create', async (doc) => {
      received = doc;
      return { _id: 'm1', ...doc };
    });
    const body = { _id: 'forged', createdAt: '2000-01-01', key: 'viva', title: 'Viva', dateLabel: 'TBA', description: 'Final viva.', order: 5 };
    const res = await request(app).post('/api/admin/cdap/milestones').set(auth).send(body);
    assert.equal(res.status, 201);
    assert.equal(received._id, undefined);
    assert.equal(received.createdAt, undefined);
    assert.equal(received.key, 'viva');
  });

  test('returns 400 for content that fails schema validation', async () => {
    mock.method(CdapDocument, 'create', validatingCreate(CdapDocument));
    const res = await request(app)
      .post('/api/admin/cdap/documents')
      .set(auth)
      .send({ kind: 'document', group: 'Proposal', title: 'Proposal', status: 'available', order: 1 });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /fileUrl is required/);
  });

  test('updates by loading and saving the document', async () => {
    const doc = {
      saved: false,
      set(fields) {
        Object.assign(this, fields);
      },
      async save() {
        this.saved = true;
      },
    };
    mock.method(CdapDocument, 'findById', async () => doc);
    const res = await request(app).put('/api/admin/cdap/documents/abc').set(auth).send({ status: 'available', fileUrl: 'assets/documents/proposal.pdf' });
    assert.equal(res.status, 200);
    assert.equal(doc.saved, true);
    assert.equal(doc.fileUrl, 'assets/documents/proposal.pdf');
  });

  test('returns 404 when deleting something that does not exist', async () => {
    mock.method(CdapMember, 'findByIdAndDelete', async () => null);
    const res = await request(app).delete('/api/admin/cdap/team/abc').set(auth);
    assert.equal(res.status, 404);
  });
});

describe('CDAP content validation', () => {
  test('rejects javascript: links', async () => {
    const doc = new CdapDocument({ kind: 'slides', group: 'Final', title: 'Final', fileUrl: 'javascript:alert(1)', order: 1 });
    await assert.rejects(doc.validate(), /fileUrl must be a relative path/);
  });

  test('isSafeUrl allows relative paths and http(s) only', () => {
    for (const ok of ['', 'assets/x.pdf', '../a.pdf', 'https://example.com/a.pdf', 'http://x.y']) assert.ok(isSafeUrl(ok), ok);
    for (const bad of ['javascript:alert(1)', 'data:text/html,x', '//evil.example/a', 'JAVASCRIPT:x']) assert.ok(!isSafeUrl(bad), bad);
  });
});

describe('POST /api/contact from the CDAP site', () => {
  afterEach(() => mock.restoreAll());

  test('stores the subject and source and uses them in the email', async () => {
    const created = [];
    const sent = [];
    mock.method(ContactMessage, 'create', async (doc) => {
      created.push(doc);
      return { _id: 'c1', ...doc };
    });
    mock.method(mailer, 'getTransporter', () => ({ sendMail: async (mail) => sent.push(mail) }));
    const res = await request(app)
      .post('/api/contact')
      .set('X-Forwarded-For', '192.0.2.10')
      .send({ name: 'Ravi', email: 'ravi@example.com', subject: 'Dataset question\r\nBcc: x@y.z', message: 'Which dataset split did you use?', source: 'cdap' });
    assert.equal(res.status, 201);
    assert.equal(created[0].source, 'cdap');
    assert.match(sent[0].subject, /^\[MediSIEM CDAP Site\] Dataset question/);
    assert.ok(!/[\r\n]/.test(sent[0].subject));
  });

  test('rejects an unknown source', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('X-Forwarded-For', '192.0.2.11')
      .send({ name: 'Ravi', email: 'ravi@example.com', message: 'Hello there, a question.', source: 'other' });
    assert.equal(res.status, 400);
  });
});

test('CORS allows every origin listed in CLIENT_URL', async () => {
  // app.js reads CLIENT_URL at load time, so load a fresh copy with a list.
  const original = process.env.CLIENT_URL;
  process.env.CLIENT_URL = 'https://site-a.example, https://site-b.example/';
  delete require.cache[require.resolve('../app')];
  const freshApp = require('../app');
  try {
    const res = await request(freshApp).get('/api/health').set('Origin', 'https://site-b.example');
    assert.equal(res.headers['access-control-allow-origin'], 'https://site-b.example');
    const blocked = await request(freshApp).get('/api/health').set('Origin', 'https://other.example');
    assert.equal(blocked.headers['access-control-allow-origin'], undefined);
  } finally {
    if (original === undefined) delete process.env.CLIENT_URL;
    else process.env.CLIENT_URL = original;
  }
});
