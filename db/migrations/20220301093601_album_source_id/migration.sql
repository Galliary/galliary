/*
  Warnings:

  - Added the required column `sourceId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "sourceId" TEXT NOT NULL;
