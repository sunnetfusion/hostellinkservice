import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import studentsRouter from './routes/students';
import hostelsRouter from './routes/hostels';
import reservationsRouter from './routes/reservations';
import paymentsRouter from './routes/payments';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// health
app.get('/health', (_, res) => res.json({ ok: true }));

// API routes
app.use('/api/students', studentsRouter);
app.use('/api/hostels', hostelsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/payments', paymentsRouter);

// basic error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: err?.message || 'server_error' });
});

app.listen(PORT, () => {
  console.log(\`HostelLink backend listening on http://localhost:\${PORT}\`);
});
