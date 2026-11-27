import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import schedulingRoutes from './routes/schedulingRoutes.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/scheduling', schedulingRoutes);

const port = Number(process.env.PORT || 5000);

connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`UNFAZZED API listening on http://127.0.0.1:${port}`));
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
