import { getQuickJS } from "quickjs-emscripten";

const testCases = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] },
  { nums: [-4, 8, 3, 7], target: 3, expected: [0, 3] },
  { nums: [0, 4, 0], target: 0, expected: [0, 2] },
];

export type JudgeResult = {
  passed: number;
  total: number;
  score: number;
  cases: Array<{ passed: boolean }>;
  error?: string;
  errorType?: "syntax" | "runtime" | "timeout" | "entrypoint";
  errorLine?: number;
};

function getDiagnostic(error: unknown, fallbackType: "syntax" | "runtime"): Pick<JudgeResult, "error" | "errorType" | "errorLine"> {
  const details = typeof error === "object" && error !== null
    ? error as { name?: unknown; message?: unknown; stack?: unknown }
    : null;
  const name = typeof details?.name === "string" ? details.name : "Error";
  const message = typeof details?.message === "string" ? details.message : String(error);
  const stack = typeof details?.stack === "string" ? details.stack : "";
  const location = stack.match(/solution\.js:(\d+)(?::\d+)?/);
  const isTimeout = /interrupted/i.test(message);
  const errorType = isTimeout ? "timeout" : fallbackType;

  return {
    error: isTimeout ? "Execution timed out. Check for an infinite loop or a solution that takes too long." : `${name}: ${message}`,
    errorType,
    errorLine: location ? Number(location[1]) : undefined,
  };
}

export async function judgeTwoSum(code: string): Promise<JudgeResult> {
  const QuickJS = await getQuickJS();
  const runtime = QuickJS.newRuntime();
  runtime.setMemoryLimit(16 * 1024 * 1024);
  runtime.setMaxStackSize(512 * 1024);
  const deadline = Date.now() + 1500;
  runtime.setInterruptHandler(() => Date.now() > deadline);
  const context = runtime.newContext();

  try {
    const solution = context.evalCode(code, "solution.js");

    if (solution.error) {
      const error = context.dump(solution.error);
      solution.error.dispose();
      return { passed: 0, total: testCases.length, score: 0, cases: [], ...getDiagnostic(error, "syntax") };
    }
    solution.value.dispose();

    const casesJson = JSON.stringify(testCases);
    const runner = context.evalCode(`
      (() => {
        if (typeof twoSum !== "function") {
          return JSON.stringify({ entrypointError: "Define a function named twoSum(nums, target)." });
        }
        const cases = ${casesJson};
        return JSON.stringify(cases.map(({ nums, target, expected }) => {
          const actual = twoSum(nums, target);
          const normalized = Array.isArray(actual) ? [...actual].sort((a, b) => a - b) : actual;
          const expectedNormalized = [...expected].sort((a, b) => a - b);
          return { passed: JSON.stringify(normalized) === JSON.stringify(expectedNormalized) };
        }));
      })()
    `, "assessment-runner.js");

    if (runner.error) {
      const error = context.dump(runner.error);
      runner.error.dispose();
      return { passed: 0, total: testCases.length, score: 0, cases: [], ...getDiagnostic(error, "runtime") };
    }

    const output = context.dump(runner.value);
    runner.value.dispose();
    if (typeof output !== "string") {
      return { passed: 0, total: testCases.length, score: 0, cases: [], error: "The solution did not return valid test results." };
    }

    const parsedOutput = JSON.parse(output) as Array<{ passed: boolean }> | { entrypointError: string };
    if (!Array.isArray(parsedOutput)) {
      return { passed: 0, total: testCases.length, score: 0, cases: [], error: parsedOutput.entrypointError, errorType: "entrypoint" };
    }

    const cases = parsedOutput;
    const passed = cases.filter((test) => test.passed).length;
    return { passed, total: testCases.length, score: Math.round((passed / testCases.length) * 100), cases };
  } catch (error) {
    return {
      passed: 0,
      total: testCases.length,
      score: 0,
      cases: [],
      ...getDiagnostic(error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error, "runtime"),
    };
  } finally {
    context.dispose();
    runtime.dispose();
  }
}