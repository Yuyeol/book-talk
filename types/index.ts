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
  memos: Memo[];
  ok: boolean;
}
export interface IMemoResponse {
  memo: Memo;
  ok: boolean;
  isLiked: boolean;
  likeLength: number;
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
export interface ITagResponse {
  tag: Tag;
  ok: boolean;
  method: "POST" | "DELETE";
}
export interface ITagForm {
  name: string;
}

// User
export interface IUsersResponse {
  users: IUserWithRelations[];
  ok: boolean;
}
export interface IUserResponse {
  user: IUserWithRelations;
  ok: boolean;
}
export interface IUserWithRelations extends User {
  books: Book[];
  memos: Memo[];
  tags: Tag[];
  friendsTo: IUserWithRelations[];
}
export interface IProfileResponse {
  ok: boolean;
  user: Omit<User, "emailVerified">;
}

// Comment
export interface ICommentsResponse {
  comments: ICommentWithUser[];
  ok: boolean;
}
export interface ICommentResponse {
  comment: ICommentWithUser;
  ok: boolean;
  method: "POST" | "DELETE";
}
export interface ICommentWithUser extends Comment {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}

// Like
export interface ILikesResponse {
  likes: Like[];
  ok: boolean;
}
export interface ILikeResponse {
  like: Like;
  ok: boolean;
}
export interface ILikeWithUser extends Like {
  user: {
    name: string;
    nickname: string;
    image: string;
  };
  userId: string;
}

// Profile
export interface IProfileForm {
  nickname: string;
  bio?: string;
  image?: FileList;
}
