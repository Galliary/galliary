/*
  Warnings:

  - The primary key for the `UserConnection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserConnection" DROP CONSTRAINT "UserConnection_pkey";
