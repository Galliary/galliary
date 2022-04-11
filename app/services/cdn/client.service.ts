import { extension } from 'mime-types'
import { getAntiCSRFToken } from 'blitz'
import { CDN_URL } from 'app/constants'

export enum UploadType {
  Album = 'albums',
  Image = 'images',
  Banner = 'banners',
}

export enum UploadAlbumFieldName {
  File = 'file',
  ItemId = 'item_id',
  AlbumId = 'album_id',
  AuthorId = 'author_id',
  // To display the author's name as metadata for the image
  AuthorName = 'author_name',
}

export const getAsExt = (file: File) => {
  const ext = extension(file.type)

  if (!ext) {
    throw new Error('Invalid file type')
  }

  return ext
}

export const postNextUpload = async (
  type: UploadType,
  author: { id: string; username: string },
  item: { id: string; albumId?: string },
  file: File,
) => {
  const formData = new FormData()

  if (!item.id || !author.id || !author.username) {
    throw new Error('Incomplete upload form data details.')
  }

  formData.append(UploadAlbumFieldName.File, file)
  formData.append(UploadAlbumFieldName.ItemId, item.id)
  formData.append(UploadAlbumFieldName.AuthorId, author.id)
  formData.append(UploadAlbumFieldName.AlbumId, item.albumId ?? 'unknown')
  formData.append(UploadAlbumFieldName.AuthorName, author.username)

  const csrfToken = getAntiCSRFToken()

  const response = await fetch(`/api/uploads/${type}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'anti-csrf': csrfToken,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload file')
  }

  return true
}

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
