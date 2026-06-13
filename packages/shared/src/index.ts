export type FlowStep = string;

export type DiscoveredFlow = {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  steps: FlowStep[];
};

export type RunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'repaired' | 'repair_failed';

export type RunArtifact = {
  screenshot?: string;
  video?: string;
  trace?: string;
  logs?: string[];
};

export type Diagnosis = {
  failureType: 'broken_selector' | 'timeout' | 'navigation' | 'assertion' | 'unknown';
  rootCause: string;
  confidence: number;
  suggestedFix: string;
  repairStrategy: string;
};
