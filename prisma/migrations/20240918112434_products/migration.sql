/*
  Warnings:

  - You are about to drop the column `colors` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `colors`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `color` JSON NOT NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL;
