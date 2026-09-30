CREATE TABLE "custom_scenarios" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"category_label" text NOT NULL,
	"scenario" jsonb NOT NULL,
	"source_text" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "custom_scenarios" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "custom_scenarios" ADD CONSTRAINT "custom_scenarios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "custom_scenarios_user_id_idx" ON "custom_scenarios" USING btree ("user_id");