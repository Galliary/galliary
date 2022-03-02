/*
  Warnings:

  - You are about to drop the column `srcUrl` on the `Image` table. All the data in the column will be lost.
  - Added the required column `sourceId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "srcUrl",
ADD COLUMN     "sourceId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
