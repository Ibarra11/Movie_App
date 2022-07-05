/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MediaToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MediaToUser" DROP CONSTRAINT "_MediaToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaToUser" DROP CONSTRAINT "_MediaToUser_B_fkey";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "_MediaToUser";

-- CreateTable
CREATE TABLE "TvSeries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "rating" TEXT NOT NULL,
    "isTrending" BOOLEAN NOT NULL,
    "trending_sm" TEXT,
    "trending_lg" TEXT,
    "regular_sm" TEXT NOT NULL,
    "regular_md" TEXT NOT NULL,
    "regular_lg" TEXT NOT NULL,

    CONSTRAINT "TvSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "rating" TEXT NOT NULL,
    "isTrending" BOOLEAN NOT NULL,
    "trending_sm" TEXT,
    "trending_lg" TEXT,
    "regular_sm" TEXT NOT NULL,
    "regular_md" TEXT NOT NULL,
    "regular_lg" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TvSeriesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TvSeriesToUser_AB_unique" ON "_TvSeriesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TvSeriesToUser_B_index" ON "_TvSeriesToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToUser_AB_unique" ON "_MovieToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToUser_B_index" ON "_MovieToUser"("B");

-- AddForeignKey
ALTER TABLE "_TvSeriesToUser" ADD CONSTRAINT "_TvSeriesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TvSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvSeriesToUser" ADD CONSTRAINT "_TvSeriesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD CONSTRAINT "_MovieToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD CONSTRAINT "_MovieToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
