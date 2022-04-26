import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Album = {
  __typename?: 'Album';
  authorId: Scalars['String'];
  colors: Array<Scalars['Int']>;
  coverExt: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lockStatus: LockingStatus;
  rating: SafetyRating;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userFavouriteIds: Array<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  albumId: Scalars['String'];
  authorId: Scalars['String'];
  colors: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageExt: Scalars['String'];
  lockStatus: LockingStatus;
  rating: SafetyRating;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userFavouriteIds: Array<Scalars['String']>;
};

export type JwtResponse = {
  __typename?: 'JwtResponse';
  accessToken: Scalars['String'];
};

export enum LockingStatus {
  Hidden = 'HIDDEN',
  Locked = 'LOCKED',
  None = 'NONE'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum: Album;
  createImage: Image;
  createUser: Scalars['Boolean'];
  login: JwtResponse;
  reportAlbum: Scalars['Boolean'];
  reportImage: Scalars['Boolean'];
  reportUser: Scalars['Boolean'];
  updateAlbum: Scalars['Boolean'];
  updateAlbumCover: Scalars['Boolean'];
  updateImage: Scalars['Boolean'];
  updateImageFile: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
};


export type MutationCreateAlbumArgs = {
  colors: Array<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateImageArgs = {
  albumId: Scalars['String'];
  colors: Array<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  imageExt?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReportAlbumArgs = {
  albumId: Scalars['String'];
  reason: Scalars['String'];
};


export type MutationReportImageArgs = {
  imageId: Scalars['String'];
  reason: Scalars['String'];
};


export type MutationReportUserArgs = {
  reason: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateAlbumArgs = {
  albumId: Scalars['String'];
  input: UpdateAlbumInput;
};


export type MutationUpdateAlbumCoverArgs = {
  albumId: Scalars['String'];
  coverImage: Scalars['Upload'];
};


export type MutationUpdateImageArgs = {
  imageId: Scalars['String'];
  input: UpdateImageInput;
};


export type MutationUpdateImageFileArgs = {
  imageFile: Scalars['Upload'];
  imageId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  authorId: Scalars['String'];
  bio?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

export enum PremiumFeature {
  CustomProfile = 'CUSTOM_PROFILE',
  UnlimitedUploads = 'UNLIMITED_UPLOADS'
}

export type Query = {
  __typename?: 'Query';
  album?: Maybe<RichAlbum>;
  albums: Array<RichAlbum>;
  image?: Maybe<RichImage>;
  images: Array<RichImage>;
  report?: Maybe<Report>;
  reports: Array<Report>;
  reportsForAlbum: Array<Report>;
  reportsForImage: Array<Report>;
  reportsForUser: Array<Report>;
  searchAlbums: Array<SearchDocument>;
  searchImages: Array<SearchDocument>;
  searchUsers: Array<SearchUserDocument>;
  user?: Maybe<User>;
};


export type QueryAlbumArgs = {
  id: Scalars['String'];
};


export type QueryAlbumsArgs = {
  amount?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};


export type QueryImageArgs = {
  id: Scalars['String'];
};


export type QueryImagesArgs = {
  amount?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
};


export type QueryReportArgs = {
  id: Scalars['String'];
};


export type QueryReportsForAlbumArgs = {
  albumId: Scalars['String'];
};


export type QueryReportsForImageArgs = {
  imageId: Scalars['String'];
};


export type QueryReportsForUserArgs = {
  userId: Scalars['String'];
};


export type QuerySearchAlbumsArgs = {
  query: Scalars['String'];
};


export type QuerySearchImagesArgs = {
  query: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Report = {
  __typename?: 'Report';
  album?: Maybe<Album>;
  albumId?: Maybe<Scalars['String']>;
  assignee?: Maybe<User>;
  assigneeId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  image?: Maybe<Image>;
  imageId?: Maybe<Scalars['String']>;
  reason: Scalars['String'];
  reportee?: Maybe<User>;
  reporteeId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type RichAlbum = {
  __typename?: 'RichAlbum';
  authorId: Scalars['String'];
  colors: Array<Scalars['Int']>;
  coverExt: Scalars['String'];
  coverUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lockStatus: LockingStatus;
  rating: SafetyRating;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userFavouriteIds: Array<Scalars['String']>;
};

export type RichImage = {
  __typename?: 'RichImage';
  albumId: Scalars['String'];
  authorId: Scalars['String'];
  colors: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageExt: Scalars['String'];
  imageUrl: Scalars['String'];
  lockStatus: LockingStatus;
  rating: SafetyRating;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userFavouriteIds: Array<Scalars['String']>;
};

export enum SafetyRating {
  Mature = 'MATURE',
  NotSafe = 'NOT_SAFE',
  Safe = 'SAFE',
  Trusted = 'TRUSTED',
  Unknown = 'UNKNOWN'
}

export type SearchDocument = {
  __typename?: 'SearchDocument';
  authorId: Scalars['String'];
  authorName: Scalars['String'];
  colors: Array<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SearchUserDocument = {
  __typename?: 'SearchUserDocument';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UpdateAlbumInput = {
  colors?: InputMaybe<Array<Scalars['Int']>>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateImageInput = {
  colors?: InputMaybe<Array<Scalars['Int']>>;
  description?: InputMaybe<Scalars['String']>;
  imageExt?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  albums?: Maybe<Array<Album>>;
  avatarSourceId?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  badges: Array<UserBadge>;
  bannerExt: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  lockStatus: LockingStatus;
  nickname?: Maybe<Scalars['String']>;
  permissions: Scalars['Int'];
  premiumFeatures: Array<PremiumFeature>;
  updatedAt: Scalars['DateTime'];
  userFavouriteIds: Array<Scalars['String']>;
  username: Scalars['String'];
};

export enum UserBadge {
  Administrator = 'ADMINISTRATOR',
  Mature = 'MATURE',
  Moderator = 'MODERATOR',
  NotSafe = 'NOT_SAFE',
  Premium = 'PREMIUM',
  Safe = 'SAFE',
  Superadmin = 'SUPERADMIN',
  Trusted = 'TRUSTED'
}

export type CreateAlbumMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  colors: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreateAlbumMutation = { __typename?: 'Mutation', createAlbum: { __typename?: 'Album', id: string, title?: string | null, description?: string | null } };

export type UploadAlbumCoverMutationVariables = Exact<{
  albumId: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadAlbumCoverMutation = { __typename?: 'Mutation', success: boolean };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'JwtResponse', accessToken: string } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  bio?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', success: boolean };

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAlbumQuery = { __typename?: 'Query', album?: { __typename?: 'RichAlbum', id: string } | null };

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', albums: Array<{ __typename?: 'RichAlbum', id: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, bio?: string | null, email: string, badges: Array<UserBadge>, username: string, nickname?: string | null, avatarUrl?: string | null, updatedAt: any, createdAt: any, permissions: number } | null };


export const CreateAlbumDocument = gql`
    mutation CreateAlbum($title: String!, $description: String!, $colors: [Int!]!) {
  createAlbum(title: $title, description: $description, colors: $colors) {
    id
    title
    description
  }
}
    `;
export const UploadAlbumCoverDocument = gql`
    mutation UploadAlbumCover($albumId: String!, $file: Upload!) {
  success: updateAlbumCover(albumId: $albumId, coverImage: $file)
}
    `;
export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    accessToken
  }
}
    `;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $bio: String, $nickname: String) {
  success: createUser(
    email: $email
    username: $username
    password: $password
    bio: $bio
    nickname: $nickname
  )
}
    `;
export const GetAlbumDocument = gql`
    query GetAlbum($id: String!) {
  album(id: $id) {
    id
  }
}
    `;
export const GetAlbumsDocument = gql`
    query GetAlbums {
  albums {
    id
  }
}
    `;
export const CurrentUserDocument = gql`
    query CurrentUser {
  user {
    id
    bio
    email
    badges
    username
    nickname
    avatarUrl
    updatedAt
    createdAt
    permissions
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAlbum(variables: CreateAlbumMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAlbumMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAlbumMutation>(CreateAlbumDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAlbum', 'mutation');
    },
    UploadAlbumCover(variables: UploadAlbumCoverMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UploadAlbumCoverMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UploadAlbumCoverMutation>(UploadAlbumCoverDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadAlbumCover', 'mutation');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation');
    },
    Register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Register', 'mutation');
    },
    GetAlbum(variables: GetAlbumQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAlbumQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAlbumQuery>(GetAlbumDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAlbum', 'query');
    },
    GetAlbums(variables?: GetAlbumsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAlbumsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAlbumsQuery>(GetAlbumsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAlbums', 'query');
    },
    CurrentUser(variables?: CurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQuery>(CurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;