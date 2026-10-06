import { NextResponse } from "next/server";
import { z } from "zod";
import { Judge0CodeExecutionService } from "@/lib/services/code-execution";

const executionSchema = z.object({
  language: z.enum(["Java", "Python", "C++", "JavaScript", "TypeScript"]),
  code: z.string().min(1),
  input: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = executionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid execution payload" } }, { status: 400 });
    }

    const service = new Judge0CodeExecutionService();
    const result = await service.execute(parsed.data);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: "EXECUTION_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
