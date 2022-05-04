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
  favouriteAlbum: Scalars['Boolean'];
  favouriteImage: Scalars['Boolean'];
  favouriteUser: Scalars['Boolean'];
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


export type MutationFavouriteAlbumArgs = {
  albumId: Scalars['String'];
  unfavourite: Scalars['Boolean'];
};


export type MutationFavouriteImageArgs = {
  imageId: Scalars['String'];
  unfavourite: Scalars['Boolean'];
};


export type MutationFavouriteUserArgs = {
  unfavourite: Scalars['Boolean'];
  userId: Scalars['String'];
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
  favouriteAlbums?: Maybe<Array<Album>>;
  favouriteImages?: Maybe<Array<Image>>;
  favouriteUsers?: Maybe<Array<User>>;
  id: Scalars['String'];
  images?: Maybe<Array<Image>>;
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

export type FavouriteAlbumMutationVariables = Exact<{
  id: Scalars['String'];
  unfavourite: Scalars['Boolean'];
}>;


export type FavouriteAlbumMutation = { __typename?: 'Mutation', success: boolean };

export type FavouriteImageMutationVariables = Exact<{
  id: Scalars['String'];
  unfavourite: Scalars['Boolean'];
}>;


export type FavouriteImageMutation = { __typename?: 'Mutation', success: boolean };

export type FavouriteUserMutationVariables = Exact<{
  id: Scalars['String'];
  unfavourite: Scalars['Boolean'];
}>;


export type FavouriteUserMutation = { __typename?: 'Mutation', success: boolean };

export type CreateImageFragmentMutationVariables = Exact<{
  albumId: Scalars['String'];
}>;


export type CreateImageFragmentMutation = { __typename?: 'Mutation', image: { __typename?: 'Image', id: string } };

export type UploadImageMutationVariables = Exact<{
  imageId: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', success: boolean };

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAlbumQuery = { __typename?: 'Query', album?: { __typename?: 'RichAlbum', id: string } | null };

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', albums: Array<{ __typename?: 'RichAlbum', id: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, bio?: string | null, email: string, badges: Array<UserBadge>, username: string, nickname?: string | null, avatarUrl?: string | null, updatedAt: any, createdAt: any, permissions: number } | null };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, bio?: string | null, email: string, badges: Array<UserBadge>, username: string, nickname?: string | null, avatarUrl?: string | null, updatedAt: any, createdAt: any, bannerExt: string, userFavouriteIds: Array<string>, albums?: Array<{ __typename?: 'Album', id: string, title?: string | null, authorId: string, coverExt: string, colors: Array<number>, userFavouriteIds: Array<string> }> | null, images?: Array<{ __typename?: 'Image', id: string, title?: string | null, authorId: string, albumId: string, imageExt: string, colors: Array<number>, userFavouriteIds: Array<string> }> | null, favouriteAlbums?: Array<{ __typename?: 'Album', id: string, authorId: string, title?: string | null, coverExt: string, userFavouriteIds: Array<string> }> | null, favouriteImages?: Array<{ __typename?: 'Image', id: string, authorId: string, imageExt: string, albumId: string, title?: string | null, userFavouriteIds: Array<string> }> | null, favouriteUsers?: Array<{ __typename?: 'User', id: string, avatarUrl?: string | null, username: string, nickname?: string | null, userFavouriteIds: Array<string> }> | null } | null };


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
export const FavouriteAlbumDocument = gql`
    mutation FavouriteAlbum($id: String!, $unfavourite: Boolean!) {
  success: favouriteAlbum(albumId: $id, unfavourite: $unfavourite)
}
    `;
export const FavouriteImageDocument = gql`
    mutation FavouriteImage($id: String!, $unfavourite: Boolean!) {
  success: favouriteImage(imageId: $id, unfavourite: $unfavourite)
}
    `;
export const FavouriteUserDocument = gql`
    mutation FavouriteUser($id: String!, $unfavourite: Boolean!) {
  success: favouriteUser(userId: $id, unfavourite: $unfavourite)
}
    `;
export const CreateImageFragmentDocument = gql`
    mutation CreateImageFragment($albumId: String!) {
  image: createImage(albumId: $albumId, colors: [0, 0, 0]) {
    id
  }
}
    `;
export const UploadImageDocument = gql`
    mutation UploadImage($imageId: String!, $image: Upload!) {
  success: updateImageFile(imageId: $imageId, imageFile: $image)
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
export const UserProfileDocument = gql`
    query UserProfile($userId: String!) {
  user(id: $userId) {
    id
    bio
    email
    badges
    username
    nickname
    avatarUrl
    updatedAt
    createdAt
    bannerExt
    userFavouriteIds
    albums {
      id
      title
      authorId
      coverExt
      colors
      userFavouriteIds
    }
    images {
      id
      title
      authorId
      albumId
      imageExt
      colors
      userFavouriteIds
    }
    favouriteAlbums {
      id
      authorId
      title
      coverExt
      userFavouriteIds
    }
    favouriteImages {
      id
      authorId
      imageExt
      albumId
      title
      userFavouriteIds
    }
    favouriteUsers {
      id
      avatarUrl
      username
      nickname
      userFavouriteIds
    }
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
    FavouriteAlbum(variables: FavouriteAlbumMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FavouriteAlbumMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FavouriteAlbumMutation>(FavouriteAlbumDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FavouriteAlbum', 'mutation');
    },
    FavouriteImage(variables: FavouriteImageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FavouriteImageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FavouriteImageMutation>(FavouriteImageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FavouriteImage', 'mutation');
    },
    FavouriteUser(variables: FavouriteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FavouriteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FavouriteUserMutation>(FavouriteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FavouriteUser', 'mutation');
    },
    CreateImageFragment(variables: CreateImageFragmentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateImageFragmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateImageFragmentMutation>(CreateImageFragmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateImageFragment', 'mutation');
    },
    UploadImage(variables: UploadImageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UploadImageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UploadImageMutation>(UploadImageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UploadImage', 'mutation');
    },
    GetAlbum(variables: GetAlbumQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAlbumQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAlbumQuery>(GetAlbumDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAlbum', 'query');
    },
    GetAlbums(variables?: GetAlbumsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAlbumsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAlbumsQuery>(GetAlbumsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAlbums', 'query');
    },
    CurrentUser(variables?: CurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQuery>(CurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentUser', 'query');
    },
    UserProfile(variables: UserProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserProfileQuery>(UserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserProfile', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;