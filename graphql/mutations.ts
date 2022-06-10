import { gql } from "@apollo/client";
export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const ADD_BOOKMARK = gql`
  mutation addBookmark($movieId: Int!) {
    addBookmark(movieId: $movieId) {
      id
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($movieId: Int!) {
    removeBookmark(movieId: $movieId) {
      id
    }
  }
`;
