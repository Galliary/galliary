import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAlbums from "app/albums/queries/getAlbums"

const ITEMS_PER_PAGE = 100

export const AlbumsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ albums, hasMore }] = usePaginatedQuery(getAlbums, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link href={Routes.ShowAlbumPage({ albumId: album.id })}>
              <a>{album.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AlbumsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Albums</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAlbumPage()}>
            <a>Create Album</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AlbumsList />
        </Suspense>
      </div>
    </>
  )
}

AlbumsPage.authenticate = true
AlbumsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AlbumsPage
