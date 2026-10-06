import { describe, expect, it } from "vitest";
import { createSessionToken, hashPassword, verifyPassword } from "./auth";

describe("auth helpers", () => {
  it("hashes and verifies a password", async () => {
    const hash = await hashPassword("MyPass123!");

    expect(hash).not.toBe("MyPass123!");
    expect(await verifyPassword("MyPass123!", hash)).toBe(true);
    expect(await verifyPassword("WrongPass123!", hash)).toBe(false);
  });

  it("creates a signed session token", () => {
    const token = createSessionToken();

    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });
});
