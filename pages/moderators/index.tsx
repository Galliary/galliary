import { AuthorizationError, BlitzPage, Head, useQuery } from 'blitz'
import Layout from 'app/layouts/Layout'
import { Suspense } from 'react'
import { Loader } from 'app/components/views/Loader'
import {
  PermissionManager,
  Permissions,
  USER_DEFAULT_PERMISSIONS,
} from 'app/utils/permissions'
import getModerators from 'app/data/queries/moderation/getModerators'
import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react'
import { useCurrentUser } from 'app/data/hooks/useCurrentUser'

export interface ModeratorsPageProps {}

const ModeratorsView = () => {
  return <div>{USER_DEFAULT_PERMISSIONS}</div>
}

const PERM_ARRAY = Object.values(Permissions).reverse()

const ModeratorsPage: BlitzPage<ModeratorsPageProps> = ({}) => {
  const currentUser = useCurrentUser()
  const [moderators] = useQuery(getModerators, null)

  if (!currentUser) {
    throw new AuthorizationError()
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <VStack align="start" spacing={8}>
        <Text>{currentUser.permissions}</Text>
        <VStack align="start">
          {PERM_ARRAY.filter((a) => isNaN(Number(a))).map((perm, index) => {
            const hasPerm = new PermissionManager(currentUser.permissions).has(
              Permissions[perm],
            )

            return (
              <Checkbox
                key={index}
                isChecked={hasPerm}
                color={hasPerm ? 'ui.100' : 'ui.60'}
              >
                {perm}
              </Checkbox>
            )
          })}
        </VStack>
        <Box>{JSON.stringify(moderators)}</Box>
      </VStack>
    </>
  )
}

ModeratorsPage.suppressFirstRenderFlicker = true
ModeratorsPage.getLayout = (page) => (
  <Layout hideFooter>
    <Suspense fallback={<Loader />}>{page}</Suspense>
  </Layout>
)

export default ModeratorsPage
