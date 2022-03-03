/*
  Warnings:

  - Made the column `sourceId` on table `Album` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "colors" INTEGER[],
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "sourceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "colors" INTEGER[];
