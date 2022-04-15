/*
  Warnings:

  - Made the column `coverExt` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageExt` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "coverExt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "imageExt" SET NOT NULL;
