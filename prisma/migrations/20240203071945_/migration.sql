/*
  Warnings:

  - You are about to alter the column `room` on the `Santri` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `classroom` on the `Santri` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Santri` MODIFY `room` INTEGER NOT NULL,
    MODIFY `classroom` INTEGER NOT NULL;
