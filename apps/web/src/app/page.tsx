'use client';

import { useState } from 'react';
import { Bot, Play, Wand2, Search, ShieldCheck } from 'lucide-react';
import { api } from '../lib/api';

type Project = { id: string; name: string; baseUrl: string };
type Flow = { id: string; name: string; description: string; priority: string; steps: string[]; scriptPath?: string };

export default function HomePage() {
  const [name, setName] = useState('Hackathon Demo');
  const [baseUrl, setBaseUrl] = useState('http://localhost:5000');
  const [project, setProject] = useState<Project | null>(null);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [script, setScript] = useState('');
  const [message, setMessage] = useState('Ready');

  async function createProject() {
    setMessage('Creating project...');
    const created = await api<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, baseUrl })
    });
    setProject(created);
    setMessage('Project created');
  }

  async function discoverFlows() {
    if (!project) return;
    setMessage('Discovering flows...');
    const discovered = await api<Flow[]>(`/api/projects/${project.id}/discover-flows`, { method: 'POST' });
    setFlows(discovered);
    setMessage('Flows discovered');
  }

  async function generateScript(flowId: string) {
    setMessage('Generating script...');
    const result = await api<{ script: string }>(`/api/flows/${flowId}/generate-script`, { method: 'POST' });
    setScript(result.script);
    setMessage('Script generated');
  }

  async function runFlow(flowId: string) {
    setMessage('Run queued. Watch API console for live logs.');
    await api(`/api/runs/flow/${flowId}`, { method: 'POST' });
  }

  return (
    <main className="min-h-screen p-6">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-3 text-white"><Bot /></div>
            <div>
              <h1 className="text-3xl font-bold">AutoHeal Browser Agent</h1>
              <p className="text-slate-600">AI-powered self-healing Playwright automation for hackathons.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Flow Discovery', Search],
            ['Script Generation', Wand2],
            ['Execution', Play],
            ['Self-Healing', ShieldCheck]
          ].map(([label, Icon]: any) => (
            <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
              <Icon className="mb-3" />
              <h2 className="font-semibold">{label}</h2>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">1. Create Project</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <input className="rounded-xl border p-3" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="rounded-xl border p-3" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
            <button onClick={createProject} className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">Create</button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">2. Discover Flows</h2>
          <button disabled={!project} onClick={discoverFlows} className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-40">Discover Flows</button>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {flows.map((flow) => (
              <div key={flow.id} className="rounded-2xl border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{flow.name}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{flow.priority}</span>
                </div>
                <p className="mb-3 text-sm text-slate-600">{flow.description}</p>
                <ol className="mb-4 list-decimal pl-5 text-sm text-slate-700">
                  {flow.steps.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
                <div className="flex gap-2">
                  <button onClick={() => generateScript(flow.id)} className="rounded-xl bg-purple-600 px-3 py-2 text-sm font-semibold text-white">Generate</button>
                  <button onClick={() => runFlow(flow.id)} className="rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white">Run</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Generated Script</h2>
          <pre className="max-h-96 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{script || '// Generate a script to see code here'}</pre>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 text-white">Status: {message}</div>
      </section>
    </main>
  );
}
