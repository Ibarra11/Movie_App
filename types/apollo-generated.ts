import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Movie = {
  __typename?: 'Movie';
  category: Scalars['String'];
  id: Scalars['Int'];
  isTrending: Scalars['Boolean'];
  rating: Scalars['String'];
  regular_lg: Scalars['String'];
  regular_md: Scalars['String'];
  regular_sm: Scalars['String'];
  title: Scalars['String'];
  trending_lg?: Maybe<Scalars['String']>;
  trending_sm?: Maybe<Scalars['String']>;
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookmark: Movie;
  login?: Maybe<User>;
  signup: User;
};


export type MutationAddBookmarkArgs = {
  movieId: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllMovies: Array<Movie>;
  getBookmarkedMovies: Array<Movie>;
};

export type User = {
  __typename?: 'User';
  bookmarks: Array<Movie>;
  email: Scalars['String'];
  id: Scalars['Int'];
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: number, email: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, email: string } | null };

export type AddBookmarkMutationVariables = Exact<{
  movieId: Scalars['Int'];
}>;


export type AddBookmarkMutation = { __typename?: 'Mutation', addBookmark: { __typename?: 'Movie', id: number } };

export type GetBookmarkedMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarkedMoviesQuery = { __typename?: 'Query', getBookmarkedMovies: Array<{ __typename?: 'Movie', id: number, title: string, year: number, category: string, rating: string, isTrending: boolean, trending_sm?: string | null, trending_lg?: string | null, regular_sm: string, regular_md: string, regular_lg: string }> };


export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    id
    email
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const AddBookmarkDocument = gql`
    mutation addBookmark($movieId: Int!) {
  addBookmark(movieId: $movieId) {
    id
  }
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useAddBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddBookmarkMutation, AddBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(AddBookmarkDocument, options);
      }
export type AddBookmarkMutationHookResult = ReturnType<typeof useAddBookmarkMutation>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const GetBookmarkedMoviesDocument = gql`
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

/**
 * __useGetBookmarkedMoviesQuery__
 *
 * To run a query within a React component, call `useGetBookmarkedMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookmarkedMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookmarkedMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookmarkedMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetBookmarkedMoviesQuery, GetBookmarkedMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookmarkedMoviesQuery, GetBookmarkedMoviesQueryVariables>(GetBookmarkedMoviesDocument, options);
      }
export function useGetBookmarkedMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookmarkedMoviesQuery, GetBookmarkedMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookmarkedMoviesQuery, GetBookmarkedMoviesQueryVariables>(GetBookmarkedMoviesDocument, options);
        }
export type GetBookmarkedMoviesQueryHookResult = ReturnType<typeof useGetBookmarkedMoviesQuery>;
export type GetBookmarkedMoviesLazyQueryHookResult = ReturnType<typeof useGetBookmarkedMoviesLazyQuery>;
export type GetBookmarkedMoviesQueryResult = Apollo.QueryResult<GetBookmarkedMoviesQuery, GetBookmarkedMoviesQueryVariables>;