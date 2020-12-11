/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type BookmarkInput = {
  id?: string | null,
  name?: string | null,
  url?: string | null,
  description?: string | null,
};

export type CreateBookmarkMutationVariables = {
  task?: BookmarkInput | null,
};

export type CreateBookmarkMutation = {
  createBookmark:  {
    __typename: "Bookmark",
    id: string | null,
    name: string | null,
    url: string | null,
    description: string | null,
  } | null,
};

export type ListBookmarkQuery = {
  listBookmark:  Array< {
    __typename: "Bookmark",
    id: string | null,
    name: string | null,
    url: string | null,
    description: string | null,
  } | null > | null,
};
