import { Book, Like, Memo, Tag, Comment, User } from "@prisma/client";

// Book
export interface IBooksResponse {
  books: IBookWithTags[];
  ok: boolean;
}
export interface IBookResponse {
  book: IBookWithTags;
  ok: boolean;
}
export interface IBookWithTags extends Book {
  tags: Tag[];
}
export interface IBookForm {
  title: string;
  description?: string;
  author?: string;
  image?: FileList;
}

// Memo
export interface IMemosResponse {
  memos: IMemoWithReactions[];
  ok: boolean;
}
export interface IMemoResponse {
  memo: Memo;
  ok: boolean;
}
export interface IMemoWithReactions extends Memo {
  comments: ICommentWithUser[];
  likes: ILikeWithUser[];
}
export interface ICommentWithUser extends Comment {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}
export interface ILikeWithUser extends Like {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}
export interface IMemosResponse {
  memos: IMemoWithReactions[];
  ok: boolean;
}
export interface IMemoForm {
  page?: number;
  content: string;
}

// Tag
export interface ITagsResponse {
  tags: Tag[];
  ok: boolean;
}
export interface ITagForm {
  name: string;
}

// User
export interface IUserWithBooks extends User {
  books: Book[];
}
export interface IUserWithFriends extends IUserWithBooks {
  friendsTo: IUserWithBooks[];
}