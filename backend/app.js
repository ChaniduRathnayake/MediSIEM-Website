const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { errorHandler, notFound } = require('./middleware/errorHandler');

const milestoneRoutes = require('./routes/milestoneRoutes');
const documentRoutes = require('./routes/documentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const contactRoutes = require('./routes/contactRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Render (and most PaaS hosts) sit behind one reverse proxy. Trusting it makes
// req.ip the visitor's address, so the contact rate limit is per visitor
// instead of one shared bucket for everyone. Override with TRUST_PROXY (a hop
// count) if the deployment has more proxies in front of it, or 0 for none.
app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
app.use(express.json({ limit: '20kb' }));

app.use('/api/milestones', milestoneRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
