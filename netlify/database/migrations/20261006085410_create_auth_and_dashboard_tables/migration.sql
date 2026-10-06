CREATE TABLE "assessments" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"description" text,
	"status" text DEFAULT 'Open' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY,
	"token_hash" text NOT NULL UNIQUE,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_activities" (
	"id" text PRIMARY KEY,
	"dashboard_id" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_assessment_progress" (
	"id" text PRIMARY KEY,
	"dashboard_id" text NOT NULL,
	"assessment_id" text NOT NULL,
	"status" text DEFAULT 'Not started' NOT NULL,
	"score" integer,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_course_progress" (
	"id" text PRIMARY KEY,
	"dashboard_id" text NOT NULL,
	"course_id" text NOT NULL,
	"title" text NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_dashboards" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL UNIQUE,
	"points" integer DEFAULT 0 NOT NULL,
	"coding_streak" integer DEFAULT 0 NOT NULL,
	"weekly_progress" integer DEFAULT 0 NOT NULL,
	"completed_assessments" integer DEFAULT 0 NOT NULL,
	"coding_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"role" text DEFAULT 'STUDENT' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "user_activities_dashboard_created_idx" ON "user_activities" ("dashboard_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "user_assessment_progress_dashboard_assessment_idx" ON "user_assessment_progress" ("dashboard_id","assessment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_course_progress_dashboard_course_idx" ON "user_course_progress" ("dashboard_id","course_id");--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_dashboard_id_user_dashboards_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "user_dashboards"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_assessment_progress" ADD CONSTRAINT "user_assessment_progress_dashboard_id_user_dashboards_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "user_dashboards"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_assessment_progress" ADD CONSTRAINT "user_assessment_progress_assessment_id_assessments_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_dashboard_id_user_dashboards_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "user_dashboards"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_dashboards" ADD CONSTRAINT "user_dashboards_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;