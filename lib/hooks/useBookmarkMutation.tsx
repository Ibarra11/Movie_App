import {
  useRemoveBookmarkMutation,
  useAddBookmarkMutation,
} from "../../types/apollo-generated";

export const useBookmarkMutation = (isBookmarked: boolean) => {
  const [handleRemoveBookmark, { loading: removeBookmarkLoading }] =
    useRemoveBookmarkMutation();

  const [handleAddBookmark, { loading: addBookmarkLoading }] =
    useAddBookmarkMutation();

  const isLoading = isBookmarked ? removeBookmarkLoading : addBookmarkLoading;
  const bookmarkMutation = isBookmarked
    ? handleRemoveBookmark
    : handleAddBookmark;
  return [isLoading, bookmarkMutation] as const;
};
