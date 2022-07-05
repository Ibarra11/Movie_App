/*
  Warnings:

  - You are about to drop the column `category` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `TvSeries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "TvSeries" DROP COLUMN "category";

-- DropEnum
DROP TYPE "Category";
