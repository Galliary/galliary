/*
  Warnings:

  - Added the required column `description` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PremiumFeature" AS ENUM ('NONE');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
