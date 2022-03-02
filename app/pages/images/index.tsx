import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getImages from "app/images/queries/getImages"

const ITEMS_PER_PAGE = 100

export const ImagesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ images, hasMore }] = usePaginatedQuery(getImages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <Link href={Routes.ShowImagePage({ imageId: image.id })}>
              <a>{image.title}</a>
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

const ImagesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Images</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewImagePage()}>
            <a>Create Image</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ImagesList />
        </Suspense>
      </div>
    </>
  )
}

ImagesPage.authenticate = true
ImagesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ImagesPage
