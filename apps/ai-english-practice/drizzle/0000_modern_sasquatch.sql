CREATE TABLE "assistance_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"client_message_id" uuid,
	"event_type" text NOT NULL,
	"suggestion_kind" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assistance_events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth_sessions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"turn_index" integer NOT NULL,
	"role" text NOT NULL,
	"submitted_text" text NOT NULL,
	"raw_transcript" text,
	"input_mode" text DEFAULT 'text' NOT NULL,
	"edited" boolean DEFAULT false NOT NULL,
	"assisted" boolean DEFAULT false NOT NULL,
	"used_suggestion_kind" text,
	"audio_duration_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "practice_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"scenario_id" text NOT NULL,
	"scenario_version" integer DEFAULT 1 NOT NULL,
	"difficulty" text DEFAULT 'beginner' NOT NULL,
	"personality" text DEFAULT 'friendly' NOT NULL,
	"explanation_language" text DEFAULT 'none' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"turn_count" integer DEFAULT 0 NOT NULL,
	"speaking_ms" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "practice_sessions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"strengths" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"improvements" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"useful_phrases" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"objectives" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"scores" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"recommended_scenario_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "suggestion_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"client_message_id" uuid NOT NULL,
	"direct_text" text NOT NULL,
	"direct_why" text NOT NULL,
	"direct_bn" text,
	"clarify_text" text NOT NULL,
	"clarify_why" text NOT NULL,
	"clarify_bn" text,
	"next_step_text" text NOT NULL,
	"next_step_why" text NOT NULL,
	"next_step_bn" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "suggestion_sets_client_message_id_unique" UNIQUE("client_message_id")
);
--> statement-breakpoint
ALTER TABLE "suggestion_sets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "turn_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"client_request_id" text NOT NULL,
	"user_message_id" uuid,
	"client_message_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "turn_requests_session_request_unique" UNIQUE("session_id","client_request_id")
);
--> statement-breakpoint
ALTER TABLE "turn_requests" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "usage_counters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"day" date NOT NULL,
	"ai_requests" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "usage_counters_user_day_unique" UNIQUE("user_id","day")
);
--> statement-breakpoint
ALTER TABLE "usage_counters" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"display_name" text DEFAULT '' NOT NULL,
	"level" text DEFAULT 'beginner' NOT NULL,
	"explanation_language" text DEFAULT 'none' NOT NULL,
	"interests" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"daily_goal_minutes" integer DEFAULT 10 NOT NULL,
	"onboarded" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "vocabulary_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"phrase" text NOT NULL,
	"meaning" text DEFAULT '' NOT NULL,
	"meaning_bn" text,
	"topic" text,
	"example" text,
	"source_session_id" uuid,
	"source_message_id" uuid,
	"practiced" boolean DEFAULT false NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vocabulary_items" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "assistance_events" ADD CONSTRAINT "assistance_events_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assistance_events" ADD CONSTRAINT "assistance_events_client_message_id_messages_id_fk" FOREIGN KEY ("client_message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practice_sessions" ADD CONSTRAINT "practice_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggestion_sets" ADD CONSTRAINT "suggestion_sets_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggestion_sets" ADD CONSTRAINT "suggestion_sets_client_message_id_messages_id_fk" FOREIGN KEY ("client_message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "turn_requests" ADD CONSTRAINT "turn_requests_session_id_practice_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."practice_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_counters" ADD CONSTRAINT "usage_counters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vocabulary_items" ADD CONSTRAINT "vocabulary_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;