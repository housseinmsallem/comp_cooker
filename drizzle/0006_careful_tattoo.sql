CREATE TABLE "characters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "characters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_raidId_raids_id_fk";
--> statement-breakpoint
ALTER TABLE "raids" ADD COLUMN "game" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "raids" ADD COLUMN "userId" integer;--> statement-breakpoint
ALTER TABLE "raids" ADD CONSTRAINT "raids_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "raidId";