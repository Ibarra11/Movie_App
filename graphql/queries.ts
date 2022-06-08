import { gql } from "@apollo/client";

const GET_BOOKMARKED_MOVIES = gql`
  query getBookmarkedMovies {
    getBookmarkedMovies {
      id
      title
      year
      category
      rating
      isTrending
      trending_sm
      trending_lg
      regular_sm
      regular_md
      regular_lg
    }
  }
`;
