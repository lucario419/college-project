-- Seed catalog assessments and the demo student accounts advertised on the login page.
INSERT INTO "assessments" ("id", "title", "category", "count", "description", "status") VALUES
  ('coding-two-sum', 'Coding Assessment: Two Sum', 'Screening Test', 1, 'Write a function that returns the indices of two numbers that add up to a target.', 'Open'),
  ('campus-2028', '2028_Campus_Assessments', 'Screening Test', 28, 'Campus aptitude and communication screening tests.', 'Open'),
  ('qalr-2028', 'QALR_2028', 'Screening Test', 12, 'Quantitative, analytical and language reasoning bundle.', 'Scheduled'),
  ('verbal-screening', 'Verbal Screening Round', 'Screening Test', 6, 'Reading comprehension and verbal reasoning practice.', 'Open'),
  ('coding-screening', 'Coding Screening Round', 'Screening Test', 9, 'Problem solving and coding basics.', 'Open'),
  ('aptitude-weekly', 'Aptitude Weekly Assessments', 'Aptitude', 20, 'Weekly aptitude drills for speed and accuracy.', 'Open'),
  ('aptitude-mock', 'Aptitude Mock Series', 'Aptitude', 8, 'Mock test series with detailed analytics.', 'Completed')
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "users" ("id", "name", "email", "password", "role") VALUES ('a0106dd8-fde2-42b3-a70d-3c520451ffec', 'UDAY REDDY YASA', 'student@university.edu', '5cb9e9bc149c18425466904d824a7149:20f0bc326eecf0e0169ab786633f4df37cf2c0f22932b903230e5f86d2fc6b3e4fdf4b704d53dc561556af9741c79a9cd45b147eb1381f4f6df69cee2c247f1e', 'STUDENT') ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_dashboards" ("id", "user_id") SELECT '661c0b33-73ef-469b-9a60-62026137c129', "id" FROM "users" WHERE "email" = 'student@university.edu' ON CONFLICT ("user_id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_course_progress" ("id", "dashboard_id", "course_id", "title") SELECT gen_random_uuid()::text, d."id", c."course_id", c."title" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN (VALUES ('dsa', 'Data Structures & Algorithms'), ('web-dev', 'Web Development'), ('dbms', 'Database Management'), ('java', 'Java Programming'), ('python', 'Python Programming'), ('ai', 'Artificial Intelligence')) AS c("course_id", "title") WHERE u."email" = 'student@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_assessment_progress" ("id", "dashboard_id", "assessment_id") SELECT gen_random_uuid()::text, d."id", a."id" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN "assessments" a WHERE u."email" = 'student@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "users" ("id", "name", "email", "password", "role") VALUES ('4d138838-82b1-4df9-811b-1ee0057bbd5e', 'PRIYA SHARMA', 'priya@university.edu', '30d42b3814fbd035b48558fcd4de8891:77546c0f9baa30a33399435229e02fb3cfbe986b8160197ed7df97cc2c6a1623220b8d57c85edb3af7c3fe943ff4c9b36be035124ff44e14fc0bc6137db7ca73', 'STUDENT') ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_dashboards" ("id", "user_id") SELECT 'd2939609-6911-450e-a11e-6852acadcc87', "id" FROM "users" WHERE "email" = 'priya@university.edu' ON CONFLICT ("user_id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_course_progress" ("id", "dashboard_id", "course_id", "title") SELECT gen_random_uuid()::text, d."id", c."course_id", c."title" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN (VALUES ('dsa', 'Data Structures & Algorithms'), ('web-dev', 'Web Development'), ('dbms', 'Database Management'), ('java', 'Java Programming'), ('python', 'Python Programming'), ('ai', 'Artificial Intelligence')) AS c("course_id", "title") WHERE u."email" = 'priya@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_assessment_progress" ("id", "dashboard_id", "assessment_id") SELECT gen_random_uuid()::text, d."id", a."id" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN "assessments" a WHERE u."email" = 'priya@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "users" ("id", "name", "email", "password", "role") VALUES ('542442dc-8f9d-4d08-af79-6692bba30853', 'ARUN KUMAR', 'arun@university.edu', '582424bdbf7456d66e14314a8830ac75:c349981084c47f670f05f607be6139516958154a63009f6aff45f93857095ae86158beb38e2c8bdd218028dbba17dc10d92c2632f1307d6a8c79aafd7c939d35', 'STUDENT') ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_dashboards" ("id", "user_id") SELECT '6d23ee69-d146-4b1e-a8b0-8fa68a430b82', "id" FROM "users" WHERE "email" = 'arun@university.edu' ON CONFLICT ("user_id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_course_progress" ("id", "dashboard_id", "course_id", "title") SELECT gen_random_uuid()::text, d."id", c."course_id", c."title" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN (VALUES ('dsa', 'Data Structures & Algorithms'), ('web-dev', 'Web Development'), ('dbms', 'Database Management'), ('java', 'Java Programming'), ('python', 'Python Programming'), ('ai', 'Artificial Intelligence')) AS c("course_id", "title") WHERE u."email" = 'arun@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_assessment_progress" ("id", "dashboard_id", "assessment_id") SELECT gen_random_uuid()::text, d."id", a."id" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN "assessments" a WHERE u."email" = 'arun@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "users" ("id", "name", "email", "password", "role") VALUES ('861d2997-0cf4-48fa-9b11-8d8125b432bd', 'MEERA NAIR', 'meera@university.edu', 'bdc5b9737a0937e90bee162056d44cd3:65b857318c5882c1a6656909093c455d6dde6355b7a4d80b27b54da9aef03be15f25c9202927b1e906f79265f941cd16625ea0dad91487bb1cfc71ab6687a67b', 'STUDENT') ON CONFLICT ("email") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_dashboards" ("id", "user_id") SELECT '20a1cee0-523a-4280-83af-ad6d49fd8630', "id" FROM "users" WHERE "email" = 'meera@university.edu' ON CONFLICT ("user_id") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_course_progress" ("id", "dashboard_id", "course_id", "title") SELECT gen_random_uuid()::text, d."id", c."course_id", c."title" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN (VALUES ('dsa', 'Data Structures & Algorithms'), ('web-dev', 'Web Development'), ('dbms', 'Database Management'), ('java', 'Java Programming'), ('python', 'Python Programming'), ('ai', 'Artificial Intelligence')) AS c("course_id", "title") WHERE u."email" = 'meera@university.edu' ON CONFLICT DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_assessment_progress" ("id", "dashboard_id", "assessment_id") SELECT gen_random_uuid()::text, d."id", a."id" FROM "user_dashboards" d JOIN "users" u ON u."id" = d."user_id" CROSS JOIN "assessments" a WHERE u."email" = 'meera@university.edu' ON CONFLICT DO NOTHING;
