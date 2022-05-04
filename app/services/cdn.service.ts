import { CDN_URL } from 'app/constants'

export const getAlbumCoverUrl = (
  authorId: string,
  albumId: string,
  ext: string,
): string => `${CDN_URL}/users/${authorId}/albums/${albumId}/cover.${ext}`

export const getImageUrl = (
  authorId: string,
  albumId: string,
  imageId: string,
  ext: string,
): string => `${CDN_URL}/users/${authorId}/albums/${albumId}/${imageId}.${ext}`

export type BaseImageItemType =
  | { id: string; authorId: string; coverExt: string }
  | { id: string; authorId: string; albumId: string; imageExt: string }

export const getImageUrlFromItem = (item: BaseImageItemType) =>
  'coverExt' in item
    ? getAlbumCoverUrl(item.authorId, item.id, item.coverExt)
    : getImageUrl(item.authorId, item.albumId, item.id, item.imageExt)

export const getBannerImageUrl = (authorId: string, bannerExt: string) =>
  `${CDN_URL}/users/${authorId}/banner.${bannerExt}`
