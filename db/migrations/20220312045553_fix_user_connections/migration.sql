/*
  Warnings:

  - A unique constraint covering the columns `[email,type]` on the table `UserConnection` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `UserConnection` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "UserConnection_userId_type_key";

-- AlterTable
ALTER TABLE "UserConnection" ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "UserConnection_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserConnection_email_type_key" ON "UserConnection"("email", "type");
