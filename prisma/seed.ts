import { PrismaClient } from "@prisma/client";
import type { Movie } from "../components/TrendingRow";
import data from "../data.json";
const prisma = new PrismaClient();

const movieData: Movie[] = data;

async function main() {
  // const deleteMovies = prisma.movie.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      password: "password123",
    },
  });

  //   for (const movie of movieData) {
  //     await prisma.movie.create({
  //       data: {
  //         title: movie.title,
  //         year: movie.year,
  //         category: movie.category,
  //         rating: movie.rating,
  //         isTrending: movie.isTrending,
  //         trending_sm: movie.thumbnail.trending?.small,
  //         trending_lg: movie.thumbnail.trending?.large,
  //         regular_sm: movie.thumbnail.regular.small,
  //         regular_md: movie.thumbnail.regular.medium,
  //         regular_lg: movie.thumbnail.regular.large,
  //       },
  //     });
  //   }
}

async function run() {
  // return 1;
  try {
    await main();
    await prisma.$disconnect();
    return null;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
export default run;

// export default
//  async () =>
//   main()
//     .catch((e) => {

//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
