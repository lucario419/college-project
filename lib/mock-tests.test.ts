import { describe, expect, it } from "vitest";
import { codeProblems, courses, studentProfile } from "./data/mock-data";
import { createSessionToken, createTokenHash, hashPassword, verifyPassword } from "./auth";
import { getTierSnapshot } from "./utils/tier";

describe("mock data and auth utilities", () => {
  it("hashes passwords in a way that is unique and verifiable", async () => {
    const firstHash = await hashPassword("Student@123");
    const secondHash = await hashPassword("Student@123");

    expect(firstHash).not.toBe(secondHash);
    expect(await verifyPassword("Student@123", firstHash)).toBe(true);
    expect(await verifyPassword("WrongPass@456", firstHash)).toBe(false);
  });

  it("rejects malformed hashes and keeps token creation consistent", async () => {
    expect(await verifyPassword("Student@123", "not-a-valid-hash")).toBe(false);
    expect(createTokenHash("token-value")).toMatch(/^[a-f0-9]{64}$/);
    expect(createSessionToken()).toMatch(/^[a-f0-9]+\.[a-f0-9]+\.[a-f0-9]+$/);
  });

  it("computes the expected tier progression for a student score", () => {
    const snapshot = getTierSnapshot(250);

    expect(snapshot.currentTier.id).toBe("achiever");
    expect(snapshot.currentRange).toBe("250-499");
    expect(snapshot.nextTier?.id).toBe("specialist");
    expect(snapshot.pointsToNextLevel).toBeGreaterThan(0);
    expect(snapshot.progressPercentage).toBeGreaterThanOrEqual(0);
  });

  it("keeps seeded mock data aligned with the app model", () => {
    expect(studentProfile.role).toBe("STUDENT");
    expect(studentProfile.email).toContain("@university.edu");
    expect(codeProblems.some((problem) => problem.id === "two-sum" && problem.title === "Two Sum")).toBe(true);
    expect(courses.some((course) => course.id === "dsa" && course.title.includes("Data Structures"))).toBe(true);
  });
});
