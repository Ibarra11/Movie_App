import { gql } from "@apollo/client";

const GET_BOOKMARKED_MOVIES = gql`
  query getBookmarkedMovies {
    getBookmarkedMovies {
      id
    }
  }
`;
