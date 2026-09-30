import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull().default(""),
  level: text("level").notNull().default("beginner"),
  explanationLanguage: text("explanation_language").notNull().default("none"),
  interests: jsonb("interests").notNull().default([]),
  dailyGoalMinutes: integer("daily_goal_minutes").notNull().default(10),
  onboarded: boolean("onboarded").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const authSessions = pgTable("auth_sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const practiceSessions = pgTable("practice_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  scenarioId: text("scenario_id").notNull(),
  scenarioVersion: integer("scenario_version").notNull().default(1),
  difficulty: text("difficulty").notNull().default("beginner"),
  personality: text("personality").notNull().default("friendly"),
  explanationLanguage: text("explanation_language").notNull().default("none"),
  status: text("status").notNull().default("active"),
  turnCount: integer("turn_count").notNull().default(0),
  speakingMs: integer("speaking_ms").notNull().default(0),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => practiceSessions.id, { onDelete: "cascade" }),
  turnIndex: integer("turn_index").notNull(),
  role: text("role").notNull(),
  submittedText: text("submitted_text").notNull(),
  rawTranscript: text("raw_transcript"),
  inputMode: text("input_mode").notNull().default("text"),
  edited: boolean("edited").notNull().default(false),
  assisted: boolean("assisted").notNull().default(false),
  usedSuggestionKind: text("used_suggestion_kind"),
  audioDurationMs: integer("audio_duration_ms"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const suggestionSets = pgTable("suggestion_sets", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => practiceSessions.id, { onDelete: "cascade" }),
  clientMessageId: uuid("client_message_id")
    .notNull()
    .references(() => messages.id, { onDelete: "cascade" })
    .unique(),
  directText: text("direct_text").notNull(),
  directWhy: text("direct_why").notNull(),
  directBn: text("direct_bn"),
  clarifyText: text("clarify_text").notNull(),
  clarifyWhy: text("clarify_why").notNull(),
  clarifyBn: text("clarify_bn"),
  nextStepText: text("next_step_text").notNull(),
  nextStepWhy: text("next_step_why").notNull(),
  nextStepBn: text("next_step_bn"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const assistanceEvents = pgTable("assistance_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => practiceSessions.id, { onDelete: "cascade" }),
  clientMessageId: uuid("client_message_id").references(() => messages.id, {
    onDelete: "cascade",
  }),
  eventType: text("event_type").notNull(),
  suggestionKind: text("suggestion_kind"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const vocabularyItems = pgTable("vocabulary_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  phrase: text("phrase").notNull(),
  meaning: text("meaning").notNull().default(""),
  meaningBn: text("meaning_bn"),
  topic: text("topic"),
  example: text("example"),
  sourceSessionId: uuid("source_session_id"),
  sourceMessageId: uuid("source_message_id"),
  practiced: boolean("practiced").notNull().default(false),
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => practiceSessions.id, { onDelete: "cascade" })
    .unique(),
  strengths: jsonb("strengths").notNull().default([]),
  improvements: jsonb("improvements").notNull().default([]),
  usefulPhrases: jsonb("useful_phrases").notNull().default([]),
  objectives: jsonb("objectives").notNull().default([]),
  scores: jsonb("scores").notNull().default({}),
  recommendedScenarioId: text("recommended_scenario_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const turnRequests = pgTable(
  "turn_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => practiceSessions.id, { onDelete: "cascade" }),
    clientRequestId: text("client_request_id").notNull(),
    userMessageId: uuid("user_message_id"),
    clientMessageId: uuid("client_message_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique("turn_requests_session_request_unique").on(table.sessionId, table.clientRequestId)],
).enableRLS();

// Scenarios generated from a pasted job post. The full Scenario object lives in
// `scenario` so the shape stays in sync with the built-in content without more columns.
export const customScenarios = pgTable(
  "custom_scenarios",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    category: text("category").notNull(),
    categoryLabel: text("category_label").notNull(),
    scenario: jsonb("scenario").notNull(),
    sourceText: text("source_text"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("custom_scenarios_user_id_idx").on(table.userId)],
).enableRLS();

export const usageCounters = pgTable(
  "usage_counters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    aiRequests: integer("ai_requests").notNull().default(0),
  },
  (table) => [unique("usage_counters_user_day_unique").on(table.userId, table.day)],
).enableRLS();
