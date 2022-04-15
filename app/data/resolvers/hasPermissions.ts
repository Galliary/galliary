import { Ctx, AuthorizationError } from 'blitz'
import { PermissionManager, Permissions } from 'app/utils/permissions'

export const hasPermissions =
  (...permissions: Permissions[]) =>
  (_: any, ctx: Ctx) => {
    if (!ctx.session.userId) {
      throw new AuthorizationError(
        'You are not authorized to perform this action',
      )
    }
    const userPermissions = new PermissionManager(
      ctx.session.permissions ?? Permissions.NONE,
    )
    const hasPermission = userPermissions.has(...permissions)
    if (!hasPermission) {
      throw new AuthorizationError(
        `You are not authorized to perform this action`,
      )
    }

    return true
  }
