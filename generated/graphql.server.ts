import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
type Maybe<T> = T | null
type InputMaybe<T> = Maybe<T>
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

type Album = {
  __typename?: 'Album'
  author?: Maybe<User>
  authorId: Scalars['String']
  colors: Array<Scalars['Int']>
  coverExt: Scalars['String']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  groupId?: Maybe<Scalars['String']>
  id: Scalars['String']
  images?: Maybe<Array<Image>>
  lockStatus: LockingStatus
  rating: SafetyRating
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  userFavouriteIds: Array<Scalars['String']>
  userFavourites?: Maybe<Array<User>>
}

type GetImageArgs = {
  amount?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<Scalars['Int']>
}

type Image = {
  __typename?: 'Image'
  album: Album
  albumId: Scalars['String']
  author?: Maybe<User>
  authorId: Scalars['String']
  colors: Array<Scalars['Int']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  groupId?: Maybe<Scalars['String']>
  id: Scalars['String']
  imageExt: Scalars['String']
  lockStatus: LockingStatus
  rating: SafetyRating
  title?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  userFavouriteIds: Array<Scalars['String']>
  userFavourites?: Maybe<Array<User>>
}

type JwtResponse = {
  __typename?: 'JwtResponse'
  accessToken: Scalars['String']
}

enum LockingStatus {
  Hidden = 'HIDDEN',
  Locked = 'LOCKED',
  None = 'NONE',
}

type Mutation = {
  __typename?: 'Mutation'
  createAlbum: Album
  createImage: Image
  createUser: Scalars['Boolean']
  deleteAlbum: Scalars['Boolean']
  deleteImage: Scalars['Boolean']
  favouriteAlbum: Scalars['Boolean']
  favouriteImage: Scalars['Boolean']
  favouriteUser: Scalars['Boolean']
  login: JwtResponse
  reportAlbum: Scalars['Boolean']
  reportImage: Scalars['Boolean']
  reportUser: Scalars['Boolean']
  updateAlbum: Album
  updateImage: Image
  updateUser: Scalars['Boolean']
}

type MutationCreateAlbumArgs = {
  colors: Array<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

type MutationCreateImageArgs = {
  albumId: Scalars['String']
  colors: Array<Scalars['Int']>
  description?: InputMaybe<Scalars['String']>
  imageExt?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

type MutationCreateUserArgs = {
  bio?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  nickname?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

type MutationDeleteAlbumArgs = {
  albumId: Scalars['String']
}

type MutationDeleteImageArgs = {
  imageId: Scalars['String']
}

type MutationFavouriteAlbumArgs = {
  albumId: Scalars['String']
  unfavourite: Scalars['Boolean']
}

type MutationFavouriteImageArgs = {
  imageId: Scalars['String']
  unfavourite: Scalars['Boolean']
}

type MutationFavouriteUserArgs = {
  unfavourite: Scalars['Boolean']
  userId: Scalars['String']
}

type MutationLoginArgs = {
  emailOrUsername: Scalars['String']
  password: Scalars['String']
}

type MutationReportAlbumArgs = {
  albumId: Scalars['String']
  reason: Scalars['String']
}

type MutationReportImageArgs = {
  imageId: Scalars['String']
  reason: Scalars['String']
}

type MutationReportUserArgs = {
  reason: Scalars['String']
  userId: Scalars['String']
}

type MutationUpdateAlbumArgs = {
  albumId: Scalars['String']
  input: UpdateAlbumInput
}

type MutationUpdateImageArgs = {
  imageId: Scalars['String']
  input: UpdateImageInput
}

type MutationUpdateUserArgs = {
  authorId: Scalars['String']
  bio?: InputMaybe<Scalars['String']>
  nickname?: InputMaybe<Scalars['String']>
}

enum PremiumFeature {
  CustomProfile = 'CUSTOM_PROFILE',
  UnlimitedUploads = 'UNLIMITED_UPLOADS',
}

type Query = {
  __typename?: 'Query'
  album?: Maybe<Album>
  albums: Array<Album>
  image?: Maybe<Image>
  images: Array<Image>
  imagesForAlbum: Array<Image>
  report?: Maybe<Report>
  reports: Array<Report>
  reportsForAlbum: Array<Report>
  reportsForImage: Array<Report>
  reportsForUser: Array<Report>
  searchAlbums: Array<SearchDocument>
  searchImages: Array<SearchDocument>
  searchUsers: Array<SearchUserDocument>
  user?: Maybe<User>
}

type QueryAlbumArgs = {
  id: Scalars['String']
}

type QueryAlbumsArgs = {
  amount?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<Scalars['Int']>
}

type QueryImageArgs = {
  id: Scalars['String']
}

type QueryImagesArgs = {
  amount?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<Scalars['Int']>
}

type QueryImagesForAlbumArgs = {
  albumId: Scalars['String']
  args: GetImageArgs
}

type QueryReportArgs = {
  id: Scalars['String']
}

type QueryReportsForAlbumArgs = {
  albumId: Scalars['String']
}

type QueryReportsForImageArgs = {
  imageId: Scalars['String']
}

type QueryReportsForUserArgs = {
  userId: Scalars['String']
}

type QuerySearchAlbumsArgs = {
  query: Scalars['String']
}

type QuerySearchImagesArgs = {
  query: Scalars['String']
}

type QuerySearchUsersArgs = {
  query: Scalars['String']
}

type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']>
}

type Report = {
  __typename?: 'Report'
  album?: Maybe<Album>
  albumId?: Maybe<Scalars['String']>
  assignee?: Maybe<User>
  assigneeId?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  image?: Maybe<Image>
  imageId?: Maybe<Scalars['String']>
  reason: Scalars['String']
  reportee?: Maybe<User>
  reporteeId?: Maybe<Scalars['String']>
  user?: Maybe<User>
  userId?: Maybe<Scalars['String']>
}

enum SafetyRating {
  Mature = 'MATURE',
  NotSafe = 'NOT_SAFE',
  Safe = 'SAFE',
  Trusted = 'TRUSTED',
  Unknown = 'UNKNOWN',
}

type SearchDocument = {
  __typename?: 'SearchDocument'
  authorId: Scalars['String']
  colors: Array<Scalars['Int']>
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  id: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

type SearchUserDocument = {
  __typename?: 'SearchUserDocument'
  bio?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  nickname?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

type UpdateAlbumInput = {
  colors?: InputMaybe<Array<Scalars['Int']>>
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

type UpdateImageInput = {
  colors?: InputMaybe<Array<Scalars['Int']>>
  description?: InputMaybe<Scalars['String']>
  imageExt?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

type User = {
  __typename?: 'User'
  albums?: Maybe<Array<Album>>
  avatarSourceId?: Maybe<Scalars['String']>
  avatarUrl?: Maybe<Scalars['String']>
  badges: Array<UserBadge>
  bannerExt: Scalars['String']
  bio?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  favouriteAlbums?: Maybe<Array<Album>>
  favouriteImages?: Maybe<Array<Image>>
  favouriteUsers?: Maybe<Array<User>>
  id: Scalars['String']
  images?: Maybe<Array<Image>>
  lockStatus: LockingStatus
  nickname?: Maybe<Scalars['String']>
  permissions: Scalars['Int']
  premiumFeatures: Array<PremiumFeature>
  updatedAt: Scalars['DateTime']
  userFavouriteIds: Array<Scalars['String']>
  userFavourites?: Maybe<Array<User>>
  username: Scalars['String']
}

type UserAlbumsArgs = {
  skip?: InputMaybe<Scalars['Float']>
  take?: InputMaybe<Scalars['Float']>
}

type UserFavouriteAlbumsArgs = {
  skip?: InputMaybe<Scalars['Float']>
  take?: InputMaybe<Scalars['Float']>
}

type UserFavouriteImagesArgs = {
  skip?: InputMaybe<Scalars['Float']>
  take?: InputMaybe<Scalars['Float']>
}

type UserFavouriteUsersArgs = {
  skip?: InputMaybe<Scalars['Float']>
  take?: InputMaybe<Scalars['Float']>
}

type UserImagesArgs = {
  skip?: InputMaybe<Scalars['Float']>
  take?: InputMaybe<Scalars['Float']>
}

enum UserBadge {
  Administrator = 'ADMINISTRATOR',
  Mature = 'MATURE',
  Moderator = 'MODERATOR',
  NotSafe = 'NOT_SAFE',
  Premium = 'PREMIUM',
  Safe = 'SAFE',
  Superadmin = 'SUPERADMIN',
  Trusted = 'TRUSTED',
}

type CreateAlbumMutationVariables = Exact<{
  title: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  colors?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
}>

type CreateAlbumMutation = {
  __typename?: 'Mutation'
  album: {
    __typename?: 'Album'
    id: string
    title?: string | null
    description?: string | null
  }
}

type UpdateAlbumMutationVariables = Exact<{
  albumId: Scalars['String']
  input: UpdateAlbumInput
}>

type UpdateAlbumMutation = {
  __typename?: 'Mutation'
  album: {
    __typename?: 'Album'
    id: string
    title?: string | null
    description?: string | null
  }
}

type DeleteAlbumMutationVariables = Exact<{
  albumId: Scalars['String']
}>

type DeleteAlbumMutation = { __typename?: 'Mutation'; success: boolean }

type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String']
  password: Scalars['String']
}>

type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'JwtResponse'; accessToken: string }
}

type RegisterMutationVariables = Exact<{
  email: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  bio?: InputMaybe<Scalars['String']>
  nickname?: InputMaybe<Scalars['String']>
}>

type RegisterMutation = { __typename?: 'Mutation'; success: boolean }

type FavouriteAlbumMutationVariables = Exact<{
  id: Scalars['String']
  unfavourite: Scalars['Boolean']
}>

type FavouriteAlbumMutation = { __typename?: 'Mutation'; success: boolean }

type FavouriteImageMutationVariables = Exact<{
  id: Scalars['String']
  unfavourite: Scalars['Boolean']
}>

type FavouriteImageMutation = { __typename?: 'Mutation'; success: boolean }

type FavouriteUserMutationVariables = Exact<{
  id: Scalars['String']
  unfavourite: Scalars['Boolean']
}>

type FavouriteUserMutation = { __typename?: 'Mutation'; success: boolean }

type CreateImageFragmentMutationVariables = Exact<{
  albumId: Scalars['String']
}>

type CreateImageFragmentMutation = {
  __typename?: 'Mutation'
  image: { __typename?: 'Image'; id: string }
}

type UpdateImageMutationVariables = Exact<{
  imageId: Scalars['String']
  input: UpdateImageInput
}>

type UpdateImageMutation = {
  __typename?: 'Mutation'
  image: { __typename?: 'Image'; id: string; albumId: string; imageExt: string }
}

type DeleteImageMutationVariables = Exact<{
  imageId: Scalars['String']
}>

type DeleteImageMutation = { __typename?: 'Mutation'; success: boolean }

type ReportImageMutationVariables = Exact<{
  imageId: Scalars['String']
  reason: Scalars['String']
}>

type ReportImageMutation = { __typename?: 'Mutation'; success: boolean }

type GetAlbumQueryVariables = Exact<{
  id: Scalars['String']
}>

type GetAlbumQuery = {
  __typename?: 'Query'
  album?: {
    __typename?: 'Album'
    id: string
    title?: string | null
    description?: string | null
    authorId: string
    colors: Array<number>
    coverExt: string
    author?: {
      __typename?: 'User'
      id: string
      nickname?: string | null
      username: string
    } | null
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
  } | null
}

type GetAlbumEditPageQueryVariables = Exact<{
  id: Scalars['String']
}>

type GetAlbumEditPageQuery = {
  __typename?: 'Query'
  album?: {
    __typename?: 'Album'
    id: string
    title?: string | null
    description?: string | null
    authorId: string
    colors: Array<number>
    coverExt: string
    author?: {
      __typename?: 'User'
      id: string
      nickname?: string | null
      username: string
    } | null
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    images?: Array<{
      __typename?: 'Image'
      id: string
      title?: string | null
      description?: string | null
      albumId: string
      colors: Array<number>
      authorId: string
      imageExt: string
    }> | null
  } | null
}

type GetAlbumsQueryVariables = Exact<{ [key: string]: never }>

type GetAlbumsQuery = {
  __typename?: 'Query'
  albums: Array<{
    __typename?: 'Album'
    id: string
    title?: string | null
    authorId: string
    coverExt: string
    colors: Array<number>
    images?: Array<{
      __typename?: 'Image'
      id: string
      albumId: string
      authorId: string
      imageExt: string
    }> | null
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
  }>
}

type GetImageQueryVariables = Exact<{
  id: Scalars['String']
}>

type GetImageQuery = {
  __typename?: 'Query'
  image?: {
    __typename?: 'Image'
    id: string
    albumId: string
    title?: string | null
    description?: string | null
    authorId: string
    colors: Array<number>
    imageExt: string
    author?: {
      __typename?: 'User'
      id: string
      username: string
      nickname?: string | null
    } | null
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
  } | null
}

type GetImagesForAlbumQueryVariables = Exact<{
  albumId: Scalars['String']
}>

type GetImagesForAlbumQuery = {
  __typename?: 'Query'
  images: Array<{
    __typename?: 'Image'
    id: string
    albumId: string
    title?: string | null
    authorId: string
    colors: Array<number>
    description?: string | null
    imageExt: string
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
  }>
}

type GetFrontPageImagesQueryVariables = Exact<{ [key: string]: never }>

type GetFrontPageImagesQuery = {
  __typename?: 'Query'
  images: Array<{
    __typename?: 'Image'
    id: string
    authorId: string
    imageExt: string
    albumId: string
    title?: string | null
    author?: {
      __typename?: 'User'
      id: string
      nickname?: string | null
      username: string
      avatarUrl?: string | null
    } | null
    album: { __typename?: 'Album'; title?: string | null }
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
  }>
}

type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

type CurrentUserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    bio?: string | null
    badges: Array<UserBadge>
    username: string
    nickname?: string | null
    avatarUrl?: string | null
    updatedAt: any
    createdAt: any
    permissions: number
  } | null
}

type UserProfileQueryVariables = Exact<{
  userId: Scalars['String']
}>

type UserProfileQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    bio?: string | null
    badges: Array<UserBadge>
    username: string
    nickname?: string | null
    avatarUrl?: string | null
    updatedAt: any
    createdAt: any
    bannerExt: string
    userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    albums?: Array<{
      __typename?: 'Album'
      id: string
      title?: string | null
      authorId: string
      coverExt: string
      colors: Array<number>
      images?: Array<{
        __typename?: 'Image'
        id: string
        albumId: string
        authorId: string
        imageExt: string
      }> | null
      userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
    images?: Array<{
      __typename?: 'Image'
      id: string
      title?: string | null
      authorId: string
      albumId: string
      imageExt: string
      colors: Array<number>
      userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
    favouriteAlbums?: Array<{
      __typename?: 'Album'
      id: string
      authorId: string
      title?: string | null
      coverExt: string
      images?: Array<{
        __typename?: 'Image'
        id: string
        albumId: string
        authorId: string
        imageExt: string
      }> | null
      userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
    favouriteImages?: Array<{
      __typename?: 'Image'
      id: string
      authorId: string
      imageExt: string
      albumId: string
      title?: string | null
      userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
    favouriteUsers?: Array<{
      __typename?: 'User'
      id: string
      avatarUrl?: string | null
      username: string
      nickname?: string | null
      userFavourites?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
  } | null
}

const CreateAlbumDocument = gql`
  mutation CreateAlbum(
    $title: String!
    $description: String
    $colors: [Int!] = [0, 0, 0]
  ) {
    album: createAlbum(
      title: $title
      description: $description
      colors: $colors
    ) {
      id
      title
      description
    }
  }
`
const UpdateAlbumDocument = gql`
  mutation UpdateAlbum($albumId: String!, $input: UpdateAlbumInput!) {
    album: updateAlbum(albumId: $albumId, input: $input) {
      id
      title
      description
    }
  }
`
const DeleteAlbumDocument = gql`
  mutation DeleteAlbum($albumId: String!) {
    success: deleteAlbum(albumId: $albumId)
  }
`
const LoginDocument = gql`
  mutation Login($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      accessToken
    }
  }
`
const RegisterDocument = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password: String!
    $bio: String
    $nickname: String
  ) {
    success: createUser(
      email: $email
      username: $username
      password: $password
      bio: $bio
      nickname: $nickname
    )
  }
`
const FavouriteAlbumDocument = gql`
  mutation FavouriteAlbum($id: String!, $unfavourite: Boolean!) {
    success: favouriteAlbum(albumId: $id, unfavourite: $unfavourite)
  }
`
const FavouriteImageDocument = gql`
  mutation FavouriteImage($id: String!, $unfavourite: Boolean!) {
    success: favouriteImage(imageId: $id, unfavourite: $unfavourite)
  }
`
const FavouriteUserDocument = gql`
  mutation FavouriteUser($id: String!, $unfavourite: Boolean!) {
    success: favouriteUser(userId: $id, unfavourite: $unfavourite)
  }
`
const CreateImageFragmentDocument = gql`
  mutation CreateImageFragment($albumId: String!) {
    image: createImage(albumId: $albumId, colors: [0, 0, 0]) {
      id
    }
  }
`
const UpdateImageDocument = gql`
  mutation UpdateImage($imageId: String!, $input: UpdateImageInput!) {
    image: updateImage(imageId: $imageId, input: $input) {
      id
      albumId
      imageExt
    }
  }
`
const DeleteImageDocument = gql`
  mutation DeleteImage($imageId: String!) {
    success: deleteImage(imageId: $imageId)
  }
`
const ReportImageDocument = gql`
  mutation ReportImage($imageId: String!, $reason: String!) {
    success: reportImage(imageId: $imageId, reason: $reason)
  }
`
const GetAlbumDocument = gql`
  query GetAlbum($id: String!) {
    album(id: $id) {
      id
      title
      description
      authorId
      colors
      coverExt
      author {
        id
        nickname
        username
      }
      userFavourites {
        id
      }
    }
  }
`
const GetAlbumEditPageDocument = gql`
  query GetAlbumEditPage($id: String!) {
    album(id: $id) {
      id
      title
      description
      authorId
      colors
      coverExt
      author {
        id
        nickname
        username
      }
      userFavourites {
        id
      }
      images {
        id
        title
        description
        albumId
        colors
        authorId
        imageExt
      }
    }
  }
`
const GetAlbumsDocument = gql`
  query GetAlbums {
    albums {
      id
      title
      authorId
      coverExt
      colors
      images {
        id
        albumId
        authorId
        imageExt
      }
      userFavourites {
        id
      }
    }
  }
`
const GetImageDocument = gql`
  query GetImage($id: String!) {
    image(id: $id) {
      id
      albumId
      title
      description
      authorId
      colors
      imageExt
      author {
        id
        username
        nickname
      }
      userFavourites {
        id
      }
    }
  }
`
const GetImagesForAlbumDocument = gql`
  query GetImagesForAlbum($albumId: String!) {
    images: imagesForAlbum(albumId: $albumId, args: { amount: 10, cursor: 0 }) {
      id
      albumId
      title
      authorId
      colors
      description
      imageExt
      userFavourites {
        id
      }
    }
  }
`
const GetFrontPageImagesDocument = gql`
  query GetFrontPageImages {
    images(amount: 10, cursor: 0) {
      id
      authorId
      imageExt
      author {
        id
        nickname
        username
        avatarUrl
      }
      albumId
      album {
        title
      }
      title
      userFavourites {
        id
      }
    }
  }
`
const CurrentUserDocument = gql`
  query CurrentUser {
    user {
      id
      bio
      badges
      username
      nickname
      avatarUrl
      updatedAt
      createdAt
      permissions
    }
  }
`
const UserProfileDocument = gql`
  query UserProfile($userId: String!) {
    user(id: $userId) {
      id
      bio
      badges
      username
      nickname
      avatarUrl
      updatedAt
      createdAt
      bannerExt
      userFavourites {
        id
      }
      albums(skip: 0, take: 3) {
        id
        title
        authorId
        coverExt
        colors
        images {
          id
          albumId
          authorId
          imageExt
        }
        userFavourites {
          id
        }
      }
      images(skip: 0, take: 3) {
        id
        title
        authorId
        albumId
        imageExt
        colors
        userFavourites {
          id
        }
      }
      favouriteAlbums(skip: 0, take: 6) {
        id
        authorId
        title
        coverExt
        images {
          id
          albumId
          authorId
          imageExt
        }
        userFavourites {
          id
        }
      }
      favouriteImages(skip: 0, take: 6) {
        id
        authorId
        imageExt
        albumId
        title
        userFavourites {
          id
        }
      }
      favouriteUsers(skip: 0, take: 6) {
        id
        avatarUrl
        username
        nickname
        userFavourites {
          id
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateAlbum(
      variables: CreateAlbumMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAlbumMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAlbumMutation>(CreateAlbumDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateAlbum',
        'mutation',
      )
    },
    UpdateAlbum(
      variables: UpdateAlbumMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAlbumMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAlbumMutation>(UpdateAlbumDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateAlbum',
        'mutation',
      )
    },
    DeleteAlbum(
      variables: DeleteAlbumMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAlbumMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAlbumMutation>(DeleteAlbumDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteAlbum',
        'mutation',
      )
    },
    Login(
      variables: LoginMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Login',
        'mutation',
      )
    },
    Register(
      variables: RegisterMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<RegisterMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegisterMutation>(RegisterDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Register',
        'mutation',
      )
    },
    FavouriteAlbum(
      variables: FavouriteAlbumMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FavouriteAlbumMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FavouriteAlbumMutation>(
            FavouriteAlbumDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'FavouriteAlbum',
        'mutation',
      )
    },
    FavouriteImage(
      variables: FavouriteImageMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FavouriteImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FavouriteImageMutation>(
            FavouriteImageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'FavouriteImage',
        'mutation',
      )
    },
    FavouriteUser(
      variables: FavouriteUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<FavouriteUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FavouriteUserMutation>(
            FavouriteUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'FavouriteUser',
        'mutation',
      )
    },
    CreateImageFragment(
      variables: CreateImageFragmentMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateImageFragmentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateImageFragmentMutation>(
            CreateImageFragmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateImageFragment',
        'mutation',
      )
    },
    UpdateImage(
      variables: UpdateImageMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateImageMutation>(UpdateImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateImage',
        'mutation',
      )
    },
    DeleteImage(
      variables: DeleteImageMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteImageMutation>(DeleteImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteImage',
        'mutation',
      )
    },
    ReportImage(
      variables: ReportImageMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ReportImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ReportImageMutation>(ReportImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'ReportImage',
        'mutation',
      )
    },
    GetAlbum(
      variables: GetAlbumQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAlbumQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAlbumQuery>(GetAlbumDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAlbum',
        'query',
      )
    },
    GetAlbumEditPage(
      variables: GetAlbumEditPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAlbumEditPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAlbumEditPageQuery>(
            GetAlbumEditPageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetAlbumEditPage',
        'query',
      )
    },
    GetAlbums(
      variables?: GetAlbumsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAlbumsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAlbumsQuery>(GetAlbumsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAlbums',
        'query',
      )
    },
    GetImage(
      variables: GetImageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetImageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetImageQuery>(GetImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetImage',
        'query',
      )
    },
    GetImagesForAlbum(
      variables: GetImagesForAlbumQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetImagesForAlbumQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetImagesForAlbumQuery>(
            GetImagesForAlbumDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetImagesForAlbum',
        'query',
      )
    },
    GetFrontPageImages(
      variables?: GetFrontPageImagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetFrontPageImagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetFrontPageImagesQuery>(
            GetFrontPageImagesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetFrontPageImages',
        'query',
      )
    },
    CurrentUser(
      variables?: CurrentUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CurrentUserQuery>(CurrentUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CurrentUser',
        'query',
      )
    },
    UserProfile(
      variables: UserProfileQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UserProfileQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserProfileQuery>(UserProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserProfile',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
