import { Router } from 'express';
import { prisma } from '../db/client.js';
import { generateScriptForFlow } from '../agents/script-generator.agent.js';

export const flowRouter = Router();

flowRouter.get('/:id', async (req, res) => {
  const flow = await prisma.flow.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json(flow);
});

flowRouter.post('/:id/generate-script', async (req, res) => {
  const flow = await prisma.flow.findUniqueOrThrow({ where: { id: req.params.id }, include: { project: true } });
  const script = await generateScriptForFlow({
    baseUrl: flow.project.baseUrl,
    flowName: flow.name,
    steps: flow.steps as string[]
  });

  const scriptPath = `generated-tests/${flow.id}.spec.ts`;
  await import('node:fs/promises').then((fs) => fs.writeFile(scriptPath, script, 'utf-8'));

  const updated = await prisma.flow.update({ where: { id: flow.id }, data: { scriptPath } });
  res.json({ flow: updated, script, scriptPath });
});
