import { Router } from 'express';
import type { Server } from 'socket.io';
import { prisma } from '../db/client.js';
import { runPlaywrightSpec } from '@autoheal/playwright-runner';
import { diagnoseFailure } from '../agents/error-diagnosis.agent.js';
import { repairScript } from '../agents/adaptive-repair.agent.js';

export function runRouter(io: Server) {
  const router = Router();

  router.post('/flow/:flowId', async (req, res) => {
    const flow = await prisma.flow.findUniqueOrThrow({ where: { id: req.params.flowId }, include: { project: true } });
    if (!flow.scriptPath) return res.status(400).json({ error: 'Generate script before running flow.' });

    const run = await prisma.run.create({ data: { projectId: flow.projectId, flowId: flow.id, status: 'running' } });
    res.status(202).json(run);

    io.emit('run-log', { runId: run.id, message: `Running ${flow.name}` });
    const result = await runPlaywrightSpec(flow.scriptPath);

    let update: any = {
      status: result.status,
      endedAt: new Date(),
      durationMs: result.durationMs,
      logs: [result.stdout, result.stderr],
      artifacts: {
        report: 'playwright-report',
        trace: 'test-results'
      }
    };

    if (result.status === 'failed') {
      const diagnosis = await diagnoseFailure(result.stderr || result.stdout);
      update.errorSummary = diagnosis.rootCause;
      io.emit('run-log', { runId: run.id, message: `Diagnosis: ${diagnosis.rootCause}` });
    }

    const saved = await prisma.run.update({ where: { id: run.id }, data: update });
    io.emit('run-complete', saved);
  });

  router.post('/:runId/repair', async (req, res) => {
    const run = await prisma.run.findUniqueOrThrow({ where: { id: req.params.runId }, include: { flow: true } });
    if (!run.flow?.scriptPath) return res.status(400).json({ error: 'No script found for run.' });

    const fs = await import('node:fs/promises');
    const originalCode = await fs.readFile(run.flow.scriptPath, 'utf-8');
    const repairedCode = await repairScript(originalCode, run.errorSummary || 'Unknown failure');
    await fs.writeFile(run.flow.scriptPath, repairedCode, 'utf-8');

    await prisma.repairAttempt.create({
      data: {
        runId: run.id,
        failureType: 'broken_selector',
        originalCode,
        repairedCode,
        explanation: 'Replaced brittle selector with role/text-based locator where possible.',
        confidence: 0.82
      }
    });

    const updated = await prisma.run.update({
      where: { id: run.id },
      data: { repairApplied: true, repairSummary: 'Applied selector repair.' }
    });

    res.json({ run: updated, repairedCode });
  });

  router.get('/:id', async (req, res) => {
    const run = await prisma.run.findUniqueOrThrow({ where: { id: req.params.id } });
    res.json(run);
  });

  return router;
}
