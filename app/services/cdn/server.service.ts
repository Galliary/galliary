import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { extension, lookup } from 'mime-types'
import * as fs from 'fs'
import { UploadType } from 'app/services/cdn/client.service'
import { ConfigService } from 'app/services/config.service'
import { MAX_UPLOAD_FILE_SIZE, SUPPORTED_MIME_TYPES } from 'app/constants'

const SPACE = ConfigService.get('CDN_SPACE', true)
const REGION = ConfigService.get('CDN_REGION', true)
const ENDPOINT = ConfigService.get('CDN_ENDPOINT', true)

export const client = new S3({
  endpoint: `https://${ENDPOINT}`,
  region: REGION,
  credentials: {
    accessKeyId: ConfigService.get('CDN_API_KEY', true),
    secretAccessKey: ConfigService.get('CDN_API_SECRET', true),
  },
})

export const getParams = (
  directory: string,
  name: string,
  authorName: string,
  data: { file: File },
): PutObjectCommand['input'] => {
  // @ts-ignore
  const file = fs.readFileSync(data.file.path)
  return {
    Bucket: SPACE,
    Key: `${directory}/${name}`,
    Body: file,
    ACL: 'public-read',
    ContentType: data.file.type,
    ContentLength: data.file.size,
    Metadata: {
      'galliary-author': authorName,
    },
  }
}

export const uploadAlbum = (
  id: string,
  authorId: string,
  authorUsername: string,
  coverFile: { file: File },
) => {
  if (!SUPPORTED_MIME_TYPES.includes(coverFile.file.type)) {
    throw new Error('This file type is currently not supported')
  }
  if (coverFile.file.size > MAX_UPLOAD_FILE_SIZE) {
    throw new Error('This file is too large')
  }

  const extLookup = lookup(coverFile.file.name)
  const ext = extLookup && extension(extLookup)

  const params = getParams(
    `users/${authorId}/${UploadType.Album}/${id}`,
    `cover.${ext}`,
    authorUsername,
    coverFile,
  )

  return client.putObject(params)
}

export const uploadImage = (
  id: string,
  albumId: string,
  authorId: string,
  authorUsername: string,
  files: { file: File },
) => {
  if (!SUPPORTED_MIME_TYPES.includes(files.file.type)) {
    throw new Error('This file type is currently not supported')
  }
  if (files.file.size > MAX_UPLOAD_FILE_SIZE) {
    throw new Error('This file is too large')
  }

  const extLookup = lookup(files.file.name)
  const ext = extLookup && extension(extLookup)

  const params = getParams(
    `users/${authorId}/${UploadType.Album}/${albumId}`,
    `${id}.${ext}`,
    authorUsername,
    files,
  )

  return client.putObject(params)
}

export const uploadImages = async (
  id: string,
  albumId: string,
  authorId: string,
  authorUsername: string,
  files: Array<{ file: File }>,
) => {
  for (const { file } of files) {
    await uploadImage(id, albumId, authorId, authorUsername, { file })
  }
}

export const uploadBanner = (userId: string, files: { file: File }) => {
  if (!SUPPORTED_MIME_TYPES.includes(files.file.type)) {
    throw new Error('This file type is currently not supported')
  }
  if (files.file.size > MAX_UPLOAD_FILE_SIZE) {
    throw new Error('This file is too large')
  }

  const extLookup = lookup(files.file.name)
  const ext = extLookup && extension(extLookup)

  const params = getParams(`users/${userId}`, `banner.${ext}`, userId, files)

  return client.putObject(params)
}
