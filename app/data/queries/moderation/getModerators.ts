import { resolver } from 'blitz'
import db from 'db'
import { hasPermissions } from 'app/data/resolvers/hasPermissions'
import { Permissions, USER_DEFAULT_PERMISSIONS } from 'app/utils/permissions'

export default resolver.pipe(
  // hasPermissions(Permissions.VIEW_MODERATORS),
  async () => {
    // const moderators = await db.user.findMany({
    //   where: {
    //     permissions: {
    //       lt: USER_DEFAULT_PERMISSIONS,
    //     },
    //   },
    // })

    return []
  },
)
