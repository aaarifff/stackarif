import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { customScenarios } from "@/db/schema";
import { getScenarioById, SCENARIOS } from "@/content/scenarios";
import type { Scenario } from "@/lib/types";

/** Custom scenarios are scoped to their owner; built-ins are global. */
export async function resolveScenarioForUser(
  userId: string,
  scenarioId: string,
): Promise<Scenario | undefined> {
  const builtIn = getScenarioById(scenarioId);
  if (builtIn) return builtIn;

  const rows = await getDb()
    .select()
    .from(customScenarios)
    .where(and(eq(customScenarios.id, scenarioId), eq(customScenarios.userId, userId)))
    .limit(1);

  return rows[0] ? (rows[0].scenario as Scenario) : undefined;
}

export async function listCustomScenarios(userId: string): Promise<Scenario[]> {
  const rows = await getDb()
    .select()
    .from(customScenarios)
    .where(eq(customScenarios.userId, userId))
    .orderBy(desc(customScenarios.createdAt));

  return rows.map((row) => row.scenario as Scenario);
}

/** All scenarios a user can practise: their own custom ones first, then built-ins. */
export async function listScenariosForUser(userId: string): Promise<Scenario[]> {
  const custom = await listCustomScenarios(userId);
  return [...custom, ...SCENARIOS];
}
