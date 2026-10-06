import { NextResponse } from "next/server";
import { courses, lsrwScores, studentProfile } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      student: studentProfile,
      completedCourses: courses.filter((course) => course.progress === 100).length,
      lsrw: lsrwScores,
      overallProgress: Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length),
    },
  });
}
