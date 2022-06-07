import { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { Movie } from "@prisma/client";
import MovieGrid from "../components/MovieGrid";
const TvSeries: NextPage<{ tvSeries: Movie[] }> = ({ tvSeries }) => {
  return (
    <>
      <MovieGrid title="Movies" movies={tvSeries} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const tvSeries = allFilms.filter(({ category }) => category === "TV Series");
  return {
    props: {
      tvSeries,
      protected: true,
    },
  };
};

export default TvSeries;
