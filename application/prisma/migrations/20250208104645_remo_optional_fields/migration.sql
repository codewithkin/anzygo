/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `theme` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "theme" SET NOT NULL;
