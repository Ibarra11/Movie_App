import { PrismaClient } from "@prisma/client";
import type { Movie } from "../components/TrendingRow";
import data from "../data.json";
const prisma = new PrismaClient();

const movieData: Movie[] = data;

async function main() {
  console.log("start seeding");
  for (const movie of movieData) {
    await prisma.movie.create({
      data: {
        title: movie.title,
        year: movie.year,
        category: movie.category,
        rating: movie.rating,
        isBookmarked: movie.isBookmarked,
        isTrending: movie.isTrending,
        trending_sm: movie.thumbnail.trending?.small,
        trending_lg: movie.thumbnail.trending?.large,
        regular_sm: movie.thumbnail.regular.small,
        regular_md: movie.thumbnail.regular.medium,
        regular_lg: movie.thumbnail.regular.large,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log("test");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
