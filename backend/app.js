const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { errorHandler, notFound } = require('./middleware/errorHandler');

const milestoneRoutes = require('./routes/milestoneRoutes');
const documentRoutes = require('./routes/documentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const contactRoutes = require('./routes/contactRoutes');
const healthRoutes = require('./routes/healthRoutes');
const cdapRoutes = require('./routes/cdapRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Render (and most PaaS hosts) sit behind one reverse proxy. Trusting it makes
// req.ip the visitor's address, so the contact rate limit is per visitor
// instead of one shared bucket for everyone. Override with TRUST_PROXY (a hop
// count) if the deployment has more proxies in front of it, or 0 for none.
app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

app.use(helmet());
// CLIENT_URL is a comma-separated list of allowed origins, e.g. the marketing
// site and the CDAP research site: "https://a.example,https://b.example".
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.use('/api/milestones', milestoneRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/cdap', cdapRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
