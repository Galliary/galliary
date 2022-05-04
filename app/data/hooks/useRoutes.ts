import { useRouter } from 'next/router'
import { API_URL } from 'app/constants'

export const useRoutes = () => {
  const router = useRouter()

  return {
    toUserPage(userId: string) {
      return `/users/${userId}`
    },
    toHomePage() {
      return '/'
    },
    toLoginPage() {
      return `${API_URL}/auth/discord/login`
    },
    toRegisterPage() {
      return '/register'
    },
    toAlbumPage(albumId: string) {
      return `/albums/${albumId}`
    },
    toImagePage(albumId: string, imageId: string) {
      return `${this.toAlbumPage(albumId)}/images/${imageId}`
    },
    toUploadPage() {
      return '/upload'
    },
    toLogout() {
      return `/api/auth/logout?r=${new Buffer(router.asPath).toString(
        'base64',
      )}`
    },
  }
}
