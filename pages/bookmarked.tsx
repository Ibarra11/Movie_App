import { useGetBookmarkedMoviesQuery } from "../types/apollo-generated";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "@prisma/client";

const BookMarked = () => {
  const { data, loading, error } = useGetBookmarkedMoviesQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  console.log(data);
  const bookmarkedMovies = data
    ? (data.getBookmarkedMovies.filter(
        ({ category }) => category === "Movie"
      ) as Movie[])
    : ([] as Movie[]);
  const bookmarkedTvSeries = data
    ? (data.getBookmarkedMovies.filter(
        ({ category }) => category === "TV Series"
      ) as Movie[])
    : ([] as Movie[]);
  console.log(bookmarkedMovies);
  return (
    <div className="flex flex-col xl:gap-10 ">
      <MovieGrid movies={bookmarkedMovies} title="Bookmarked Movies" />
      <MovieGrid movies={bookmarkedTvSeries} title="Bookmarked TV Series" />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     const user = req.session.user;
//     if (!user) {
//       return {
//         redirect: "/account/login",
//       };
//     }

//     const films = awai
//   },
//   sessionOptions
// );

export default BookMarked;
