/*
  Warnings:

  - You are about to drop the column `assigned_by` on the `TaskAssignment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_assigned_by_fkey";

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "assigned_by";
