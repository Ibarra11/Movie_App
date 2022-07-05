/*
  Warnings:

  - Added the required column `category` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `TvSeries` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TVSERIES', 'MOVIE');

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "TvSeries" ADD COLUMN     "category" "Category" NOT NULL;
