/*
  Warnings:

  - Added the required column `department` to the `ConsumerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConsumerProfile" ADD COLUMN     "department" TEXT NOT NULL;
