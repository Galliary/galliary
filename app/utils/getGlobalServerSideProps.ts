import type { GetServerSideProps } from 'blitz'
import { invokeWithMiddleware } from 'blitz'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'
import deepmerge from 'deepmerge'

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
