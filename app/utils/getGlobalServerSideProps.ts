import deepmerge from "deepmerge";
import { GetServerSideProps } from "next";
import { getSdk } from "generated/graphql.ssr";
import { GraphQLClient } from "graphql-request";
import { default as getCookies } from "next-cookies";
import { AUTH_COOKIE_NAME } from "app/constants";

export const getGlobalServerSideProps = <Props>(
  callback: GetServerSideProps<Props>,
): GetServerSideProps => {
  return async (context) => {
    const pageProps = (await callback(context)) as Record<
      'props',
      Record<string, unknown>
    >

    const cookies = getCookies(context)

    const authToken = cookies[AUTH_COOKIE_NAME] ?? null

    const client = new GraphQLClient('http://localhost:8080/graphql', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })

    const { user: currentUser } = authToken ? await getSdk(client)
      .CurrentUser()
      .catch(() => ({ user: null })) : { user: null }

    return deepmerge(pageProps, { props: { currentUser, authToken } })
  }
}

