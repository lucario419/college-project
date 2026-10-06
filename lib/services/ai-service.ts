export type ExplainCodeInput = { code: string; language: string };

export abstract class AIService {
  abstract explainCode(input: ExplainCodeInput): Promise<string>;
  abstract analyzeBug(code: string): Promise<string>;
  abstract generateHint(code: string): Promise<string>;
  abstract analyzeComplexity(code: string): Promise<string>;
}

export class MockAIService extends AIService {
  async explainCode({ code, language }: ExplainCodeInput): Promise<string> {
    return `This ${language} snippet initializes a loop and performs the main transformation in a linear pass. The logic is easiest to reason about when each state change is isolated and the variable names describe the business intent.`;
  }

  async analyzeBug(code: string): Promise<string> {
    return `The likely issue is an off-by-one or state mismatch. Review loop boundaries and ensure any mutation happens only after the correct condition has been evaluated. ${code.slice(0, 80)}`;
  }

  async generateHint(code: string): Promise<string> {
    return `Start by tracing the control flow for the first iteration, then ensure the invariant holds before updating the accumulator or pointer.`;
  }

  async analyzeComplexity(code: string): Promise<string> {
    return `The dominant complexity is O(n) time with O(1) auxiliary space for the common single-pass implementation. This estimate assumes a single loop over the array with constant-time operations.`;
  }
}
