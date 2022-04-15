/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Image` table. All the data in the column will be lost.
  - Added the required column `coverExt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageExt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "sourceId",
ADD COLUMN     "coverExt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "sourceId",
ADD COLUMN     "imageExt" TEXT NOT NULL;
