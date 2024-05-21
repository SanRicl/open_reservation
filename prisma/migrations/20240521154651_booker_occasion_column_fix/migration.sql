/*
  Warnings:

  - You are about to drop the column `booker_occasion` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "booker_occasion",
ADD COLUMN     "booker_occasion" TEXT;
