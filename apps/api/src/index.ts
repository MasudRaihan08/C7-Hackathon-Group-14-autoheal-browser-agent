import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { Server } from 'socket.io';
import { projectRouter } from './routes/projects.js';
import { flowRouter } from './routes/flows.js';
import { runRouter } from './routes/runs.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEB_ORIGIN || 'http://localhost:3000'
  }
});

app.use(cors({ origin: process.env.WEB_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'autoheal-api' });
});

app.use('/api/projects', projectRouter);
app.use('/api/flows', flowRouter);
app.use('/api/runs', runRouter(io));

io.on('connection', (socket) => {
  socket.emit('log', { message: 'Connected to AutoHeal execution stream' });
});

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`AutoHeal API running on http://localhost:${port}`);
});
