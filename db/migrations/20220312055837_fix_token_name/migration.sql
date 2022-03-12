/*
  Warnings:

  - You are about to drop the column `authToken` on the `UserConnection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserConnection" DROP COLUMN "authToken",
ADD COLUMN     "accessToken" TEXT;
