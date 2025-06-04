ALTER TABLE "characters" ADD COLUMN "tier" varchar(255);--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "raidId" integer;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_raidId_raids_id_fk" FOREIGN KEY ("raidId") REFERENCES "public"."raids"("id") ON DELETE no action ON UPDATE no action;