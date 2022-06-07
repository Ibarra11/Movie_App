import { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { Movie } from "@prisma/client";
import MovieGrid from "../components/MovieGrid";
const Movies: NextPage<{ movies: Movie[] }> = ({ movies }) => {
  return (
    <>
      <MovieGrid title="Movies" movies={movies} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const movies = allFilms.filter(({ category }) => category === "Movie");
  return {
    props: {
      movies,
      protected: true,
    },
  };
};

export default Movies;
