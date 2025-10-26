import { USER_ROLES } from '#constants/user/role'
import { ObjectValues } from '#types/index'

export type UserRole = ObjectValues<typeof USER_ROLES>
