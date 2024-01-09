/*
  Warnings:

  - A unique constraint covering the columns `[user_id,task_id]` on the table `TaskAssignment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_user_id_task_id_key" ON "TaskAssignment"("user_id", "task_id");
