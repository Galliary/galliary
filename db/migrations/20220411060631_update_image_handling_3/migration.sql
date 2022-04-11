/*
  Warnings:

  - You are about to drop the column `bannerSourceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannerSourceId",
ADD COLUMN     "bannerExt" TEXT NOT NULL DEFAULT E'png';
