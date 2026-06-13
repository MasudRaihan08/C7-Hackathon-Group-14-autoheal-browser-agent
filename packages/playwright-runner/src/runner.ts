import { spawn } from 'node:child_process';
import path from 'node:path';

export type PlaywrightRunResult = {
  status: 'passed' | 'failed';
  exitCode: number | null;
  stdout: string;
  stderr: string;
  durationMs: number;
};

export async function runPlaywrightSpec(specPath: string): Promise<PlaywrightRunResult> {
  const started = Date.now();
  const absoluteSpec = path.resolve(specPath);

  return new Promise((resolve) => {
    const child = spawn('pnpm', ['exec', 'playwright', 'test', absoluteSpec], {
      shell: true,
      env: {
        ...process.env,
        PLAYWRIGHT_HTML_REPORT: 'playwright-report'
      }
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('close', (code) => {
      resolve({
        status: code === 0 ? 'passed' : 'failed',
        exitCode: code,
        stdout,
        stderr,
        durationMs: Date.now() - started
      });
    });
  });
}
