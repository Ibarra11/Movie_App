/*
  Warnings:

  - You are about to drop the `TvSeries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TvSeriesToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TvSeriesToUser" DROP CONSTRAINT "_TvSeriesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TvSeriesToUser" DROP CONSTRAINT "_TvSeriesToUser_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "TvSeries";

-- DropTable
DROP TABLE "_TvSeriesToUser";
