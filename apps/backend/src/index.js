import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import faqRoutes from './routes/faq.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import { seedDevInteractions } from './dev/seedInteractions.js';

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.SEED_DEV_DATA === 'true') {
  seedDevInteractions();
}

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/faq', faqRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
