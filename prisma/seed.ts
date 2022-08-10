import { PrismaClient } from "@prisma/client";
import type { Movie } from "../components/TrendingRow";
import { hashPassword } from "../lib/encrypt";
import data from "../data.json";
const prisma = new PrismaClient();

const movieData: Movie[] = data;

async function main() {
  await prisma.movie.deleteMany({});
  await prisma.user.deleteMany({});

  const password = await hashPassword("password123");

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      password,
    },
  });
  // I just seed the database different based on if its called direclty in development or I just use it for testing
  if (require.main === module) {
    for (const movie of movieData) {
      await prisma.movie.create({
        data: {
          title: movie.title,
          year: movie.year,
          category: movie.category,
          rating: movie.rating,
          isTrending: movie.isTrending,
          trending_sm: movie.thumbnail.trending?.small,
          trending_lg: movie.thumbnail.trending?.large,
          regular_sm: movie.thumbnail.regular.small,
          regular_md: movie.thumbnail.regular.medium,
          regular_lg: movie.thumbnail.regular.large,
        },
      });
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const movie = movieData[i];
      await prisma.movie.create({
        data: {
          title: movie.title,
          year: movie.year,
          category: movie.category,
          rating: movie.rating,
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
}
// called directly - npx prisma db seed
if (require.main === module) {
  run();
}

async function run() {
  // return 1;
  try {
    await main();
    return null;
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
export default run;
