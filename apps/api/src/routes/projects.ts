import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db/client.js';
import { discoverFlows } from '../agents/flow-discovery.agent.js';

export const projectRouter = Router();

projectRouter.get('/', async (_req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, include: { flows: true, runs: true } });
  res.json(projects);
});

projectRouter.post('/', async (req, res) => {
  const body = z.object({ name: z.string(), baseUrl: z.string().url() }).parse(req.body);
  const project = await prisma.project.create({ data: body });
  res.status(201).json(project);
});

projectRouter.post('/:id/discover-flows', async (req, res) => {
  const project = await prisma.project.findUniqueOrThrow({ where: { id: req.params.id } });
  const flows = await discoverFlows(project.baseUrl);

  const created = await Promise.all(
    flows.map((flow) =>
      prisma.flow.create({
        data: {
          projectId: project.id,
          name: flow.name,
          description: flow.description,
          priority: flow.priority,
          steps: flow.steps
        }
      })
    )
  );

  res.json(created);
});
