/*
  Warnings:

  - A unique constraint covering the columns `[chatId,userId]` on the table `ChatUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatUser_chatId_userId_key" ON "ChatUser"("chatId", "userId");
