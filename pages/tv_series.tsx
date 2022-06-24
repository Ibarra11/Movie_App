import { NextPage, GetStaticProps } from "next";
import { prisma } from "../lib/prisma";
import { Movie } from "@prisma/client";
import MovieGrid from "../components/MovieGrid";
import { ProtectedPage } from "../types";
const TvSeries: ProtectedPage<{ tvSeries: Movie[]; searchValue: string }> = ({
  tvSeries,
  searchValue,
}) => {
  return (
    <>
      <MovieGrid searchValue={searchValue} title="Tv Series" films={tvSeries} />
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
