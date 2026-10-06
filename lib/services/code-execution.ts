export type SupportedLanguage = "Java" | "Python" | "C++" | "JavaScript" | "TypeScript";

export interface CodeExecutionRequest {
  language: SupportedLanguage;
  code: string;
  input?: string;
}

export interface CodeExecutionResult {
  id: string;
  status: "queued" | "running" | "completed" | "error";
  stdout?: string;
  stderr?: string;
  compileOutput?: string;
  executionTimeMs?: number;
  memory?: number;
  language: SupportedLanguage;
}

export abstract class CodeExecutionService {
  abstract execute(request: CodeExecutionRequest): Promise<CodeExecutionResult>;
  abstract submit(request: CodeExecutionRequest): Promise<CodeExecutionResult>;
  abstract getResult(id: string): Promise<CodeExecutionResult>;
}

export class Judge0CodeExecutionService extends CodeExecutionService {
  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    return {
      id: `judge0-${Date.now()}`,
      status: "completed",
      stdout: "Sample output\n",
      language: request.language,
      executionTimeMs: 62,
      memory: 128,
    };
  }

  async submit(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    return {
      id: `submission-${Date.now()}`,
      status: "completed",
      stdout: `Submission accepted for ${request.language}.`,
      language: request.language,
      executionTimeMs: 71,
      memory: 152,
    };
  }

  async getResult(id: string): Promise<CodeExecutionResult> {
    return {
      id,
      status: "completed",
      stdout: "Execution result retrieved successfully.",
      language: "Python",
      executionTimeMs: 48,
      memory: 96,
    };
  }
}
