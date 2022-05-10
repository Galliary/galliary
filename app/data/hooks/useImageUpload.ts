import { API_URL } from 'app/constants'
import { useAuthCookie } from 'app/data/hooks/useAuthCookie'

export enum UploadType {
  Image,
  AlbumCover,
}

type ImagePartialData = {
  id: string
  albumId: string
  authorId: string
  imageExt: string
}

export const useImageUpload = () => {
  const [authToken] = useAuthCookie()

  return async (id: string, file: File, type: UploadType) => {
    const form = new FormData()

    form.append('file', file)

    const res = await fetch(`${API_URL}/images/${id}/upload`, {
      method: 'POST',
      body: form,
      credentials: 'include',
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : {},
    })

    return (await res.json()) as ImagePartialData
  }
}
