

export const useRoutes = () => {
  return {
    toUserPage(userId: string) {
      return `/users/${userId}`;
    },
    toHomePage() {
      return '/';
    },
        toLoginPage() {
      return '/login';
    },
    toRegisterPage() {
      return '/register';
    },
    toAlbumPage(albumId: string) {
      return `/albums/${albumId}`;
    },
    toImagePage(albumId: string, imageId: string) {
      return `${this.toAlbumPage(albumId)}/images/${imageId}`;
    },
    toUploadPage() {
      return '/upload';
    },
  }
}
