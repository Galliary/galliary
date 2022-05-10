import NewAlbumPage from 'pages/upload'
import { getGlobalServerSideProps } from 'app/utils/getGlobalServerSideProps'

export const getServerSideProps = getGlobalServerSideProps(async () => {
  return {
    props: {},
  }
})

export default NewAlbumPage
