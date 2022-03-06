import { resolver, SecurePassword } from 'blitz'
import db, { UserRole } from 'db'
import { Signup } from 'app/auth/validations'
import { snowflake } from 'app/utils/snowflake'

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, username, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        id: snowflake(),
        email: email.toLowerCase().trim(),
        hashedPassword,
        username,
        role: UserRole.USER,
      },
      select: { id: true, username: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id })

    return user
  },
)
