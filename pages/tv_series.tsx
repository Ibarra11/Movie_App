import { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { Movie } from "@prisma/client";
import MovieGrid from "../components/MovieGrid";
const TvSeries: NextPage<{ tvSeries: Movie[]; searchValue: string }> & {
  protected: boolean;
} = ({ tvSeries, searchValue }) => {
  return (
    <>
      <MovieGrid
        searchValue={searchValue}
        title="Tv Series"
        movies={tvSeries}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allFilms = await prisma.movie.findMany();
  const tvSeries = allFilms.filter(({ category }) => category === "TV Series");
  return {
    props: {
      tvSeries,
    },
  };
};
TvSeries.protected = true;
export default TvSeries;
