import deepmerge from 'deepmerge'
import { invokeWithMiddleware } from 'blitz'
import type { GetServerSideProps } from 'blitz'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'

export const getGlobalServerSideProps = <Props>(
  callback: GetServerSideProps<Props>,
): GetServerSideProps => {
  return async (context) => {
    const pageProps = (await callback(context)) as Record<
      'props',
      Record<string, unknown>
    >

    const currentUser = await invokeWithMiddleware(
      getCurrentUser,
      null,
      context,
    )

    return deepmerge(pageProps, { props: { currentUser } })
  }
}
